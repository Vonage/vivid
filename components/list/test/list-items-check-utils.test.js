import {
	assertComputedStyle,
	textToDomToParent,
} from '../../../test/test-helpers.js';

export function assertListItemDimensions(items, expectedTotal, expectedHeight) {
	expect(items).exist;
	expect(items.length).equal(expectedTotal);
	for (const item of items) {
		expect(item.offsetHeight).equal(expectedHeight);
		assertComputedStyle(item, {
			marginTop: '0px',
			marginLeft: '0px',
			marginRight: '0px',
			marginBottom: '0px',
			height: `${expectedHeight}px`,
		});
	}
}

export function buildListOfNItems(n, itemElement) {
	const itemsHTML = new Array(n)
		.fill(undefined)
		.map((_, index) => `<${itemElement}>Item ${index + 1}</${itemElement}>`)
		.join('');
	return textToDomToParent(`<vwc-list>${itemsHTML}</vwc-list>`);
}
