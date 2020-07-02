const
	fs = require('fs'),
	path = require('path');

const
	STORYBOOK_PATH = './.out',
	BUILD_DETAILS_PATH = 'build-details.json',
	MANAGER_HEAD_PATH = 'index.html',
	UTF8_ENCODING = 'utf-8';

//	execution part
//
run();

//	definitions path
//
function run() {
	console.info('starting base URL update...');
	const timestamp = obtainTimestamp();
	updateBaseUrl(timestamp);
	console.info('base URL updated');
}

function obtainTimestamp() {
	const json = fs.readFileSync(path.resolve(STORYBOOK_PATH, BUILD_DETAILS_PATH), UTF8_ENCODING);
	const details = JSON.parse(json);
	return details.timestamp;
}

function updateBaseUrl(baseUrl) {
	const htmlFilePath = path.resolve(STORYBOOK_PATH, MANAGER_HEAD_PATH);
	const managerHeadHtml = fs.readFileSync(htmlFilePath, UTF8_ENCODING);
	const output = managerHeadHtml.replace('<base href="/">', `<base href="/${baseUrl}">`);
	fs.writeFileSync(htmlFilePath, output, UTF8_ENCODING);
}