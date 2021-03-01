module.exports = {
	"{common,components}/**/*.scss": ["stylelint --quiet --fix"],
	"{common,components}/*/{src,test}/**/*": [
		"eslint --ext .js .ts --no-error-on-unmatched-pattern --quiet --fix",
	],
	'{common,components}/*/src/**/*.ts': ["lit-analyzer --rules.no-incompatible-type-binding off --strict --quiet --format"],
};
