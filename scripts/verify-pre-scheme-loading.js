const
	fp = require('lodash/fp'),
	kefir = require('kefir'),
	{ readFileSync } = require('fs'),
	{ dirname, join: joinPath } = require('path'),
	mapCustomElements = require('./lib/map-custom-elements'),
	locatePackage = require('./lib/locate-package');

const
	ELEMENTS_GLOB = './components/*/package.json',
	VVD_SCHEME_PACKAGE = '@vonage/vvd-scheme';

kefir
	.combine([
		kefir
			.fromPromise(mapCustomElements(ELEMENTS_GLOB))
			.map(
				fp.pipe(
					fp.flatMap(
						fp.pipe(
							fp.get('components'), fp.map(fp.get('component_name')))
					),
					fp.sortBy(fp.identity)
				)
			),
		kefir
			.fromPromise(locatePackage(VVD_SCHEME_PACKAGE))
			.map(
				fp.pipe(
					fp.get('filename'),
					dirname,
					fp.partial(joinPath, [fp, 'src', 'pre-scheme-loading.scss']),
					fp.partial(readFileSync, [fp, 'utf8']),
					(cssText)=> [...cssText.matchAll(/vwc-[a-z-]+/g) ].map(fp.first)
				)
			)
	], (allComponents, schemeComponents)=> allComponents.filter((componentName)=> !schemeComponents.includes(componentName)))
	.last()
	.filter(fp.pipe(fp.size, fp.lt(0)))
	.onValue((exceptions )=> {
		console.log(
			['⚠️ The following components were not included in "pre-scheme-loading.scss"', ...exceptions.map((componentName, index)=>`  ${index+  1}: ${componentName}`)].join('\n')
		);
		process.exit(1);
	});