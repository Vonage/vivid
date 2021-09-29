module.exports = {
	"{common,components}/**/*.scss": ["stylelint --quiet --fix"],
	"{common,components}/*/{src,test}/**/*.{js,ts}": [
		"eslint --no-error-on-unmatched-pattern --quiet --fix",
	],
	'{common,components}/*/src/**/*.ts': ["lit-analyzer --rules.no-nullable-attribute-binding off --rules.no-missing-import error --rules.no-incompatible-type-binding off --strict --quiet --format"],
};
