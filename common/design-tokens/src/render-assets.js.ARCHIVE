const StyleDictionaryPackage = require("style-dictionary");




function getStyleDictionaryConfig() {
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
						destination: "assets/assets_fonts.scss",
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
			// "assets/embed/json": {
			// 	transforms: ["attribute/cti", "name/cti/kebab", "asset/base64"],
			// 	buildPath: `${__dirname}/../build/json/`,
			// 	files: [
			// 		{
			// 			destination: "assets_fonts.json",
			// 			format: "json/flat",
			// 			filter: {
			// 				attributes: {
			// 					category: "asset",
			// 					type: "font",
			// 				},
			// 			},
			// 		},
			// 		// {
			// 		// 	destination: "assets_images.json",
			// 		// 	format: "json/flat",
			// 		// 	filter: {
			// 		// 		attributes: {
			// 		// 			category: "asset",
			// 		// 			type: "image",
			// 		// 		},
			// 		// 	},
			// 		// },
			// 		// {
			// 		// 	destination: "assets_fonts.json",
			// 		// 	format: "json/flat",
			// 		// 	filter: {
			// 		// 		attributes: {
			// 		// 			category: "asset",
			// 		// 			type: "font",
			// 		// 		},
			// 		// 	},
			// 		// },
			// 	],
			// },
		},
	};
}
exports.render = () => {
["assets/embed/scss"].forEach((platform) => {
	StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform(
		platform
	);
});
};


