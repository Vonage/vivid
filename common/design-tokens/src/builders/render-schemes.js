import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';
import R from 'ramda';

const
	propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties'),
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
			`${propertiesPath}/globals/color/**/*.json`,
			`${propertiesPath}/schemes/${scheme}/${scope}.json`,
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
						filter: {
							attributes: {
								category: 'color'
							}
						}
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
	fs.rmdirSync(OUTPUT_FOLDER, { recursive: true });

	['light', 'dark'].forEach(function (scheme) {

		console.log(`\n🎨\x1b[2mProcessing: [\x1b[0m\x1b[36m${scheme}\x1b[0m\x1b[2m]\x1b[0m`);

		StyleDictionaryPackage.extend(baseConfig(scheme)).buildPlatform('web');
		StyleDictionaryPackage.extend(alternateConfig(scheme)).buildPlatform('web');

		console.log('\n\x1b[2m================================================================\x1b[0m');
	});
};
