const { createDefaultConfig } = require('@open-wc/building-webpack');

module.exports = {
	components: "./components/button/vwc-button.js",
	outputPath: "./dist/playroom",

	// Optional:
	title: "My Awesome Library",
	widths: [320, 375, 768, 1024],
	port: 9000,
	openBrowser: false,
	paramType: "search", // default is 'hash'
	exampleCode: `
    <vwc-button>
      Hello World!
    </vwc-button>
  `,
	baseUrl: "/",
	iframeSandbox: "allow-scripts",
	snippets: "./playroom/snippets.js",
	typeScriptFiles: [
    './components/**/src/*.{ts,tsx}',
    '!**/node_modules'
  ]
};
