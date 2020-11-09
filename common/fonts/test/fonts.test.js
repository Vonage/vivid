import fonts from '../vvd-fonts.js';
import { cleanFrame, getFrameLoadedInjected } from '../../../test/test-helpers';

const FONTS_SETUP_HTML_TAG = 'fontsSetupTest';

describe('vvd-fonts service', () => {
	it('should provide basic fonts API', async () => {
		assert.isObject(fonts, 'imported "fonts" is object');
		assert.isNotNull(fonts, 'imported "fonts" not null');
		assert.isFrozen(fonts, 'imported "fonts" object should be frozen');
		assert.isFunction(fonts.init, 'fonts has "init" method');
	});

	it('should affect the actual font', async () => {
		const [testElement, monoWidth] = setupTestElement(document);
		await fonts.init();
		assertTestElementAndClean(testElement, monoWidth);
	});

	it('should provide the same Promise each new time after the initial run', async () => {
		const r1 = await fonts.init();
		const r2 = await fonts.init();
		const r3 = await (await import('../vvd-fonts.js')).default.init();
		expect(r2).equal(r1);
		expect(r3).equal(r2);
	});

	describe('isolated environment fonts init test', () => {
		/* eslint-disable no-undef */
		after(() => {
			cleanFrame(FONTS_SETUP_HTML_TAG);
		});

		it('should init fonts when init via HEAD element', async () => {
			await getFrameLoadedInjected(FONTS_SETUP_HTML_TAG, async (iframe) => {
				const [testElement, monoWidth] = setupTestElement(iframe.contentDocument);
				await iframe.contentWindow.vvdFontsReady;
				assertTestElementAndClean(testElement, monoWidth);
			});
		});
	});
});

function setupTestElement(targetDocument) {
	const testElement = targetDocument.createElement('span');
	testElement.textContent = 'www.iii.com';
	testElement.style.fonSize = '16px';
	testElement.style.fontStretch = '50%';
	testElement.style.fontFamily = 'monospace';

	//	first, append it as is, take the width (monospaced)
	targetDocument.body.appendChild(testElement);
	const monoWidth = testElement.offsetWidth;

	//	second, set our font and then call init (to be sure, init might already ran)
	testElement.style.fontFamily = 'var(--vvd-font-family-spezia), monospace';

	return [testElement, monoWidth];
}

function assertTestElementAndClean(testElement, monoWidth) {
	if (testElement.offsetWidth === monoWidth) {
		throw new Error('element width after should be other than before ()');
	}
	testElement.remove();
}
