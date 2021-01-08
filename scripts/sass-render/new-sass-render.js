const { spawn } = require('child_process');
const sass = require("sass");
const Fiber = require("fibers");
const glob = require('glob');

glob.sync(`./src/*.scss`).map(fileName => {
	console.log(1)
	console.log(1)
	const tscssFileName = fileName.replace(/\.[^/.]+$/, '.css.ts');
	console.log(`Generating ${tscssFileName}`);
	const scssBuilder = spawn(
		'node',
		[
			'./scripts/sass-render/bin/sass-render.js',
			'-t', './scripts/sass-render/sass-template.tmpl',
			'-s', fileName,
			'-o', tscssFileName
		],
		{ stdio: 'inherit' }
	);
	scssBuilder.on('exit', code => {
		if (code !== 0) {
			process.exit(-1);
		}
	});
});

// sass.render({
//   file: "input.scss",
//   importer: function(url, prev, done) {
//     // ...
//   },
//   fiber: Fiber
// }, function(err, result) {
//   // ...
// });