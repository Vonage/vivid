const fs = require('fs');
const path = require('path');

function getTestFolders(workingFolder) {
	const testFolders = [];
	fs.readdirSync(workingFolder)
		.forEach((testFolder) => {
			const absolutePath = path.join(workingFolder, testFolder);
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
module.exports = {
	getTestFolders,
	saveFile
};
