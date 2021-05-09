import { Page, webkit } from 'playwright';

import * as handler from 'serve-handler';

import * as http from 'http';

import * as fs from 'fs';

import { PNG } from 'pngjs';

import * as pixelmatch from 'pixelmatch';

const PORT = 3000;
const SERVER_URL = `http://localhost:${PORT}`;
const SNAPSHOT_PATH = './ui-tests/snapshot.png';

const server = http.createServer((request, response) => {
	return handler(request, response, {
		public: 'ui-tests/dist'
	});
});

async function compareToSnapshot(page: Page, snapshotPath: string) {
	const tmpScreenshotPath = './ui-tests/tmpScreenshot.png';
	await takeSnapshot(page, SERVER_URL, tmpScreenshotPath);

	return compareImages(snapshotPath, tmpScreenshotPath);
}

function compareImages(img1Path, img2Path) {
	const img1 = PNG.sync.read(fs.readFileSync(img1Path));
	const img2 = PNG.sync.read(fs.readFileSync(img2Path));
	const {
		width,
		height
	} = img1;
	const diff = new PNG({
		width,
		height
	});

	const diffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

	fs.writeFileSync('./ui-tests/diff.png', PNG.sync.write(diff));

	return {
		diffPixels,
		diff
	};
}

async function takeSnapshot(page, url, snapshotPath) {
	await page.goto(url);
	await page.screenshot({ path: snapshotPath });
}

async function runImageComparison() {
	const browser = await webkit.launch();
	const page = await browser.newPage();

	if (process.argv.includes('-u') || !fs.existsSync(SNAPSHOT_PATH)) {
		console.log('Updating snapshot...');
		await takeSnapshot(page, SERVER_URL, SNAPSHOT_PATH);
	} else {
		const diff = await compareToSnapshot(page, SNAPSHOT_PATH);
		if (diff.diffPixels) throw new Error('Difference between base and current snapshot!');
		console.log('Visual Diff Passed!');
	}
	await browser.close();
}

server.listen(3000, async () => {
	console.log('Running at http://localhost:3000');

	await runImageComparison();
	server.close();
});



