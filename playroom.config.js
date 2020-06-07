module.exports = {
	components: "./components/button/vwc-button",
	outputPath: "./dist/playroom",

	// Optional:
	title: "My Awesome Library",
	snippets: "./playroom/snippets.js",
	widths: [320, 375, 768, 1024],
	port: 9000,
	openBrowser: true,
	paramType: "search", // default is 'hash'
	exampleCode: `
    <Button>
      Hello World!
    </Button>
  `,
	baseUrl: "/playroom/",
	webpackConfig: () => ({
		// Custom webpack config goes here...
	}),
	iframeSandbox: "allow-scripts",
};
