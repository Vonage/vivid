const fs = require('fs');
const path = require('path');

function getTestFolders(workingFolder = '../tests') {
	const testFolders = [];
	const testsFolder = path.join(__dirname, workingFolder);
	fs.readdirSync(testsFolder)
		.forEach((testFolder) => {
			const absolutePath = path.join(testsFolder, testFolder);
			if (fs.statSync(absolutePath)
				.isDirectory()) {
				testFolders.push(testFolder);
			}
		});
	return testFolders;
}

function saveFile(relativeFilePath, fileContents) {
	fs.writeFileSync(path.join(__dirname, relativeFilePath), fileContents);
}

function readFile(relativePath) {
	return fs.readFileSync(path.join(__dirname, relativePath));
}

module.exports = {
	getTestFolders,
	saveFile,
	readFile
};
