module.exports = {
	stories: [
		'../components/**/stories/*.stories.js',
		'../common/**/stories/*.stories.js'
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		// '@storybook/addon-console',
		'@storybook/addon-docs',
		'@storybook/addon-knobs',
		'@storybook/addon-viewport'
	]
};
