const fs = require('fs');
const path = require('path');
const fiber = require('fibers');
const util = require('util');
const sass = require('sass');
const globLib = require('glob');
const nodeSassImport = require('node-sass-import');

const renderSass = util.promisify(sass.render);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const glob = util.promisify(globLib);

const delim = /<%\s*content\s*%>/;

async function sassToCss(file) {
  const result = await renderSass({
    fiber,
    file,
    importer: (url, ...otherArgs) => {
      if (url.split('/').length === 2) {
        url += '/_index.scss';
      }
      return nodeSassImport(url, ...otherArgs);
    },
    outputStyle: 'compressed',
  });
  return result.css.toString();
}

async function sassRender(source, templateFile, output) {

	const template = await readFile(templateFile, 'utf-8');
	const match = delim.exec(template);
	if (!match) {
		throw new Error(`Template file ${templateFile} did not contain template delimiters`);
	}

	for (let filename of await glob(source, { nodir: true, absolute: true })){
		const replacement = await sassToCss(filename);
		const newContent = template.replace(delim, replacement);
		await writeFile(path.resolve(output, filename.replace(/\.s[ac]ss$/i, '.css.ts')), newContent, 'utf-8');
	}
}

exports.sassRender = sassRender;
