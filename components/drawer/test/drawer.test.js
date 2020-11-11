import {
	getFrameLoadedInjected,
	cleanFrame,
	waitNextTask,
} from '../../../test/test-helpers.js';
const VWC_DRAWER = 'vwc-drawer';
const DRAWER_SETUP_HTML_TAG = 'drawerSetupTest';

describe('vwc-drawer', () => {
	/* eslint-disable no-undef */
	after(() => {
		cleanFrame(DRAWER_SETUP_HTML_TAG);
	});

	describe('basic', () => {
		it('should be defined in custom elements registry', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);
				const drawerElClass = iframeWindow.customElements.get(VWC_DRAWER);

				expect(drawerElClass).to.be.a('function');
			});
		});

		it('should show drawer by default', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_DRAWER);

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');
				expect(shadowDrawer.offsetWidth).to.be.above(0);
			});
		});

		it('should not show drawer by default', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_DRAWER);
				drawerEl.setAttribute('type', 'dismissible');
				drawerEl.removeAttribute('open');
				await waitNextTask();

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');
				expect(shadowDrawer.offsetWidth).to.be.equal(0);
			});
		});
	});

	describe('colors', () => {
		it('drawer aside should define surface variables by default', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_DRAWER);
				await waitNextTask();

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');

				const surfaceBackgroundBody = getComputedStyle(
					iframeWindow.document.body
				).getPropertyValue('--vvd-color-surface-background');
				const surfaceBackgroundDrawer = getComputedStyle(
					shadowDrawer
				).getPropertyValue('--vvd-color-surface-background');

				expect(surfaceBackgroundBody).to.equal(surfaceBackgroundDrawer);

				const surfaceForegroundBody = getComputedStyle(
					iframeWindow.document.body
				).getPropertyValue('--vvd-color-surface-foreground');
				const surfaceForegroundDrawer = getComputedStyle(
					shadowDrawer
				).getPropertyValue('--vvd-color-surface-foreground');
				expect(surfaceForegroundBody).to.equal(surfaceForegroundDrawer);
			});
		});
	});
});

// FUNCTIONS
async function drawerDefined(iframeWindow) {
	return await iframeWindow.customElements.whenDefined(VWC_DRAWER);
}
