const fs = require('fs');
const path = require('path');
const { getTestFolders, saveFile } = require('./files-utils');
const { pascalCase } = require('pascal-case');

const template = fs.readFileSync(path.join(__dirname, '../assets/testPage.js.tmpl')).toString();

function generateTestPage(excludeList = []) {
	const testsNames = getTestFolders(path.join(__dirname, '../tests')).filter(testName => !excludeList.includes(testName));
	const testsImports = testsNames.reduce((result, testName) => {
		return `${result}import { createElementVariations as ${pascalCase(testName)} } from './tests/${testName}';
	`;
	}, '');
	const testsCalls = testsNames.reduce((result, testName) => {
		return `${result}(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "${pascalCase(testName)}";
			wrapper.appendChild(wrapperElement);
			return ${pascalCase(testName)}(wrapperElement);
		})(),
		`;
	}, '');
	const fileContents = (template.replace('${testImports}', testsImports)).replace('${testCalls}', testsCalls);
	saveFile('../testPage.js', fileContents);
}


module.exports = generateTestPage;

generateTestPage();
