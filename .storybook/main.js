const path = require('path');

const chromaticIgnoredComponents = ['circular-progress'];

module.exports = {
	stories: process.env.CHROMATIC ? [
			'../components/**/stories/*.stories.js',
			`!(../components/(${chromaticIgnoredComponents.join('|')})/stories/*)`
		] :
		[
		'../common/**/stories/*.stories.js',
		'../components/**/stories/*.stories.js',
		'../docs/**/stories/**/*.stories.js',
	],
	addons: process.env.CHROMATIC ? [] :
		[
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-docs',
		'@storybook/addon-controls',
		'@storybook/addon-viewport',
		'@whitespace/storybook-addon-html',
	],
	webpackFinal: (config)=>{
		config.module.rules.push({
			test: /icon-manifest\.json$/,
			use: {
				loader: path.resolve(__dirname, './icon-manifest-loader.js'),
				options: {}
			}
		});
		return config;
	}
};
