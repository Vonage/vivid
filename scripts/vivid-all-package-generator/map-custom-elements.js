const
	_ = require('lodash'),
	fp = require('lodash/fp'),
	glob = require('glob'),
	kefir = require('kefir'),
	{ readFile } = require('fs'),
	{ join, dirname, basename } = require('path');

const
	COMPONENT_HINTS = [
		(code)=> _.last(code.match(/customElements\.define\(['"](.+)['"]/)),
		(code)=> _.last(code.match(/customElement\(['"](.+)['"]/))
	],
	EXPORT_HINTS = [
		(code)=> _.last(code.match(/export\s{\s?(\w+)/))
	];

const
	fileToStream = (filename)=> kefir.fromNodeCallback(_.partial(readFile, filename, { "encoding": "utf8" })),
	detectComponent = (code)=> _(COMPONENT_HINTS).map((detector)=> detector(code)).compact().first(),
	detectExport = (code)=> _(EXPORT_HINTS).map((detector)=> detector(code)).compact().first();

module.exports = function(pathGlob){
	return kefir
		.fromNodeCallback(_.partial(glob, pathGlob, { follow: false }))
		.flatten()
		.flatMap((packageJsonPath)=> {
			return fileToStream(packageJsonPath)
				.map(JSON.parse)
				.filter(fp.negate(fp.get('private')))
				.flatMapConcat(({ main, name, version })=> {
					const
						baseDir = dirname(packageJsonPath),
						srcDir = dirname(join(baseDir, main)),
						mainModule = basename(main, '.js');

					return kefir
						.fromNodeCallback(_.partial(glob, join(srcDir, '*.js'), { follow: false }))
						.flatten()
						.flatMapConcat((codeFilePath)=>
							fileToStream(codeFilePath)
								.flatMap((code)=> {
									const
										componentName = detectComponent(code),
										exportName = detectExport(code),
										moduleName = basename(codeFilePath, '.js');

									return componentName
										? kefir.constant({
											is_main: moduleName === mainModule,
											module: moduleName,
											component_name: componentName,
											export_name: exportName
										})
										: kefir.never();
								})
						)
						.scan(_.concat, [])
						.last()
						.map((components)=> ({ components, name, version }));
				});
		})
		.scan(_.concat, [])
		.last()
		.toPromise();
};