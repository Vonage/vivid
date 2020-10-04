import fonts from '../vvd-fonts.js';

describe('vvd-fonts service', () => {
	it('should provide basic fonts API', async () => {
		assert.isObject(fonts, 'imported "fonts" is object');
		assert.isNotNull(fonts, 'imported "fonts" not null');
		assert.isFrozen(fonts, 'imported "fonts" object should be frozen');
		assert.isFunction(fonts.init, 'fonts has "init" method');
	});

	it('should affect the actual font', async () => {
		//	create test element, to measure width of
		const testElement = document.createElement('span');
		testElement.textContent = 'www.iii.com';
		testElement.style.fonSize = '16px';
		testElement.style.fontStretch = '50%';
		testElement.style.fontFamily = 'monospace';

		//	first, append it as is, take the width (monospaced)
		document.body.appendChild(testElement);
		const monoWidth = testElement.offsetWidth;

		//	second, set our font and then call init (to be sure, init might already ran)
		testElement.style.fontFamily = 'var(--vvd-font-family-spezia), monospace';

		//	second, init the fonts
		await fonts.init();

		//	third, measure the element again (now should have non-monospaced fonting)
		const postWidth = testElement.offsetWidth;

		assert.isTrue(
			postWidth !== monoWidth,
			'element width after should be other than before'
		);
	});

	it('should provide the same Promise each new time after the initial run', async () => {
		const r1 = await fonts.init();
		const r2 = await fonts.init();
		const r3 = await (await import('../vvd-fonts.js')).default.init();
		expect(r2).equal(r1);
		expect(r3).equal(r2);
	});
});
