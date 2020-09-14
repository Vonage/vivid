const fs = require('fs');

console.log(
  '\x1b[33m%s\x1b[0m',
  '** generating css selectors from custom-elements.json **'
);

const customElementsJson = fs.readFileSync(
  __dirname + '/../../../custom-elements.json',
  { encoding: 'utf8' }
);

const { tags } = JSON.parse(customElementsJson);
const cssSelector = tags.reduce(
  (acc, { name }, i) => (acc += `${name}${i < tags.length - 1 ? ', ' : ''}`),
  ''
);

fs.writeFileSync(
  'src/pre-scheme-loading-css.ts',
  `
		export const preSchemeLoadingCssText = \`${cssSelector} {
			visibility: hidden;
		}\`
	`
);
