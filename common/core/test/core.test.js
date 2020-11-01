import vvdCore from '../vvd-core.js';
import { getFrameLoadedInjected } from '../../../test/test-helpers.js';

const CORE_SETUP_HTML_TAG = 'coreSetupTest';
const LIGHT = 'light';
const DARK = 'dark';
const NONE = 'none';

describe('vvd-core service', () => {
	it('verify basic core API', async () => {
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

	it('should perform auto-init to default when no data-vvd-context provided', async () => {
		await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
			const iframeWindow = iframe.contentWindow;
			await iframeWindow.executeSetup();

			const coreInitResult = await iframeWindow.vvdCore.settled;
			expect(coreInitResult).exist;
			expect(coreInitResult.scheme).exist;
			expect(coreInitResult.scheme.option).equals(LIGHT);
			expect(coreInitResult.scheme.scheme).equals(LIGHT);
		});
	});

	it('should perform auto-init to a value in data-vvd-context, when provided', async () => {
		const vvdContextDark = DARK;
		await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
			iframe.contentDocument.documentElement.setAttribute(
				'data-vvd-context',
				`theme:${vvdContextDark}`
			);

			const iframeWindow = iframe.contentWindow;
			await iframeWindow.executeSetup();

			const coreInitResult = await iframeWindow.vvdCore.settled;
			expect(coreInitResult).exist;
			expect(coreInitResult.scheme).exist;
			expect(coreInitResult.scheme.option).equals(vvdContextDark);
			expect(coreInitResult.scheme.scheme).equals(vvdContextDark);
		});
	});

	it('should NOT perform auto-init when data-vvd-context is "none"', async () => {
		const vvdContextNone = NONE;
		await getFrameLoadedInjected(CORE_SETUP_HTML_TAG, async (iframe) => {
			iframe.contentDocument.documentElement.setAttribute(
				'data-vvd-context',
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
});
