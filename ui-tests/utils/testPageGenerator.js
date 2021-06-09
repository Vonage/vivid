const fs = require('fs');
const path = require('path');
const { pascalCase } = require('pascal-case');

function getTestFolders(workingFolder) {
	const testFolders = [];
	fs.readdirSync(workingFolder).forEach((testFolder) => {
		const absolutePath = path.join(workingFolder, testFolder);
		if (fs.statSync(absolutePath).isDirectory()) {
			testFolders.push(testFolder);
		}
	});
	return testFolders;
}

const template = fs.readFileSync(path.join(__dirname, '../testPage.js.tmpl')).toString();
const testsNames = getTestFolders(path.join(__dirname, '../tests'));
const testsImports = testsNames.reduce((result, testName) => {
	return `${result}import { createElementVariations as ${pascalCase(testName)} } from './tests/${testName}';
	`;
}, '');
const testsCalls = testsNames.reduce((result, testName) => {
	return `${result}await ${pascalCase(testName)}(wrapper);
	`;
}, '');
const fileContenst = (template.replace('${testImports}', testsImports)).replace('${testCalls}', testsCalls);
fs.writeFileSync(path.join(__dirname, '../testPage.js'), fileContenst);
