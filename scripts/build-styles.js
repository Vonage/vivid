/*
* Purpose: Renders SASS styles as TS files, support for "CSS in JS" concept
*   Each element package could contain *.scss files under "src" folder
*   which will be rendered as *.css.ts files
*/

const { spawn } = require('child_process');
const glob = require('glob');
const pkg = require('./../package.json');

for (const workspace of pkg.workspaces) {
	glob.sync(`${workspace}*/src/*.scss`).map(fileName => {
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
}
