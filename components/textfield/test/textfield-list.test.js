import {
	getFrameLoadedInjected,
	cleanFrame,
	// waitNextTask,
} from '../../../test/test-helpers.js';
const VWC_TEXTFIELD = 'vwc-textfield';
const VWC_MENU = 'vwc-menu';
const TEXTFIELD_LIST_SETUP_HTML_TAG = 'textfieldSetupTest';

describe('textfield list', () => {
	/* eslint-disable no-undef */
	after(() => {
		cleanFrame(TEXTFIELD_LIST_SETUP_HTML_TAG);
	});

	describe('basic', () => {
		it(`should define ${VWC_TEXTFIELD} in custom elements registry`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeWindow = iframe.contentWindow;
					await whenDefined(iframeWindow, VWC_TEXTFIELD);
					const elClass = iframeWindow.customElements.get(VWC_TEXTFIELD);
					expect(elClass).to.be.a('function');
				}
			);
		});

		it(`should define ${VWC_MENU} in custom elements registry`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeWindow = iframe.contentWindow;
					await whenDefined(iframeWindow, VWC_MENU);
					const elClass = iframeWindow.customElements.get(VWC_MENU);
					expect(elClass).to.be.a('function');
				}
			);
		});

		it(`should pair ${VWC_TEXTFIELD}'s list with ${VWC_MENU}'s id`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeWindow = iframe.contentWindow;

					const textfield = iframeWindow.document.querySelector(VWC_TEXTFIELD);
					const menu = iframeWindow.document.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
				}
			);
		});
	});
});

// FUNCTIONS
async function whenDefined(iframeWindow, name) {
	return await iframeWindow.customElements.whenDefined(name);
}
