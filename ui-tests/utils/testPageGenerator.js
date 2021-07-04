const fs = require('fs');
const path = require('path');
const { getTestFolders, saveFile } = require('./files-utils');
const { pascalCase } = require('pascal-case');

const template = fs.readFileSync(path.join(__dirname, '../assets/testPage.js.tmpl')).toString();

function generateComponentImport(testName) {
	return `import { createElementVariations as ${pascalCase(testName)} } from './tests/${testName}';`;
}

function generateComponentContentFunction(testName) {
	return `(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "${pascalCase(testName)}";
			wrapper.appendChild(wrapperElement);
			return ${pascalCase(testName)}(wrapperElement);
		})(),
	`;
}

function generateTestPageFileContents(testsImports, testsCalls) {
	const fileContents = (template.replace('${testImports}', testsImports)).replace('${testCalls}', testsCalls);
	return fileContents;
}

function generateTestPage(excludeList = []) {
	const testsNames = getTestFolders(path.join(__dirname, '../tests')).filter(testName => !excludeList.includes(testName));
	const testsImports = testsNames.reduce((result, testName) => {
		return `${result}${generateComponentImport(testName)}
	`;
	}, '');

	const testsCalls = testsNames.reduce((result, testName) => {
		return `${result}${generateComponentContentFunction(testName)}
		`;
	}, '');
	const fileContents = generateTestPageFileContents(testsImports, testsCalls);
	saveFile('../testPage.js', fileContents);
}


module.exports = generateTestPage;

generateTestPage();
