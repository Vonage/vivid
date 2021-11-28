import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const
	propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties/dist'),
	CUSTOM_SCHEMES_FORMAT = 'custom/web/scss/schemes',
	OUTPUT_FOLDER = 'build/scss/sizing';

StyleDictionaryPackage.registerFormat({
	name: CUSTOM_SCHEMES_FORMAT,
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-schemes.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig() {
	return {
		source: [
			`${propertiesPath}/sizing/**/*.json`,
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'css',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `${OUTPUT_FOLDER}/sizing.scss`,
						format: CUSTOM_SCHEMES_FORMAT,
						filter: token => token.attributes.category !== 'alias'
					}
				]
			}
		}
	};
}

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const render = () => {
	fs.rmdirSync(OUTPUT_FOLDER, { recursive: true });

	//console.log(`\n🎨\x1b[2mProcessing: [\x1b[0m\x1b[36m\sizing\x1b[0m\x1b[2m]\x1b[0m`);

	StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform('web');

	//console.log('\n\x1b[2m================================================================\x1b[0m');
};
