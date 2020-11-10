import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

// StyleDictionaryPackage.registerFormat({
// 	name: 'custom/format/scss',
// 	formatter: _.template(
// 		fs.readFileSync(resolve('templates/web-scss-typography.template'))
// 	),
// });

function getStyleDictionaryConfig(key, path) {
	return {
		source: [path],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'scss',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `build/scss/typography-variables/_${key}.scss`,
						format: 'scss/variables'
					}
				]
			}
		}
	};
}

export const render = () => {
	console.log('\n==============================================');
	console.log(`\nProcessing typography variables`);

	const propertiesFolder = resolve('../../node_modules/@vonage/vvd-design-tokens-properties');
	const typographyFolder = resolve(propertiesFolder, 'globals', 'typograpy');

	const categoryFiles = fs.readdirSync(typographyFolder);
	console.log(`\tprocessing ${categoryFiles.length} category/ies`);

	categoryFiles.forEach(categoryFile => {
		const categoryKey = categoryFile.replace(/\.json$/, '');
		const categoryPath = resolve(typographyFolder, categoryFile);
		const dictionaryConfig = getStyleDictionaryConfig(categoryKey, categoryPath);
		StyleDictionaryPackage.extend(dictionaryConfig).buildPlatform('web');
	});

	console.log('\nEnd processing');
};