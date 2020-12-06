const fs = require('fs');
const fiber = require('fibers');
const util = require('util');
const sass = require('sass');

const renderSass = util.promisify(sass.render);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const delim = /<%\s*content\s*%>/;

async function sassToCss(file) {
	const result = await renderSass({
		fiber,
		file,
		includePaths: ['node_modules'],
		outputStyle: 'compressed',
	});
	return result.css.toString();
}

async function sassRender(sourceFile, templateFile, outputFile) {
	const template = await readFile(templateFile, 'utf-8');
	const match = delim.exec(template);
	if (!match) {
		throw new Error(`Template file ${templateFile} did not contain template delimiters`);
	}
	const replacement = await sassToCss(sourceFile);
	const newContent = template.replace(delim, replacement);
	return writeFile(outputFile, newContent, 'utf-8');
}

exports.sassRender = sassRender;
