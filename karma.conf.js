const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
	//	merging our stuff into default config
	const defaultConfig = createDefaultConfig(config);
	const extendedDefaultConfig = merge(defaultConfig, {
		files: [
			{ pattern: config.grep ? config.grep : '{common,components}/**/test/**/*.test.js', type: 'module' },
			{ pattern: 'common/design-tokens/build/**/*.scss', included: false }
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
					{ tag: 'coreSetupTest', src: 'common/core/test/core-setup.test.html' },
					{ tag: 'fontsSetupTest', src: 'common/fonts/test/fonts-setup.test.html' },
					{ tag: 'schemeSetupTest', src: 'common/scheme/test/scheme-setup.test.html' },
          { tag: 'drawerSetupTest', src: 'components/drawer/test/drawer-setup.test.html' },
				]
			}
		}
	});

	config.set(extendedDefaultConfig);
	return config;
};
