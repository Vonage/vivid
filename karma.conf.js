const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
	//	merging our stuff into default config
	const defaultConfig = createDefaultConfig(config);
	const extendedDefaultConfig = merge(defaultConfig, {
		files: [
			{ pattern: config.grep ? config.grep : '{common,components}/**/test/**/*.test.js', type: 'module' },
			{ pattern: 'common/design-tokens/build/**/*.scss', included: false },
			'node_modules/axe-core/axe.js'
		],
		preprocessors: {
			'common/design-tokens/build/scss/schemes/**/*.scss': ['file-fixtures'],
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
					{ tag: 'contextSetupTest', src: 'common/context/test/context-setup.test.html' },
					{ tag: 'coreSetupTest', src: 'common/core/test/core-setup.test.html' },
					{ tag: 'fontsSetupTest', src: 'common/fonts/test/fonts-setup.test.html' },
					{ tag: 'schemeSetupTest', src: 'common/scheme/test/scheme-setup.test.html' },
					{ tag: 'drawerSetupTest', src: 'components/drawer/test/drawer-setup.test.html' },
				]
			}
		},
		coverageReporter: {
			dir: `coverage/`,
			reporters: [
				{
					type: 'cobertura', subdir: 'report-cobertura', file: 'coverage.xml'
				},
				{
					type: 'lcovonly', subdir: 'report-lcov', file: 'lcov.info'
				}
			]
		},
		customLaunchers: {
			Safari_13_BS: {
				base: 'BrowserStack',
				browser: 'safari',
				browser_version: '13.1',
				os: 'OS X',
				os_version: 'Catalina'
			}
		},
		browsers: ['Safari_13_BS']
	});

	config.set(extendedDefaultConfig);
	return config;
};
