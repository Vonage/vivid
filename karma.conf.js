const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
	//	merging our stuff into default config
	const defaultConfig = createDefaultConfig(config);
	const extendedDefaultConfig = merge(defaultConfig, {
		files: [
			// runs all files ending with .test in the test folder,
			// can be overwritten by passing a --grep flag. examples:
			//
			// npm run test -- --grep test/foo/bar.test.js
			// npm run test -- --grep test/bar/*
			{ pattern: config.grep ? config.grep : '{common,components}/**/test/**/*.test.js', type: 'module' },
		],
		esm: {
			nodeResolve: true,
		},
		frameworks: ['chai'],
		browserDisconnectTimeout: 300000,
		browserNoActivityTimeout: 360000,
		captureTimeout: 420000,
		coverageIstanbulReporter: {
			thresholds: {
				global: {
					statements: 10,
					lines: 10,
					branches: 3,
					functions: 10,
				},
			},
		},
	});

	config.set(extendedDefaultConfig);
	return config;
};
