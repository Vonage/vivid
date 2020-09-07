const fs = require('fs');

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
  'pre-scheme-loading-css-text.js',
  `
		export const preSchemeLoadingCssText = \`${cssSelector} {
			visibility: hidden;
		}\`
	`
);
console.log(cssSelector);
