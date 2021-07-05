const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { buildTests } = require('./utils/preBundle');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getTestFolders } = require('./utils/files-utils');
const componentsExcludeList = require('./excludedTests');

const listOfComponents = getTestFolders().filter(component => !componentsExcludeList.includes(component));
const entry = listOfComponents.reduce((entries, componentName) => {
	entries[componentName] = `./ui-tests/tmp/${componentName}/index.js`;
	return entries;
}, {});

const htmlGenerators = listOfComponents.reduce((entries, componentName) => {
	entries.push(new HtmlWebpackPlugin({
		inject: true,
		chunks: [componentName],
		filename: `${componentName}.html`
	}));
	return entries;
}, []);

module.exports = {
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
				compiler.hooks.beforeRun.tap('MyPlugin_compile', async () => await buildTests());
			},
		},
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
	}
};
