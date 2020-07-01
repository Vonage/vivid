module.exports = {
	stories: [
		'../components/**/stories/*.stories.js',
		'../common/**/stories/*.stories.js'
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-docs',
		'@storybook/addon-knobs',
		'@storybook/addon-viewport'
	],
	webpackFinal: config => {
		config.output.hashDigestLength = 4;
		config.output.chunkFilename = '[name].[contenthash].bld.js';
		config.output.filename = '[name].[contenthash].bdl.js';
		return config;
	}
};
