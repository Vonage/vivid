const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { buildTests, buildMainPage } = require('./utils/preBundle');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getTestFolders } = require('./utils/files-utils');
const componentsExcludeList = require('./excludedTests');

const listOfComponents = getTestFolders().filter(component => !componentsExcludeList.includes(component));
const entry = listOfComponents.reduce((entries, componentName) => {
	entries[componentName] = path.join(__dirname, `tmp/${componentName}/index.js`);
	return entries;
}, {});

entry.mainPage = (path.join(__dirname, 'assets/main.js'));

const htmlGenerators = listOfComponents.reduce((entries, componentName) => {
	entries.push(new HtmlWebpackPlugin({
		inject: true,
		chunks: [componentName],
		filename: `${componentName}.html`
	}));
	return entries;
}, []);

htmlGenerators.push(new HtmlWebpackPlugin({
	inject: false,
	chunks: ['mainPage'],
	filename: 'index.html',
	template: path.join(__dirname, 'tmp/index.html.tmpl')
}));
const config = {
	entry,
	output: {
		filename: '[name].bundle.js', // the file name would be my entry's name with a ".bundle.js" suffix
		path: path.resolve(__dirname, 'dist') // put all of the build in a dist folder
	},
	plugins: [
		new CleanWebpackPlugin(), // use the clean plugin to delete the dist folder before a build
		...htmlGenerators,
		{
			apply: async (compiler) => {
				compiler.hooks.beforeRun.tapPromise('MyPlugin_compile', async () => {
					await buildMainPage();
					return buildTests();
				});
				compiler.hooks.done.tapPromise('MyPlugin_done', async () => {
					return true;
				});
			},
		}
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env']
						],
						plugins: [
							'@babel/plugin-proposal-nullish-coalescing-operator',
						]
					}
				}
			},
			// use the html loader
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: { loader: 'html-loader' }
			},
			// use the css loaders (first load the css, then inject the style)
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	devServer: {
		client: {
			progress: true,
		},
		static: {
			publicPath: path.join(__dirname, 'dist')
		},
		compress: true,
		port: 3001,
	}
};

module.exports = config;
