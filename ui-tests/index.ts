import { Page, webkit } from 'playwright';

import handler from 'serve-handler';

import * as http from 'http';

import * as fs from 'fs';
import * as jimp from 'jimp';
import { getFilteredTestFolders } from './utils/files-utils';
import { pascalCase } from 'pascal-case';

import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';

interface ComparisonResult {
	image: any;
	percent: number;
	distance: number;
}

const PORT = process.env.PORT || 3000;
const SERVER_URL = `http://localhost:${PORT}`;
const SNAPSHOT_PATH = './ui-tests/snapshots';

async function compareToSnapshot(page: Page, snapshotPath: string) {
	const componentName = snapshotPath.substring(snapshotPath.lastIndexOf('/') + 1, snapshotPath.lastIndexOf('.'));
	const tmpScreenshotPath = snapshotPath.replace(componentName, `${componentName}-snapshot`);
	await takeSnapshot(page, tmpScreenshotPath);
	const comparisonResult = await compareImages(snapshotPath, tmpScreenshotPath);

	await comparisonResult.image.writeAsync(snapshotPath.replace(componentName, `${componentName}-diff`));

	return comparisonResult;
}

async function compareImages(img1Path, img2Path): Promise<ComparisonResult> {
	const img1 = await jimp.read(fs.readFileSync(img1Path));
	const img2 = await jimp.read(fs.readFileSync(img2Path));

	const diff = jimp.diff(img1, img2, 0.1);

	const distance = jimp.distance(img1, img2);

	return {
		...diff,
		distance
	};
}

async function takeSnapshot(page, snapshotPath) {
	const componentName = snapshotPath.substring(snapshotPath.lastIndexOf('/') + 1, snapshotPath.lastIndexOf('.'));
	const elementId = `#${pascalCase(componentName)
		.replace('Snapshot', '')}`;
	const element = await page.$(elementId);
	let screenShotHandler = element;
	if (await element.getAttribute('testWholePage')) {
		screenShotHandler = page;
	}
	return screenShotHandler.screenshot({
		path: snapshotPath,
		fullPage: true
	});
}

function resultsMessage(diff) {
	return `Distance: ${diff.distance} | Percent: ${(diff.percent * 100).toFixed(2)} %`;
}

async function runImageComparison() {
	const testedComponents = getFilteredTestFolders();
	const browser = await webkit.launch();

	for (const i in testedComponents) {
		console.log(`Testing ${testedComponents[i]}`);
		await runTestOnComponent(browser, testedComponents[i]);
	}

	console.log('Visual tests completed!');
	await browser.close();
}

async function runTestOnComponent(browser, componentName) {
	const pageInstance = await browser.newPage();
	const testUrl = `${SERVER_URL}/${componentName}`;
	pageInstance.goto(testUrl);
	return new Promise((res) => {
		pageInstance.context()
			.exposeBinding('doTest', async ({ page }) => {
				await doTest(page);
				res(true);
			});
	});
}

async function doTest(page) {
	const componentName = page.url()
		.split('/')
		.splice(-1, 1)[0];
	const snapshotPath = `${SNAPSHOT_PATH}/${componentName}.png`;
	await page.waitForLoadState('networkidle');
	if (process.argv.includes('-u')) {
		console.log('Updating snapshot...');
		await (new Promise(res => setTimeout(res, 200)));
		await takeSnapshot(page, snapshotPath);
	} else {
		if (!fs.existsSync(snapshotPath)) {
			console.error(`Missing snapshot for ${componentName}`);
			process.exitCode = 1;
			return;
		}
		const diff = await compareToSnapshot(page, snapshotPath);
		if (diff.percent === 0) {
			console.log('Visual Diff Passed!');
			console.log(resultsMessage(diff));
		} else {
			console.error(resultsMessage(diff));
			process.exitCode = 1;
		}
	}
}

function finalizeTest(testsServer) {
	//	decide process exit code
	testsServer.close();
}

function setDevServer() {
	const compiler = Webpack({
		...webpackConfig,
		mode: 'development'
	});
	const devServerOptions = {
		...webpackConfig.devServer,
		open: true
	};
	const devServer = new WebpackDevServer(devServerOptions, compiler);

	devServer.listen(webpackConfig.devServer.port, '127.0.0.1', () => {
		console.log(`Starting server on http://localhost:${webpackConfig.devServer.port}`);
	});
}

function runTests(port = PORT) {
	const server = http.createServer((request, response) => {
		return handler(request, response, {
			public: 'ui-tests/dist'
		});
	});

	return new Promise((res, rej) => {
		server.listen(port, async () => {
			console.log('Running at ', `http://localhost:${port}`);

			try {
				await runImageComparison();
			} catch (e) {
				console.error(e);
				process.exitCode = 1;
				server.close();
			}

			res(server);
		});
	});
}

if (!process.argv.includes('-s')) {
	runTests()
		.then(finalizeTest);
} else {
	setDevServer();
}


