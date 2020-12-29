// const watch = require('node-watch');
const chokidar = require('chokidar');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

function getRelevantJobPromise(path) {
	return path.endsWith('ts') ? exec('yarn compile:typescript') : exec('npm run compile:styles');
}

let inProgress = false;
const watchFileExtenstions = ['ts', 'scss', 'json'];
async function onChange(path) {
	if (watchFileExtenstions.every(s => !path.endsWith(`.${s}`))) {
		return;
	}

	if (inProgress) {
		return;
	}
	inProgress = true;

	console.log('%s changed.', path);

	try {
		await getRelevantJobPromise(path);
	} catch (err) {
		console.log(err);
	}

	console.log('done');
	inProgress = false;
}

const watchPath = [
	'packages/**/src/**',
];

// Initialize watcher.
const watcher = chokidar.watch(watchPath, {
	ignored: ['**/node_modules/**/*', '**/.git/**/*'],
	persistent: true,
	ignoreInitial: true,
	followSymlinks: true,
});
// Add event listeners.
watcher.on('add', onChange).on('change', onChange).on('unlink', onChange);
