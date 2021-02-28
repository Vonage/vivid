import { VVD_THEME_ALTERNATE, THEME_ALTERNATE } from '../vwc-drawer';
import {
	isolatedElementsCreation,
	textToDomToParent,
	getFrameLoadedInjected,
	cleanFrame,
	waitNextTask,
} from '../../../test/test-helpers.js';
const VWC_COMPONENT = 'vwc-drawer';
const DRAWER_SETUP_HTML_TAG = 'drawerSetupTest';

describe.only('vwc-drawer', () => {
	let addElement = isolatedElementsCreation();

	/* eslint-disable no-undef */
	after(() => {
		cleanFrame(DRAWER_SETUP_HTML_TAG);
	});

	describe('basic', () => {
		it('should be defined in custom elements registry', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);
				const drawerElClass = iframeWindow.customElements.get(VWC_COMPONENT);

				expect(drawerElClass).to.be.a('function');
			});
		});

		it('should show drawer by default', async () => {
			const [drawer] = addElement(
				textToDomToParent(`
					<${VWC_COMPONENT} hasHeader>
						<span slot="title">Drawer Title</span>
						<span slot="subtitle">subtitle</span>
						<span slot="header">lorem ipsum dolor sit amet</span>
						<div slot="appContent"></div>
					</${VWC_COMPONENT}>`)
			);
			await waitNextTask();

			const shadowDrawer = drawer.shadowRoot.querySelector('.mdc-drawer');
			expect(shadowDrawer.offsetWidth).to.be.above(0);
		});

		it('should not show drawer by default', async () => {
			const [drawer] = addElement(
				textToDomToParent(`
					<${VWC_COMPONENT} hasHeader type="dismissible">
						<span slot="title">Drawer Title</span>
						<div slot="appContent"></div>
					</${VWC_COMPONENT}>`)
			);
			await waitNextTask();

			const shadowDrawer = drawer.shadowRoot.querySelector('.mdc-drawer');
			expect(shadowDrawer.offsetWidth).to.be.equal(0);
		});

		it('should show drawer by "open" API', async () => {
			const [drawer] = addElement(
				textToDomToParent(`
					<${VWC_COMPONENT} hasHeader type="dismissible">
						<span slot="title">Drawer Title</span>
						<div slot="appContent"></div>
					</${VWC_COMPONENT}>`)
			);
			await waitNextTask();

			const shadowDrawer = drawer.shadowRoot.querySelector('.mdc-drawer');
			expect(shadowDrawer.offsetWidth).to.be.equal(0);

			drawer.open = true;
			await waitNextTask();
			expect(shadowDrawer.offsetWidth).to.be.equal(256);
		});
	});

	describe('colors context API', () => {
		it('should define drawer aside surface variables by default', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_COMPONENT);
				await waitNextTask();

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');

				const surfaceBackgroundBody = getComputedStyle(
					iframeWindow.document.body
				).getPropertyValue('--vvd-color-surface');
				const surfaceBackgroundDrawer = getComputedStyle(
					shadowDrawer
				).getPropertyValue('--vvd-color-surface');

				expect(surfaceBackgroundBody).to.equal(surfaceBackgroundDrawer);

				const surfaceForegroundBody = getComputedStyle(
					iframeWindow.document.body
				).getPropertyValue('--vvd-color-on-surface');
				const surfaceForegroundDrawer = getComputedStyle(
					shadowDrawer
				).getPropertyValue('--vvd-color-on-surface');
				expect(surfaceForegroundBody).to.equal(surfaceForegroundDrawer);
			});
		});

		it(`should set 'isThemeAlternate' property member as true on '${THEME_ALTERNATE}' attribute value set to true`, async () => {
			const [drawer] = addElement(
				textToDomToParent(`
					<${VWC_COMPONENT} hasHeader>
						<span slot="title">Drawer Title</span>
						<div slot="appContent"></div>
					</${VWC_COMPONENT}>`)
			);
			await waitNextTask();

			expect(drawer.isThemeAlternate).to.equal(false);
			drawer.setAttribute(THEME_ALTERNATE, true);
			expect(drawer.isThemeAlternate).to.equal(true);
		});

		it(`should set <aside> '::part' attribute value as '${VVD_THEME_ALTERNATE}' on isThemeAlternate property set to true`, async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_COMPONENT);

				drawerEl.isThemeAlternate = true;

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');
				await waitNextTask();

				const partValue = shadowDrawer.getAttribute('part');

				expect(partValue).to.equal(VVD_THEME_ALTERNATE);
			});
		});
	});
});

// FUNCTIONS
async function drawerDefined(iframeWindow) {
	return iframeWindow.customElements.whenDefined(VWC_COMPONENT);
}
