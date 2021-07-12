import { init as initFonts } from '../vvd-fonts.js';
import { cleanFrame, getFrameLoadedInjected } from '../../../test/test-helpers';

const FONTS_SETUP_HTML_TAG = 'fontsSetupTest';

describe('vvd-fonts service', () => {
	it('should provide basic fonts API', async () => {
		assert.isFunction(initFonts, 'fonts has "init" method');
	});

	it('should affect the actual font', async () => {
		const [testElement, baseElement] = setupTestElements(document);
		await initFonts();
		assertTestElementAndClean(testElement, baseElement);
	});

	it('should provide the same Promise each new time after the initial run', async () => {
		const [r1, r2, r3] = await Promise.all([
			await initFonts(),
			await initFonts(),
			await (await import('../vvd-fonts.js')).init(),
		]);
		expect(r2).equal(r1);
		expect(r3).equal(r2);
	});

	describe('isolated environment fonts init test', () => {
		/* eslint-disable no-undef */
		after(() => {
			cleanFrame(FONTS_SETUP_HTML_TAG);
		});

		it('should init fonts when init via HEAD element', async function () {
			this.timeout(8000);

			await getFrameLoadedInjected(FONTS_SETUP_HTML_TAG, async (iframe) => {
				const [testElement, baseElement] = setupTestElements(
					iframe.contentDocument
				);
				await iframe.contentWindow.vvdFonts.init();
				assertTestElementAndClean(testElement, baseElement);
			});
		});

		it('should init fonts when init is AFTER the document loaded', async () => {
			await getFrameLoadedInjected(FONTS_SETUP_HTML_TAG, async (iframe) => {
				const [testElement, baseElement] = setupTestElements(
					iframe.contentDocument
				);
				if (iframe.contentDocument.readyState !== 'complete') {
					await new Promise(resolve => iframe.contentDocument.addEventListener('DOMContentLoaded', resolve));
				}
				await iframe.contentWindow.vvdFonts.init();
				assertTestElementAndClean(testElement, baseElement);
			});
		});
	});
});

function setupTestElements(targetDocument) {
	const [testElement, baseElement] = [
		'var(--vvd-font-family-spezia)',
		'initial',
	].map((fs) => {
		const e = targetDocument.createElement('span');
		e.textContent = 'wwwwwiiiii';
		e.style.fontFamily = fs;
		targetDocument.body.appendChild(e);
		return e;
	});

	return [testElement, baseElement];
}

function assertTestElementAndClean(testElement, baseElement) {
	if (testElement.offsetWidth === baseElement.offsetWidth) {
		throw new Error(
			`element width (${testElement.offsetWidth}) should have been different from initial (${baseElement.offsetWidth})`
		);
	}
	testElement.remove();
	baseElement.remove();
}
