
const
	_ = require('lodash'),
	{ join } = require('path'),
	{ readFile } = require('fs'),
	fp = require('lodash/fp'),
	glob = require('glob'),
	kefir = require('kefir');

module.exports = function(packageName, basePath = process.cwd()){
	return kefir
		.fromNodeCallback(_.partial(glob, join(basePath, '**/package.json'), { follow: false, ignore: "**/node_modules/**" }))
		.flatten()
		.flatMapConcurLimit((filename)=> {
			return kefir
				.fromNodeCallback(_.partial(readFile, filename, 'utf8'))
				.map(JSON.parse)
				.filter(({ name })=> name === packageName)
				.map((json)=> ({ filename, json }));
		}, 5)
		.beforeEnd(fp.always(null))
		.take(1)
		.toPromise();
};