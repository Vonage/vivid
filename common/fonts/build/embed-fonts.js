const fs = require('fs-extra');
const path = require('path');

const baseDir = 'common/fonts/';
const srcDir = baseDir + 'src/';
const fontBinariesDir = baseDir + 'fonts/';

const templateFiles = fs.readdirSync(srcDir).filter(fn => fn.match(/^.*\.scss\.template$/));
console.info(`embed-fonts: found templates ${templateFiles}`);

templateFiles.forEach(tfn => {
	console.info(`embed-fonts: processing ${tfn}`);
	const template = fs.readFileSync(srcDir + tfn, 'utf8');
	const regexp = /url\([^)]+'/g;
	const matches = template.matchAll(regexp);
	const replaces = [];

	console.info(`embed-fonts: preparing base64 fonts for embedding`);
	for (const match of matches) {
		const replStart = match.index,
			replEnd = match.index + match[0].length + 1,
			urlStart = replStart + 5,
			urlEnd = replEnd - 2,
			url = template.substring(urlStart, urlEnd);
		console.info(`embed-fonts: reading font from path ${url}`);
		const fBin = fs.readFileSync(path.resolve(fontBinariesDir, url));
		const fBase64 = fBin.toString('base64');
		replaces.push({ replStart: replStart, replEnd: replEnd, replBody: fBase64 });
	}
	console.info(`embed-fonts: ${replaces.length} base64 fonts ready for embedding`);

	console.info(`embed-fonts: building output result`);
	const resultParts = [];
	let from = 0;
	replaces.forEach(replace => {
		resultParts.push(
			template.substring(from, replace.replStart),
			`url(data:application/octet-stream;base64,${replace.replBody})`,
		);
		from = replace.replEnd;
	});
	resultParts.push(template.substring(from));
	fs.writeFileSync(srcDir + tfn.replace('.template', ''), resultParts.join(''));
});
