const StyleDictionaryPackage = require("style-dictionary");
const fs = require("fs");
const _ = require("lodash");
const R = require("ramda");

// StyleDictionaryPackage.registerFilter({
// 	name: "filter-alias",
// 	matcher: function (prop) {
// 		console.log(prop.attributes);
// 		return prop.attributes.category !== "alias";
// 	},
// });

StyleDictionaryPackage.registerFormat({
	name: "custom/format/scss",
	formatter: _.template(
		fs.readFileSync(__dirname + "/../templates/web-scss.template")
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
// const format = "css/variables";

// console.log(`${__dirname}/../properties/`);
function getStyleDictionaryConfig(scheme, scope) {
	return {
		source: [
			`${__dirname}/../properties/globals/**/*.json`,
			`${__dirname}/../properties/scheme/${scheme}/color.json`,
			// `${__dirname}/../properties/platforms/palette.json`,
		],
		platforms: {
			web: {
				prefix: "vvd",
				transformGroup: "css", // 'web'
				buildPath: `${__dirname}/../build/scss/`,
				files: [
					{
						destination: `schemes/${scheme}/${scope}.scss`,
						format: "custom/format/scss",
						filter: {
							attributes: {
								category: "color",
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
						format: "custom/format/scss",
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
const baseConfig = curriedGetStyleDictionaryConfig(R.__, "base");
const alternateConfig = curriedGetStyleDictionaryConfig(R.__, "alternate");

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
exports.render = () => {
	["light", "dark"].forEach(function (scheme) {
		console.log("\n==============================================");
		console.log(`\nProcessing: [${scheme}]`);

		StyleDictionaryPackage.extend(baseConfig(scheme)).buildPlatform("web");
		StyleDictionaryPackage.extend(alternateConfig(scheme)).buildPlatform("web");

		console.log("\nEnd processing");
	});
};
