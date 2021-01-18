const
	_ = require('lodash'),
	fp = require('lodash/fp'),
	glob = require('glob'),
	kefir = require('kefir'),
	{ join, dirname } = require('path'),
	{ readFile, writeFile } = require('fs');

const UMBRELLA_PACKAGE_NAME = "@vonage/vvd-umbrella";

const stringify = (json)=> JSON.stringify(json, null, 2);

const globStream = (globPattern)=> kefir.fromNodeCallback((cb)=> glob(globPattern, { absolute: true }, cb)).flatten();

const packageStream = kefir
	.merge(["common", "components"].map((folder)=> globStream(join(folder, '**', 'package.json'))))
	.filter((filepath)=> !filepath.includes('node_modules'))
	.flatMap((filepath)=> kefir
		.fromNodeCallback((cb)=> readFile(filepath, 'utf8', cb))
		.map(fp.pipe(JSON.parse, (packageJson)=> ({ filename: filepath, package: packageJson })))
	)
	.filter(fp.pipe(fp.get('package.name'), fp.eq(UMBRELLA_PACKAGE_NAME), fp.negate(fp.identity)));

const tsStream = packageStream
	.flatMap(({ filename, package })=> {
		const tsConfigFilename = join(dirname(filename), 'tsconfig.json');
		return kefir
			.fromNodeCallback((cb)=> readFile(tsConfigFilename, 'utf8', cb))
			.ignoreErrors()
			.map(fp.pipe(JSON.parse, (json)=> ({ filename: tsConfigFilename, tsconfig: json })));
	});

kefir
	.merge([
		tsStream.map(({ filename, tsconfig: { references, "extends": ext, ...rest}})=> ({ filename, content: { "extends": [UMBRELLA_PACKAGE_NAME, 'configs', 'tsconfig.json'].join('/'), ...rest } })),
		packageStream
			.map(({ package, filename })=> {
				return {
					content: _.merge(package, {
						"devDependencies": {
							[UMBRELLA_PACKAGE_NAME]: "^1.0.2",
							"typescript": "^4.1.3",
						},
						"scripts": {
							"build:typescript": "tsc --listEmittedFiles",
							"build:style-modules": "umbrella-style-modules",
							"build": _([
								"yarn run build:style-modules",
								"yarn run build:typescript",
								_.get(package, 'scripts.build')
							]).compact().join(' && '),
						},
					}),
					filename
				};
			})
	])
	.flatMap(({ filename, content })=>{
		return kefir
			.fromNodeCallback((cb)=> writeFile(filename, stringify(content), cb))
			.map(fp.always(filename));
	})
	.log();