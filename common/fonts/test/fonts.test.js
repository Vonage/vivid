import fonts from '../vvd-fonts.js';

describe('test vvd-fonts service', () => {
	it('verify basic fonts API', async () => {
		assert.isObject(fonts, 'imported "fonts" is object');
		assert.isNotNull(fonts, 'imported "fonts" not null');
		assert.isFrozen(fonts, 'imported "fonts" object should be frozen');
		assert.isFunction(fonts.init, 'fonts has "init" method');
	});

	it('vvd-fonts init affects the actual font', async () => {
		//	create test element, to measure width of
		const testElement = document.createElement('span');
		testElement.textContent = 'www.iii.com';
		testElement.style.fonSize = '16px';
		testElement.style.fontStretch = '50%';
		testElement.style.fontFamily = 'var(--vvd-font-family-spezia), monospace';

		//	first, append it as is, take the width (monospaced, since no fonts init ran yet)
		document.body.appendChild(testElement);
		const preWidth = testElement.offsetWidth;

		//	second, init the fonts
		await fonts.init();

		//	third, measure the element again (now should have non-monospaced fonting)
		const postWidth = testElement.offsetWidth;

		assert.isTrue(postWidth !== preWidth, 'element width after should be other than before');
	});
});
