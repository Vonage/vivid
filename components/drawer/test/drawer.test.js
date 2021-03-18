import { VVD_SCHEME_ALTERNATE, DRAWER_ALTERNATE } from '../vwc-drawer';
import {
	isolatedElementsCreation,
	textToDomToParent,
	getFrameLoadedInjected,
	assertComputedStyle,
	cleanFrame,
	waitNextTask,
	waitInterval
} from '../../../test/test-helpers.js';

const VWC_COMPONENT = 'vwc-drawer';
const DRAWER_SETUP_HTML_TAG = 'drawerSetupTest';

describe('Drawer', () => {
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
		it('should set drawer default colors', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_COMPONENT);
				await waitInterval(50);

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');

				assertComputedStyle(shadowDrawer, { backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(0, 0, 0)' });
			});
		});

		it('should set drawer alternate colors', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_COMPONENT);
				drawerEl.drawerAlternate = true;
				await waitInterval(50);

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');

				assertComputedStyle(shadowDrawer, { backgroundColor: 'rgb(13,13,13)', color: 'rgb(255, 255, 255)' });
			});
		});

		it('should define drawer aside surface variables by default', async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_COMPONENT);
				await waitNextTask();

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');

				const surfaceBackgroundBody = getComputedStyle(
					iframeWindow.document.body
				).getPropertyValue('--vvd-color-base');
				const surfaceBackgroundDrawer = getComputedStyle(
					shadowDrawer
				).getPropertyValue('--vvd-color-base');

				expect(surfaceBackgroundBody).to.equal(surfaceBackgroundDrawer);

				const surfaceForegroundBody = getComputedStyle(
					iframeWindow.document.body
				).getPropertyValue('--vvd-color-on-base');
				const surfaceForegroundDrawer = getComputedStyle(
					shadowDrawer
				).getPropertyValue('--vvd-color-on-base');
				expect(surfaceForegroundBody).to.equal(surfaceForegroundDrawer);
			});
		});

		it(`should set 'drawerAlternate' property member as true on '${DRAWER_ALTERNATE}' attribute value set to true`, async () => {
			const [drawer] = addElement(
				textToDomToParent(`
					<${VWC_COMPONENT} hasHeader>
						<span slot="title">Drawer Title</span>
						<div slot="appContent"></div>
					</${VWC_COMPONENT}>`)
			);
			await waitNextTask();

			expect(drawer.drawerAlternate).to.equal(false);
			drawer.setAttribute(DRAWER_ALTERNATE, true);
			expect(drawer.drawerAlternate).to.equal(true);
		});

		it(`should set <aside> '::part' attribute value as '${VVD_SCHEME_ALTERNATE}' on drawerAlternate property set to true`, async () => {
			await getFrameLoadedInjected(DRAWER_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;
				await drawerDefined(iframeWindow);

				const drawerEl = iframeWindow.document.querySelector(VWC_COMPONENT);

				drawerEl.drawerAlternate = true;

				const shadowDrawer = drawerEl.shadowRoot.querySelector('.mdc-drawer');
				await waitNextTask();

				const partValue = shadowDrawer.getAttribute('part');

				expect(partValue).to.equal(VVD_SCHEME_ALTERNATE);
			});
		});
	});
});

// FUNCTIONS
async function drawerDefined(iframeWindow) {
	return iframeWindow.customElements.whenDefined(VWC_COMPONENT);
}
