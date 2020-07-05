const
	fs = require('fs'),
	path = require('path');

const
	OUT_PATH = './.storybook/static',
	OUT_FILE = 'build-details.json';

//	execution part
//
run();

//	definitions path
//
function run() {
	console.info('starting build details preparation...');
	ensureOutDir();
	const details = buildDetails();
	writeDetails(details);
	console.info('build details are ready');
}

function ensureOutDir() {
	if (!fs.existsSync(OUT_PATH)) {
		fs.mkdirSync(OUT_PATH)
	}
}

function buildDetails() {
	const externalDescriptorPath = './lerna.json';
	const externalDescription = JSON.parse(fs.readFileSync(externalDescriptorPath, { encoding: 'utf8' }));
	const result = Object.freeze({
		timestamp: new Date().getTime(),
		version: externalDescription.version
	});
	console.info('\tbuild details constructed');
	return result;
}

function writeDetails(details) {
	if (!details || typeof details !== 'object') {
		throw new Error(`details to write expected to be a non-null object; got ${details}`);
	}
	fs.writeFileSync(path.join(OUT_PATH, OUT_FILE), JSON.stringify(details));
	console.info('\tbuild details JSON has been written');
}