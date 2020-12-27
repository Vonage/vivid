import fs from 'fs';
import path from 'path';
import process from 'process';

const
	BASE_URL_ARG = 'base-url',
	STORYBOOK_PATH = './.out',
	BUILD_DETAILS_PATH = 'build-details.json',
	MANAGER_HEAD_PATH = 'index.html',
	UTF8_ENCODING = 'utf-8';

export default build;

//	definitions path
//
function build() {
	console.info('starting base URL update...');
	let baseUrl = '';
	const baseUrlArg = process.argv.find(a => a.startsWith(BASE_URL_ARG));
	if (baseUrlArg) {
		baseUrl = baseUrlArg.replace(BASE_URL_ARG + '=', '');
	}
	if (baseUrl) {
		console.info(`\tbase URL taken from CL argument ('${baseUrl}')`);
	} else {
		baseUrl = obtainTimestamp();
		console.info(`\tbase URL taken from timestamp ('${baseUrl}')`);
	}
	if (baseUrl) {
		console.info(`\tupdating base URL with '${baseUrl}'`);
		updateBaseUrl(baseUrl);
		console.info('base URL updated');
	} else {
		console.error('failed to resolve base URL, update FAILED');
	}
}

function obtainTimestamp() {
	const json = fs.readFileSync(path.resolve(STORYBOOK_PATH, BUILD_DETAILS_PATH), UTF8_ENCODING);
	const details = JSON.parse(json);
	return details.timestamp;
}

function updateBaseUrl(baseUrl) {
	const htmlFilePath = path.resolve(STORYBOOK_PATH, MANAGER_HEAD_PATH);
	const managerHeadHtml = fs.readFileSync(htmlFilePath, UTF8_ENCODING);
	const output = managerHeadHtml.replace('<base href="/">', `<base href="/${baseUrl}/">`);
	fs.writeFileSync(htmlFilePath, output, UTF8_ENCODING);
}