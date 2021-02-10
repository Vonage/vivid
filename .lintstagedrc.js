module.exports = {
	'{common,components}/**/*.scss': ['stylelint --quiet --fix'],
	'{common,components}/**': ['eslint --fix --no-error-on-unmatched-pattern'],
	'{common,components}/**/src/*.ts': ['lit-analyzer  --strict --quiet --format'],
	'{{common,components}/**/*.{ts,scss},**/stories,**/test/*.test.js}': ['prettier --write'],
};
