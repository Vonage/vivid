module.exports = {
	"extends": [
		"stylelint-config-sass-guidelines",
		"stylelint-a11y/recommended",
		"stylelint-config-idiomatic-order",
		"stylelint-config-prettier" // should always be last
	],
	"plugins": ["stylelint-no-unsupported-browser-features", "stylelint-a11y"],
	"rules": {
		"plugin/no-unsupported-browser-features": [
			true,
			{
				"severity": "warning"
			}
		],
		"length-zero-no-unit": null,
		"order/properties-alphabetical-order": null,
		"order/properties-order": null,
		"order/order": null,
		"selector-class-pattern": null,
		"max-nesting-depth": null,
		"selector-no-qualifying-type": null,
		"selector-max-compound-selectors": null,
		"selector-max-id": null,
		"a11y/media-prefers-reduced-motion": null,
		"a11y/selector-pseudo-class-focus": null,
		"scss/dollar-variable-pattern": null,
		"a11y/no-outline-none": null
	}
}
