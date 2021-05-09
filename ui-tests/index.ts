import { webkit } from 'playwright';

(async () => {
	const browser = await webkit.launch();
	const page = await browser.newPage();
	await page.goto('http://vivid.vonage.com');
	await page.screenshot({ path: './ui-tests/image.png' });

	await browser.close();
})();
