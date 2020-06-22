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
	ensureOutDir();
	const details = buildDetails();
	writeDetails(details);
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
		timestamp: new Date().toISOString(),
		version: externalDescription.version
	});
	return result;
}

function writeDetails(details) {
	if (!details || typeof details !== 'object') {
		throw new Error(`details to write expected to be a non-null object; got ${details}`);
	}
	fs.writeFileSync(path.join(OUT_PATH, OUT_FILE), JSON.stringify(details));
}