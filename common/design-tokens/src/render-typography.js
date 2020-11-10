import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');

// StyleDictionaryPackage.registerFormat({
// 	name: 'custom/format/scss',
// 	formatter: _.template(
// 		fs.readFileSync(resolve('templates/web-scss-typography.template'))
// 	),
// });

function getStyleDictionaryConfig() {
	return {
		source: [
			`${propertiesPath}/globals/font/typography.json`
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'scss',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `build/scss/fonts/_typography-variables.scss`,
						format: 'scss/variables',
						filter: prop => {
							console.info(prop);
						}
					}
				]
			}
		}
	};
}

export const render = () => {
	console.log('\n==============================================');
	console.log(`\nProcessing typography variables`);

	const dictionaryConfig = getStyleDictionaryConfig();
	StyleDictionaryPackage.extend(dictionaryConfig).buildPlatform('web');

	console.log('\nEnd processing');
};
