import fs from 'fs';
import { resolve } from 'path';
import _ from 'lodash';
import StyleDictionaryPackage from 'style-dictionary';

const TYPOGRAPHY_TYPES = ['web'],
	CUSTOM_TYPOGRAPHY_FORMAT = 'custom/web/scss/typography',
	OUTPUT_FOLDER = 'build/scss/typography-variables';

StyleDictionaryPackage.registerFormat({
	name: CUSTOM_TYPOGRAPHY_FORMAT,
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-typography.template'))
	),
});

function getStyleDictionaryConfig(type, defsFolder, dataFolder) {
	return {
		source: [
			`${defsFolder}/*.json`,
			`${dataFolder}/${type}.json`
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'scss',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `${OUTPUT_FOLDER}/${type}.scss`,
						mapName: 'typography-category-list',
						format: CUSTOM_TYPOGRAPHY_FORMAT,
						filter: {
							attributes: {
								category: 'typography'
							}
						}
					}
				]
			}
		}
	};
}

export const render = () => {
	console.log('\n==============================================');
	console.log('\nProcessing typography variables');

	fs.rmdirSync(OUTPUT_FOLDER, { recursive: true });
	const propertiesFolder = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');
	const definitionsFolder = resolve(propertiesFolder, 'globals', 'typography');
	const typographiesFolder = resolve(propertiesFolder, 'typography');

	for (const typographyType of TYPOGRAPHY_TYPES) {
		const dictionaryConfig = getStyleDictionaryConfig(typographyType, definitionsFolder, typographiesFolder);
		StyleDictionaryPackage.extend(dictionaryConfig).buildPlatform('web');
	}

	console.log('\ntypography processing DONE');
};
