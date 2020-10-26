import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');


StyleDictionaryPackage.registerFormat({
	name: 'custom/format/scss',
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-coupling.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig() {
	return {
		source: [
			`${propertiesPath}/globals/**/*.json`,
			`${propertiesPath}/scheme/light/base.json`,
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'scss',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `build/scss/schemes/_variables-coupling.scss`,
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


// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
export const render = () => {
		console.log('\n==============================================');
		console.log(`\nProcessing scheme variables coupling`);

		StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform('web');

		console.log('\nEnd processing');
};