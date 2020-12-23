module.exports = {
	stories: [
		'../common/**/stories/*.stories.js',
		'../components/**/stories/*.stories.js',
		'../docs/**/stories/**/*.stories.js',
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-docs',
		'@storybook/addon-controls',
		'@storybook/addon-viewport',
		'@whitespace/storybook-addon-html',
	],
};
