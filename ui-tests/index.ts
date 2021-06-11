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
	await takeSnapshot(page, tmpScreenshotPath);
	return compareImages(snapshotPath, tmpScreenshotPath);
}

async function compareImages(img1Path, img2Path) {
	const img1 = await jimp.read(fs.readFileSync(img1Path));
	const img2 = await jimp.read(fs.readFileSync(img2Path));

	const diff = jimp.diff(img1, img2, 0.1);

	const distance = jimp.distance(img1, img2);
	await diff.image.writeAsync('./ui-tests/diff.png');

	return {
		...diff,
		distance
	};
}

async function takeSnapshot(page, snapshotPath) {
	return page.screenshot({
		path: snapshotPath,
		fullPage: true
	});
}

function resultsMessage(diff) {
	return `Distance: ${diff.distance} | Percent: ${(diff.percent * 100).toFixed(2)} %`;
}

async function runImageComparison() {
	const browser = await webkit.launch();
	const page = await browser.newPage();

	//	setup callback
	page.context().exposeBinding('doTest', async ({ page }) => {
		await doTest(page);
		await browser.close();
		finalizeTest();
	});

	//	navigate to page
	await page.goto(SERVER_URL);
}

async function doTest(page) {
	await page.waitForLoadState('networkidle');
	if (process.argv.includes('-u') || !fs.existsSync(SNAPSHOT_PATH)) {
		console.log('Updating snapshot...');
		await takeSnapshot(page, SNAPSHOT_PATH);
	} else {
		const diff = await compareToSnapshot(page, SNAPSHOT_PATH);
		if (diff.percent === 0) {
			console.log('Visual Diff Passed!');
			console.log(resultsMessage(diff));
		} else {
			console.error(resultsMessage(diff));
			process.exitCode = 1;
		}
	}
}

function finalizeTest() {
	//	decide process exit code
	server.close();
}

server.listen(3000, async () => {
	console.log('Running at http://localhost:3000');

	try {
		await runImageComparison();
	} catch (e) {
		console.error(e);
		process.exitCode = 1;
		server.close();
	}
});
