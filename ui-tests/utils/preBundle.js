const pageGenerator = require('./testPageGenerator.js');
const componentsExcludeList = require('../excludedTests');
const { getTestFolders } = require('./files-utils');

const listOfComponents = getTestFolders().filter(component => !componentsExcludeList.includes(component));

async function buildTests() {
	await listOfComponents.forEach(pageGenerator.generateComponentTestPage);
}

async function buildMainPage() {
	await pageGenerator.generateMainPage(componentsExcludeList);
}
module.exports = {
	buildMainPage,
	buildTests
};
