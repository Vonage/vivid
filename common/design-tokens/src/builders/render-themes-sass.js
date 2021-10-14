import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties/dist');


StyleDictionaryPackage.registerFormat({
	name: 'custom/format/css-to-scss',
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-variables.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig() {
	return {
		source: [
			`${propertiesPath}/color/**/*.json`,
			`${propertiesPath}/shadow/**/*.json`,
			`${propertiesPath}/themes/light/**/main.json`,
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'scss',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: 'build/scss/semantic-variables/_scheme-variables.scss',
						format: 'custom/format/css-to-scss',
						filter: token => token.attributes.category !== 'alias'
					}
				]
			}
		}
	};
}


// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const render = () => {
	console.log('\n🔁\x1b[2mProcessing scheme variables coupling\x1b[0m');

	StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform('web');

	console.log('\n\x1b[2m================================================================\x1b[0m');
};
