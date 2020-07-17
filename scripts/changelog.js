const fs = require('fs');
const core = require('@actions/core');

const fileContent = fs.readFileSync('./CHANGELOG.md').toString();

console.log("The content is: ", fileContent);

core.exportVariable('VERSION_CHANGE_LOG', fileContent);

