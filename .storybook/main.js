module.exports = {
	stories: [
		'../common/*/stories/*.stories.{js,mdx}',
		'../components/*/stories/*.stories.{js,mdx}'
	],
	addons: [
		'@storybook/addon-a11y/register.js',
		'@storybook/addon-docs/register.js',
		'@storybook/addon-knobs/register.js',
		'@storybook/addon-viewport/register.js',
		'storybook-addon-playroom/register.js'
	],
	esDevServer: {
		nodeResolve: true,
		watch: true,
		open: true,
	},
};
