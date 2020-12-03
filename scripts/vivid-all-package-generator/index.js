const
	_ = require('lodash'),
	fp = require('lodash/fp'),
	kefir = require('kefir'),
	{ v4 } = require('uuid'),
	{ tmpdir } = require('os'),
	{ join } = require('path'),
	{ pack } = require('tar-stream'),
	{ createGzip } = require('zlib'),
	{ pipeline } = require('stream'),
	semverCmp = require('semver-compare'),
	locatePackage = require('./locate-package'),
	{ createWriteStream, readFile } = require('fs'),
	mapCustomElements = require('./map-custom-elements'),
	packageJsonTemplate = require('./template/package.json.js');

const PACKAGE_NAME = "@vonage/vivid";

const
	EXCLUDE_PACKAGES = [
		"@vonage/vwc-chips"						// Dependency not available (from MWC)
	],
	ALWAYS_INCLUDE = [
		{ name: "@vonage/vvd-core", export_as: "VVDCore" }
	];

const
	asFile = (filePath)=> (content)=> ({ file_path: filePath, content }),
	exportNameTemplate = fp.pipe((str)=> str.match(/^vwc-(.+)/)[1], _.startCase, (str)=> ["VWC", str.replace(/\s/g, '')].join(''));

const extraComponents = kefir
	.combine(
		ALWAYS_INCLUDE
			.map(({ name, export_as })=> kefir
					.fromPromise(locatePackage(name))
					.filter(Boolean)
					.map(fp.pipe(
						fp.get('json.version'),
						(version)=> ({ name, version, components: [{ is_main: true, export_as }] }))
					)
			)
	);

const customElementsMapProperty = kefir
	.fromPromise(mapCustomElements('./components/*/package.json'))
	.map(fp.filter(({ name })=> !EXCLUDE_PACKAGES.includes(name)))
	.toProperty();

const allExports = customElementsMapProperty
	.combine(extraComponents, _.concat)
	.toProperty();

const customElementsMapFileProperty = customElementsMapProperty
	.map((elementsMap)=>
		elementsMap
			.flatMap(({ components })=>
				components
					.map(({ component_name })=>
						({
							component_name,
							export_name: exportNameTemplate(component_name)
						})
					)
			)
	)
	.toProperty();

const packageJsonProperty = kefir
	.combine([
		allExports,
		customElementsMapFileProperty
	])
	.map(([packages, component_map])=> {
		return packageJsonTemplate({
			name: PACKAGE_NAME,
			version: fp.pipe(fp.map(fp.get('version')), (arr)=> arr.sort(semverCmp), fp.last)(packages),
			dependencies:
				packages
					.map(({ name, version }) => ({ [name]: `^${version}` }))
					.reduce((ac, line) => Object.assign(ac, line)),
			component_map
		});
	})
	.map(fp.pipe((json)=> JSON.stringify(json, null, 2), asFile('package.json')))
	.toProperty();

const mainFileProperty = allExports
	.map((packageMap)=> {
		return packageMap
			.flatMap(({ components, name })=> {
				return components.map(({ component_name, export_name, module, is_main, export_as })=>
					_.compact([
						`export`,
						`{ ${export_name || "default"} as ${export_as || exportNameTemplate(component_name)} }`,
						`from`,
						`"${_.compact([name, !is_main && module]).join('/')}"`,
					]).join(' ')
				);
			})
			.map((line)=> [line, ";"].join(''))
			.join('\n');
	})
	.map(asFile('index.js'))
	.toProperty();

const readmeFileProperty = kefir
	.fromNodeCallback(_.partial(readFile, './README.md', 'utf8'))
	.map(asFile('README.md'))
	.ignoreErrors()
	.toProperty();

const persistToTar = (stream)=> {
	const tmpFilename = join(tmpdir(), `${v4()}.tar.gz`);
	return kefir.fromCallback((cb)=> {
		const outStream = pack();
		pipeline(outStream, createGzip(), createWriteStream(tmpFilename), cb);
		stream
			.map(({ file_path, ...rest })=> ({ file_path: join('package', file_path), ...rest }))
			.onValue(({ file_path, content })=> outStream.entry({ name: file_path }, Buffer.from(content, 'utf8')))
			.onEnd(()=> outStream.finalize());
	})
	.map(fp.always(tmpFilename));
};

kefir
	.merge([
		packageJsonProperty,
		mainFileProperty,
		readmeFileProperty
	])
	.thru(persistToTar)
	.onValue((tmpFilename)=> process.stdout.write(tmpFilename))
	.onError((errorMessage)=> {
		console.warn(errorMessage);
		process.exit(1);
	});