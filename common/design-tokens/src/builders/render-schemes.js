import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';
import R from 'ramda';

const propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');


StyleDictionaryPackage.registerFormat({
	name: 'custom/format/scss',
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss.template'))
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
						destination: `build/scss/schemes/${scheme}/${scope}.scss`,
						format: 'custom/format/scss',
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
const baseConfig = curriedGetStyleDictionaryConfig(R.__, 'base');
const alternateConfig = curriedGetStyleDictionaryConfig(R.__, 'alternate');

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
export const render = () => {
	['light', 'dark'].forEach(function (scheme) {
		console.log('\n==============================================');
		console.log(`\nProcessing: [${scheme}]`);

		StyleDictionaryPackage.extend(baseConfig(scheme)).buildPlatform('web');
		StyleDictionaryPackage.extend(alternateConfig(scheme)).buildPlatform('web');

		console.log('\nEnd processing');
	});
};