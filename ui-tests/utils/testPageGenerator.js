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
	fs.writeFileSync(path.join(__dirname, '../testPage.js'), fileContents);
}


module.exports = generateTestPage;

generateTestPage();
