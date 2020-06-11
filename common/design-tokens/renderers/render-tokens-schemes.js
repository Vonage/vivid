const StyleDictionaryPackage = require("style-dictionary");

// StyleDictionaryPackage.registerFilter({
//   name: 'filter-alias',
//   matcher: function (prop) {
//     return prop.attributes.category !== 'alias';
//   },
// });

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
const format = "css/variables";
const buildPath = `${__dirname}/../src/`;
console.log(`${__dirname}/../properties/`);
function getStyleDictionaryConfig(scheme, platform) {
	return {
		source: [
			`${__dirname}/../properties/schemes/${scheme}/*.json`,
			`${__dirname}/../properties/globals/**/*.json`,
			`${__dirname}/../properties/platforms/${platform}/*.json`,
		],
		platforms: {
			web: {
				prefix: "vvd",
				transformGroup: "css", // 'web'
				buildPath,
				// template: "custom-template",
				files: [
					{
						destination: `${scheme}.scss`,
						format,
						filter: {
							attributes: {
								category: "color",
							},
						},
						// filter: 'filter-alias',
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
					// {
					//   destination: '_typography.scss',
					//   format,
					//   filter: {
					//     attributes: {
					//       category: 'typography',
					//     },
					//   },
					// },
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

console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
["scheme-light", "scheme-dark"].map(function (scheme) {
	["web" /*, 'ios', 'android'*/].map(function (platform) {
		console.log("\n==============================================");
		console.log(`\nProcessing: [${platform}] [${scheme}]`);

		const StyleDictionary = StyleDictionaryPackage.extend(
			getStyleDictionaryConfig(scheme, platform)
		);

		StyleDictionary.buildPlatform(platform);

		console.log("\nEnd processing");
	});
});

console.log("\n==============================================");
console.log("\nBuild completed!");
