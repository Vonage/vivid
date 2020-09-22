import { dirname } from 'path';
import { fileURLToPath } from 'url';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';
import R from 'ramda';

const __dirname = dirname(fileURLToPath(import.meta.url));

const propertiesPath = `/node_modules/@vonage/vvd-design-tokens-properties`;

// StyleDictionaryPackage.registerFilter({
// 	name: "filter-alias",
// 	matcher: function (prop) {
// 		console.log(prop.attributes);
// 		return prop.attributes.category !== "alias";
// 	},
// });

StyleDictionaryPackage.registerFormat({
	name: 'custom/format/scss',
	formatter: _.template(
		fs.readFileSync(__dirname + '/../templates/web-scss.template')
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
// const format = "css/variables";

// console.log(`${__dirname}/../properties/`);
function getStyleDictionaryConfig(scheme, scope) {
	return {
		source: [
			`${propertiesPath}/globals/**/*.json`,
			`${propertiesPath}/scheme/${scheme}/color.json`,
			// `${__dirname}/../properties/platforms/palette.json`,
		],
		platforms: {
			web: {
				prefix: 'vvd',
				transformGroup: 'css', // 'web'
				buildPath: `${__dirname}/../build/scss/`,
				files: [
					{
						destination: `schemes/${scheme}/${scope}.scss`,
						format: 'custom/format/scss',
						filter: {
							attributes: {
								category: 'color',
								// type: "root",
							},
						},
						// filter: "filter-alias",
					},
					// {
					//   destination: '_sizes.scss',
					//   format,
					//   filter: {
					//     attributes: {
					//       category: 'size',
					//     },
					//   },
					// },
					// {
					//   destination: '_fonts.scss',
					//   format,
					//   filter: {
					//     attributes: {
					//       category: 'font',
					//     },
					//   },
					// },
					{
						destination: '_typography.scss',
						format: 'custom/format/scss',
						filter: {
							attributes: {
								category: 'typography',
							},
						},
					},
				],
			},
			// android: {
			//   transformGroup: 'android',
			//   buildPath: `${__dirname}/dist/android/${scheme}/`,
			//   files: [
			//     {
			//       destination: 'tokens.colors.xml',
			//       format: 'android/colors',
			//     },
			//     {
			//       destination: 'tokens.dimens.xml',
			//       format: 'android/dimens',
			//     },
			//     {
			//       destination: 'tokens.font_dimens.xml',
			//       format: 'android/fontDimens',
			//     },
			//   ],
			// },
			// ios: {
			//   transformGroup: 'ios',
			//   buildPath: `${__dirname}/dist/ios/${scheme}/`,
			//   files: [
			//     {
			//       destination: 'tokens.h',
			//       format: 'ios/macros',
			//     },
			//   ],
			// },
		},
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
