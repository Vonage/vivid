module.exports = {
	stories: [
		'../common/**/stories/*.stories.js',
		'../components/**/stories/*.stories.js'
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-docs',
		'@storybook/addon-knobs',
		'@storybook/addon-storysource',
		'@storybook/addon-viewport'
	]
};
