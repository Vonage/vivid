module.exports = {
	"{common,components}/**/*.scss": ["stylelint --quiet --fix"],
	"{common,components}/*/{src,test}/**/*.{js,ts}": [
		"eslint --no-error-on-unmatched-pattern --quiet --fix",
	]
};
