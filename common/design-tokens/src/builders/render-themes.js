import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';
import R from 'ramda';
import {removeFolderSafely} from './utils.js';

const
	propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties/dist'),
	CUSTOM_SCHEMES_FORMAT = 'custom/web/scss/schemes',
	OUTPUT_FOLDER = 'build/scss/schemes';

StyleDictionaryPackage.registerFormat({
	name: CUSTOM_SCHEMES_FORMAT,
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-schemes.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(scheme, scope) {
	return {
		source: [
			`${propertiesPath}/color/**/*.json`,
			`${propertiesPath}/shadow/**/*.json`,
			`${propertiesPath}/themes/${scheme}/**/${scope}.json`,
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'css',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `${OUTPUT_FOLDER}/${scheme}/${scope}.scss`,
						format: CUSTOM_SCHEMES_FORMAT,
						filter: token => token.attributes.category !== 'alias'
					}
				]
			}
		}
	};
}

const curriedGetStyleDictionaryConfig = R.curry(getStyleDictionaryConfig);
const baseConfig = curriedGetStyleDictionaryConfig(R.__, 'main');
const alternateConfig = curriedGetStyleDictionaryConfig(R.__, 'alternate');


// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const render = () => {
	removeFolderSafely(OUTPUT_FOLDER);

	['light', 'dark'].forEach(function (scheme) {
		console.log(`\n🎨\x1b[2mProcessing: [\x1b[0m\x1b[36m${scheme}\x1b[0m\x1b[2m]\x1b[0m`);

		StyleDictionaryPackage.extend(baseConfig(scheme)).buildPlatform('web');
		StyleDictionaryPackage.extend(alternateConfig(scheme)).buildPlatform('web');

		console.log('\n\x1b[2m================================================================\x1b[0m');
	});
};
