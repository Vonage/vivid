import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');


StyleDictionaryPackage.registerFormat({
	name: 'custom/format/enums',
	formatter: _.template(
		fs.readFileSync(resolve('templates/ts-enum.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig() {
	return {
		source: [
			`${propertiesPath}/globals/typography/*.json`,
			`${propertiesPath}/typography/web.json`,
		],
		platforms: {
			ts: {
				transformGroup: 'js',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: 'build/types/font-faces.ts',
						format: 'custom/format/enums',
						mapName: 'VVDFontFace',
						filter: {
							attributes: {
								category: 'typography'
							}
						},
					}
				]
			}
		}
	};
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const render = () => {
	console.log('\n🔁\x1b[2mProcessing typography types\x1b[0m');

	StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform('ts');

	console.log('\n\x1b[2m================================================================\x1b[0m');
};
