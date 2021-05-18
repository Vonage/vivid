import { Page, webkit } from 'playwright';

import * as handler from 'serve-handler';

import * as http from 'http';

import * as fs from 'fs';
import * as jimp from 'jimp';

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
	const tmpSnapshot = await takeSnapshot(page, SERVER_URL, tmpScreenshotPath);
	return compareImages(snapshotPath, tmpScreenshotPath);
}

async function compareImages(img1Path, img2Path) {
	const img1 = await jimp.read(fs.readFileSync(img1Path));
	const img2 = await jimp.read(fs.readFileSync(img2Path));
	// const {
	// 	width,
	// 	height
	// } = img1.bitmap;

	const diff = jimp.diff(img1, img2, 0.1);

	const distance = jimp.distance(img1, img2);
	await diff.image.writeAsync('./ui-tests/diff.png');

	return {
		...diff,
		distance
	};
}

async function takeSnapshot(page, url, snapshotPath) {
	await page.goto(url,
		{
			waitUntil: 'networkidle'
		});

	return page.screenshot({
		path: snapshotPath,
		fullPage: true
	});
}

async function runImageComparison() {
	const browser = await webkit.launch();
	const page = await browser.newPage();

	if (process.argv.includes('-u') || !fs.existsSync(SNAPSHOT_PATH)) {
		console.log('Updating snapshot...');
		await takeSnapshot(page, SERVER_URL, SNAPSHOT_PATH);
	} else {
		const diff = await compareToSnapshot(page, SNAPSHOT_PATH);
		if (diff.percent === 0) {
			console.log('Visual Diff Passed!');
			console.log('Distance: ', diff.distance, ' | Percent: ', diff.percent * 100, '%');
		} else {
			await browser.close();
			console.error('Distance: ', diff.distance, ' | Percent: ', diff.percent * 100, '%');
			throw new Error('Difference between base and current snapshot!');
		}
	}
	await browser.close();
}

server.listen(3000, async () => {
	console.log('Running at http://localhost:3000');

	await runImageComparison();
	server.close();
});

