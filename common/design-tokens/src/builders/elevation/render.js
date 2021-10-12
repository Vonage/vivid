import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';
import R from 'ramda';

const
	propertiesPath = resolve('../../node_modules/@vonage/vvd-design-tokens-properties'),
	CUSTOM_SCHEMES_FORMAT = 'custom/web/scss/elevation',
	OUTPUT_FOLDER = 'build/scss/elevation';

StyleDictionaryPackage.registerFormat({
	name: CUSTOM_SCHEMES_FORMAT,
	formatter: _.template(
		fs.readFileSync(resolve('templates/web-scss-elevations.template'))
	),
});

StyleDictionaryPackage.registerFilter({
	name: 'filter-alias',
	matcher: function (prop) {
		return prop.attributes.category !== 'alias';
	}
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(scheme, scope) {
	return {
		source: [
			`${propertiesPath}/dist/elevation/values/${scheme}/${scope}.json`,
			`${propertiesPath}/dist/elevation/elevation.json`,
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
						filter: 'filter-alias'
					}
				]
			}
		}
	};
}

const curriedGetStyleDictionaryConfig = R.curry(getStyleDictionaryConfig);
const baseConfig = curriedGetStyleDictionaryConfig(R.__, 'main');
const alternateConfig = curriedGetStyleDictionaryConfig(R.__, 'alternate');

export const render = (styleDictionary = StyleDictionaryPackage) => {
	fs.rmdirSync(OUTPUT_FOLDER, { recursive: true });

	['light', 'dark'].forEach(function (scheme) {
		console.log(`\n🎨\x1b[2mProcessing: [\x1b[0m\x1b[36m${scheme}\x1b[0m\x1b[2m]\x1b[0m`);

		styleDictionary.extend(baseConfig(scheme)).buildPlatform('web');
		styleDictionary.extend(alternateConfig(scheme)).buildPlatform('web');

		console.log('\n\x1b[2m================================================================\x1b[0m');
	});
};
