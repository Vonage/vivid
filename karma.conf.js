const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');
const {browsers} = require('minimist')(process.argv.slice(2));

module.exports = config => {
	//	merging our stuff into default config
	const defaultConfig = createDefaultConfig(config);
	const extendedDefaultConfig = merge(defaultConfig, {
		files: [
			{ pattern: config.grep ? config.grep : '{common,components}/**/test/**/*.test.js', type: 'module' },
		],
		preprocessors: {
			'common/design-tokens/build/scss/schemes/**/*.scss': ['file-fixtures'],
			'{common,components}/**/*.js': ['coverage']
		},
		esm: {
			nodeResolve: true,
		},
		frameworks: ['chai'],
		reporters: ['karmaHTML'],
		browserDisconnectTimeout: 300000,
		browserNoActivityTimeout: 360000,
		singleRun: true,
		autoWatch: false,
		restartOnFileChange: true,
		captureTimeout: 420000,
		client: {
			karmaHTML: {
				source: [
          { tag: 'coreSetupTest', src: 'common/core/test/core-setup.test.html' },
					{ tag: 'schemeSetupTestHTML', src: 'common/scheme/test/scheme-setup.test.html' }
				]
			}
		},
		coverageReporter: {
			dir: `coverage/${browsers ? browsers : ''}`,
			reporters: [
				{
					type: 'html', subdir: 'report-html'
				},
				{
					type: 'lcovonly', subdir: 'report-lcov'
				}
			]
		}
	});

	config.set(extendedDefaultConfig);
	return config;
};
