import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const propertiesPath = resolve('./properties');


StyleDictionaryPackage.registerFormat({
	name: 'custom/format/scss',
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-typography-new.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(media) {
	return {
		source: [
			`${propertiesPath}/globals/typography/**/*.json`,
			`${propertiesPath}/typography/${media}.json`,
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'web',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: `build/scss/typography/${media}.scss`,
						format: 'custom/format/scss',
						mapName: 'typography-category-list',
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


// PROCESS THE DESIGN TOKENS FOR THE TYPOGRAPHY SCHEME AND MEDIAS
export const render = () => {
	['base', 'tablet'].forEach(function (media) {
		console.log('\n==============================================');
		console.log(`\nProcessing: [${media}]`);

		StyleDictionaryPackage.extend(getStyleDictionaryConfig(media)).buildPlatform('web');

		console.log('\nEnd processing');
	});
};

