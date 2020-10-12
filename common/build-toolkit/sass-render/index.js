const fs = require('fs');
const path = require('path');
const fiber = require('fibers');
const glob = require('glob');
const util = require('util');
const sass = require('sass');
const nodeSassImport = require('node-sass-import');

const renderSass = util.promisify(sass.render);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const fileGlob = util.promisify(glob);

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

async function sassRender(sourcePattern, templateFile, outputFolder) {
	const filesToProcess = await fileGlob(sourcePattern, { nodir: true });
  const template = await readFile(templateFile, 'utf-8');
  const match = delim.exec(template);
  if (!match) {
    throw new Error(`Template file ${templateFile} did not contain template delimiters`);
  }

  if (!filesToProcess) {
  	throw new Error(`Cannot find files that match ${sourcePattern}`)
	}

	await Promise.all(
		filesToProcess.map(
			(sourceFile)=>
				sassToCss(sourceFile)
					.then(template.replace.bind(template, delim))
					.then((tsFileContent)=>
						writeFile(
							path.join(outputFolder, path.basename(sourceFile).replace(/\.s[ca]ss$/i, '.css.ts')),
							tsFileContent,
							'utf8'
						)
					)
		)
	);
}

exports.sassRender = sassRender;