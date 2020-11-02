import {
	randomAlpha,
	getFrameLoadedInjected,
} from '../../../test/test-helpers.js';

const CONTEXT_ATTR = 'data-vvd-context';
const CORE_SETUP_HTML_TAG = 'coreSetupTest';
const LIGHT = 'light';
const DARK = 'dark';
const NONE = 'none';

describe('vvd-core service', () => {
	describe('basic APIs', () => {
		it('is should init to default', async () => {
			const r = randomAlpha();
			const vvdCore = (await import(`../vvd-core.js?t=${r}`)).default;
			assert.isDefined(vvdCore, 'core service is defined');
			assert.isObject(vvdCore, 'core service is a defaultly exported object');
			assert.isFunction(vvdCore.set, 'core service has "set" API method');
			assert.isDefined(
				vvdCore.settled,
				'core service has "settled" object (Promise)'
			);
			assert.isFunction(
				vvdCore.settled.then,
				'core service has "settled" object - ensure it is Promise'
			);
		});

		it('should init to none', async () => {
			document.documentElement.setAttribute(CONTEXT_ATTR, 'none');
			const r = randomAlpha();
			const vvdCore = (await import(`../vvd-core.js?t=${r}`)).default;
			document.documentElement.removeAttribute(CONTEXT_ATTR);
			try {
				await vvdCore.settled;
			} catch (e) {
				expect(e).exist;
				expect(e.includes('auto-init unavailable')).true;
			}
		});

		it('should init to dark', async () => {
			document.documentElement.setAttribute(CONTEXT_ATTR, `theme:${DARK}`);
			const r = randomAlpha();
			const vvdCore = (await import(`../vvd-core.js?t=${r}`)).default;
			document.documentElement.removeAttribute(CONTEXT_ATTR);
			const coreInitResult = await vvdCore.settled;

			assertInitResult(coreInitResult, DARK);
		});

		it('should perform set', async () => {
			const r = randomAlpha();
			const vvdCore = (await import(`../vvd-core.js?t=${r}`)).default;
			const coreInitResult = await vvdCore.set({ scheme: LIGHT });

			assertInitResult(coreInitResult, LIGHT);
		});

		it('should not fail on abnormal calls', async () => {
			document.documentElement.setAttribute(
				CONTEXT_ATTR,
				`illegal theme:${DARK} theme:${LIGHT}`
			);
			const r = randomAlpha();
			const vvdCore = (await import(`../vvd-core.js?t=${r}`)).default;
			document.documentElement.removeAttribute(CONTEXT_ATTR);
			let coreInitResult = await vvdCore.settled;

			assertInitResult(coreInitResult, DARK);

			coreInitResult = await vvdCore.set({
				scheme: DARK,
				illegal: { some: null },
			});
			assertInitResult(coreInitResult, DARK);
		});
	});

	describe('switch flows in encapsulated environment and assert variables set', () => {
		it('should perform auto-init to default when no data-vvd-context provided', async () => {
			await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await iframeWindow.executeSetup();
				const coreInitResult = await iframeWindow.vvdCore.settled;

				assertInitResult(coreInitResult, LIGHT);
				//	TODO: assert scheme and typography variables
			});
		});

		it('should perform auto-init to a value in data-vvd-context, when provided', async () => {
			const vvdContextTheme = DARK;
			await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
				iframe.contentDocument.documentElement.setAttribute(
					CONTEXT_ATTR,
					`theme:${vvdContextTheme}`
				);

				const iframeWindow = iframe.contentWindow;
				await iframeWindow.executeSetup();
				const coreInitResult = await iframeWindow.vvdCore.settled;

				assertInitResult(coreInitResult, vvdContextTheme);
				//	TODO: assert scheme and typography variables
			});
		});

		it('should NOT perform auto-init when data-vvd-context is "none"', async () => {
			const vvdContextNone = NONE;
			await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
				iframe.contentDocument.documentElement.setAttribute(
					CONTEXT_ATTR,
					vvdContextNone
				);

				const iframeWindow = iframe.contentWindow;
				await iframeWindow.executeSetup();

				try {
					await iframeWindow.vvdCore.settled;
				} catch (e) {
					expect(e).exist;
					expect(e.includes('auto-init unavailable')).true;
				}
			});
		});

		it('should perform init to a first value in data-vvd-context, when many provided', async () => {
			const vvdContextTheme = LIGHT;
			await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
				iframe.contentDocument.documentElement.setAttribute(
					CONTEXT_ATTR,
					`theme:${vvdContextTheme} theme:${DARK}`
				);

				const iframeWindow = iframe.contentWindow;
				await iframeWindow.executeSetup();
				const coreInitResult = await iframeWindow.vvdCore.settled;

				assertInitResult(coreInitResult, vvdContextTheme);
				//	TODO: assert scheme and typography variables
			});
		});
	});
});

function assertInitResult(tested, expectedScheme) {
	expect(tested).exist;
	expect(tested.scheme).exist;
	expect(tested.scheme.option).equal(expectedScheme);
	expect(tested.scheme.scheme).equal(expectedScheme);
}
