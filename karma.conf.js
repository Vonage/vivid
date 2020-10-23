const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
	//	merging our stuff into default config
	const defaultConfig = createDefaultConfig(config);
	const extendedDefaultConfig = merge(defaultConfig, {
		files: [
			{ pattern: config.grep ? config.grep : '{common,components}/**/test/**/*.test.js', type: 'module' },
		],
		preprocessors: {
			'common/design-tokens/build/scss/schemes/**/*.scss': ['file-fixtures']
		},
		esm: {
			nodeResolve: true,
		},
		frameworks: ['chai'],
		browserDisconnectTimeout: 300000,
		browserNoActivityTimeout: 360000,
		singleRun: true,
		autoWatch: false,
		restartOnFileChange: true,
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
		}
	});

	config.set(extendedDefaultConfig);
	return config;
};
