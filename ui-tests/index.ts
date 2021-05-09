import { webkit } from 'playwright';

const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
	// You pass two more arguments for config and middleware
	// More details here: https://github.com/vercel/serve-handler#options
	return handler(request, response, {
		public: 'ui-tests/dist'
	});
});

server.listen(3000, () => {
	console.log('Running at http://localhost:3000');

	(async () => {
		const browser = await webkit.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:3000');
		await page.screenshot({ path: './ui-tests/image.png' });

		await browser.close();

		server.close();
	})();
});




