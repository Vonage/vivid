const { createDefaultConfig } = require('@open-wc/testing-karma');
require('karma-scss-preprocessor');
const merge = require('deepmerge');

module.exports = config => {
	//	merging our stuff into default config
	const defaultConfig = createDefaultConfig(config);
	const extendedDefaultConfig = merge(defaultConfig, {
		files: [
			{ pattern: config.grep ? config.grep : '{common,components}/**/test/**/*.test.js', type: 'module' },
			{ pattern: 'common/design-tokens/build/scss/schemes/**/*.scss' }
		],
		preprocessors: {
			'*.scss': ['scss']
		},
		esm: {
			nodeResolve: true,
		},
		frameworks: ['chai', 'fixture', 'scss'],
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
