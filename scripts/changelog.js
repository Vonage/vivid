const fs = require('fs');
const core = require('@actions/core');

const fileContent = fs.readFileSync('./CHANGELOG.md').toString();

core.exportVariable('versionChangeLog', fileContent);

