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
		const [testElement, initialWidth] = setupTestElement(document);
		await fonts.init();
		assertTestElementAndClean(testElement, initialWidth);
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
				await iframe.contentWindow.vvdFonts.init();
				assertTestElementAndClean(testElement, monoWidth);
			});
		});

		it('should init fonts when init is AFTER the document loaded', async () => {
			await getFrameLoadedInjected(FONTS_SETUP_HTML_TAG, async (iframe) => {
				const [testElement, monoWidth] = setupTestElement(iframe.contentDocument);
				if (iframe.contentDocument.readyState !== 'complete') {
					await new Promise((resolve) =>
						iframe.contentDocument.addEventListener('DOMContentLoaded', resolve)
					);
				}
				await iframe.contentWindow.vvdFonts.init();
				assertTestElementAndClean(testElement, monoWidth);
			});
		});
	});
});

function setupTestElement(targetDocument) {
	const testElement = targetDocument.createElement('span');
	testElement.textContent = 'wwwwwiiiii';
	testElement.style.fontFamily = 'initial';

	targetDocument.body.appendChild(testElement);
	const initialWidth = testElement.offsetWidth;

	testElement.style.fontFamily = 'var(--vvd-font-family-spezia, initial)';

	return [testElement, initialWidth];
}

function assertTestElementAndClean(testElement, initialWidth) {
	if (testElement.offsetWidth === initialWidth) {
		throw new Error('element width after should be other than before ()');
	}
	testElement.remove();
}
