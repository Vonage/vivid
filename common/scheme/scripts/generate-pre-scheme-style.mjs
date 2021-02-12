import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

console.log(
  '\x1b[33m%s\x1b[0m',
  '** generating css selectors from custom-elements.json **'
);

const customElementsJson = readFileSync(
  resolve('../umbrella/custom-elements.json'),
  { encoding: 'utf8' }
);

const { tags } = JSON.parse(customElementsJson);
const cssSelector = tags.reduce(
  (acc, { name }, i) => (acc += `${name}${i < tags.length - 1 ? ',\n' : ''}`),
  ''
);

writeFileSync(
  'src/pre-scheme-loading.autogenerated.scss',
  `${cssSelector} {
	visibility: hidden;
}
	`
);