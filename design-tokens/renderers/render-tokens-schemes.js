const StyleDictionaryPackage = require("style-dictionary");
const fs = require("fs");
const _ = require("lodash");

StyleDictionaryPackage.registerFilter({
	name: "filter-alias",
	matcher: function (prop) {
		console.log(prop);
		return prop.attributes.category !== "alias";
	},
});

StyleDictionaryPackage.registerFormat({
	name: "custom/format/scss",
	formatter: _.template(
		fs.readFileSync(__dirname + "/../templates/web-scss.template")
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
// const format = "css/variables";

// console.log(`${__dirname}/../properties/`);
function getStyleDictionarySchemeConfig(scheme, platform) {
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
				buildPath: `${__dirname}/../build/scss/`,
				// template: "custom-template",
				files: [
					{
						destination: `${scheme}/root.scss`,
						format: "custom/format/scss",
						className: "StyleDictionarySize",
						filter: {
							attributes: {
								category: "color",
								type: "root",
							},
						},
						// filter: 'filter-alias',
					},
					{
						destination: `${scheme}/alternate.scss`,
						format: "custom/format/scss",
						filter: {
							attributes: {
								category: "color",
								type: "alternate",
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
			assets: {
				transforms: ["asset/base64"],
				buildPath: `${__dirname}/../build/scss/`,
				files: [
					// {
					// 	destination: "assets_icons.scss",
					// 	format: "scss/variables",
					// 	filter: {
					// 		attributes: {
					// 			category: "asset",
					// 			type: "icon",
					// 		},
					// 	},
					// },
					// {
					// 	destination: "assets_images.scss",
					// 	format: "scss/variables",
					// 	filter: {
					// 		attributes: {
					// 			category: "asset",
					// 			type: "image",
					// 		},
					// 	},
					// },
					{
						destination: "assets_fonts.scss",
						format: "scss/variables",
						filter: {
							attributes: {
								category: "asset",
								type: "font",
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

console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT SCHEMES AND PLATFORMS
// TODO: [VIV-41] add accessible colors scheme
["scheme.light", "scheme.dark"].map(function (scheme) {
	["web" /*, 'ios', 'android'*/].map(function (platform) {
		console.log("\n==============================================");
		console.log(`\nProcessing: [${platform}] [${scheme}]`);

		const StyleDictionary = StyleDictionaryPackage.extend(
			getStyleDictionarySchemeConfig(scheme, platform)
		);

		StyleDictionary.buildPlatform(platform);

		console.log("\nEnd processing");
	});
});

function getStyleDictionaryAssetsConfig() {
	return {
		source: [`${__dirname}/../properties/assets/**/*.json`],
		platforms: {
			"assets/embed/scss": {
				transforms: ["attribute/cti", "name/cti/kebab", "asset/base64"],
				buildPath: `${__dirname}/../build/scss/`,
				files: [
					// {
					// 	destination: "assets_icons.scss",
					// 	format: "scss/variables",
					// 	filter: {
					// 		attributes: {
					// 			category: "asset",
					// 			type: "icon",
					// 		},
					// 	},
					// },
					// {
					// 	destination: "assets_images.scss",
					// 	format: "scss/variables",
					// 	filter: {
					// 		attributes: {
					// 			category: "asset",
					// 			type: "image",
					// 		},
					// 	},
					// },
					{
						destination: "assets_fonts.scss",
						format: "scss/variables",
						filter: {
							attributes: {
								category: "asset",
								type: "font",
							},
						},
					},
				],
			},
			"assets/embed/json": {
				transforms: ["attribute/cti", "name/cti/kebab", "asset/base64"],
				buildPath: `${__dirname}/../build/json/`,
				files: [
					{
						destination: "assets_fonts.json",
						format: "json/flat",
						filter: {
							attributes: {
								category: "asset",
								type: "font",
							},
						},
					},
					// {
					// 	destination: "assets_images.json",
					// 	format: "json/flat",
					// 	filter: {
					// 		attributes: {
					// 			category: "asset",
					// 			type: "image",
					// 		},
					// 	},
					// },
					// {
					// 	destination: "assets_fonts.json",
					// 	format: "json/flat",
					// 	filter: {
					// 		attributes: {
					// 			category: "asset",
					// 			type: "font",
					// 		},
					// 	},
					// },
				],
			},
		},
	};
}
["assets/embed/scss", "assets/embed/json"].forEach((platform) => {
	StyleDictionaryPackage.extend(getStyleDictionaryAssetsConfig()).buildPlatform(
		platform
	);
});

console.log("\n==============================================");
console.log("\nBuild completed!");
