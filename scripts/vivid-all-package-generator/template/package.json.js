module.exports = function({
	main = "index.js",
	name = "@vonage/vivid",
	version = "1.0.0",
	dependencies = {},
	component_map = []
}) {
	return {
		'name': name,
		'version': version,
		'description': 'A bundled version of all Vivid components',
		'main': main,
		'scripts': {
			'test': 'echo "Error: no test specified" && exit 1'
		},
		'sideEffects': false,
		'keywords': ['Vivid', 'Components', 'All'],
		'license': 'ISC',
		'dependencies': dependencies,
		'com_vonage': { 'components': component_map }
	};
};

