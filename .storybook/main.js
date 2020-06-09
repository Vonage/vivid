module.exports = {
	stories: ["../{common,components}/**/*.stories.{js,md,mdx}"],
	addons: [
		"storybook-prebuilt/addon-knobs/register.js",
		"storybook-prebuilt/addon-docs/register.js",
		"storybook-prebuilt/addon-viewport/register.js",
		"@storybook/addon-contexts/register",
		"@storybook/addon-backgrounds/register",
	],
	esDevServer: {
		// custom es-dev-server options
		nodeResolve: true,
		watch: true,
	},
};
