const {
	getTestFolders,
	saveFile,
	readFile
} = require('./files-utils');
const { pascalCase } = require('pascal-case');

const template = readFile('../assets/testPage.js.tmpl')
	.toString();

function generateComponentImport(testName) {
	return `import { createElementVariations as ${pascalCase(testName)} } from '../../tests/${testName}';`;
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

async function generateTestPage(excludeList = []) {
	const testsNames = getTestFolders()
		.filter(testName => !excludeList.includes(testName));
	const testsImports = testsNames.reduce((result, testName) => {
		return `${result}${generateComponentImport(testName)}
	`;
	}, '');

	const testsCalls = testsNames.reduce((result, testName) => {
		return `${result}${generateComponentContentFunction(testName)}
		`;
	}, '');
	const fileContents = generateTestPageFileContents(testsImports, testsCalls);
	await saveFile('../tmp/testPage/testPage.js', fileContents);
}

async function generateComponentTestPage(componentName) {
	const testsImports = generateComponentImport(componentName);

	const testsCalls = generateComponentContentFunction(componentName);
	const fileContents = generateTestPageFileContents(testsImports, testsCalls);
	await saveFile(`../tmp/${componentName}/index.js`, fileContents);
}

module.exports = {
	generateTestPage,
	generateComponentTestPage
};
