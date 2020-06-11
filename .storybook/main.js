module.exports = {
	stories: ["../components/**/stories/*.stories.js"],
	addons: [
		"@storybook/addon-a11y/register.js",
		"@storybook/addon-docs/register.js",
		"@storybook/addon-knobs/register.js",
		"@storybook/addon-viewport/register.js",
		"storybook-addon-playroom/register.js",
	],
};
