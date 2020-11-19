import {
	getFrameLoadedInjected,
	cleanFrame,
	waitNextTask,
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

		it(`should open ${VWC_MENU} on ${VWC_TEXTFIELD} focus`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
					textfield.focus();
					menu.onOpened(() => {});
					// ! should await this async task

					expect(menu.open).to.equal(true);
				}
			);
		});

		it(`should keep ${VWC_TEXTFIELD} focus on ${VWC_MENU} open`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
					textfield.focus();
					menu.onOpened(() => {});
					// ! should await this async task

					expect(iframeDocument.activeElement).to.equal(textfield);
				}
			);
		});

		it(`should keep ${VWC_MENU} opened on document.body bubbled click`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
					textfield.dispatchEvent(new MouseEvent('click'));
					menu.onOpened(() => {});
					// ! should await this async task

					expect(menu.open).to.equal(true);
				}
			);
		});

		it(`should keep ${VWC_MENU} open on ${VWC_TEXTFIELD} focus`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
					textfield.focus();
					menu.onOpened(() => {});
					// ! should await this async task

					expect(menu.open).to.equal(true);
				}
			);
		});

		it(`should close ${VWC_MENU} on ${VWC_TEXTFIELD} focusout`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
					textfield.focus();
					menu.onOpened(() => {});
					// ! should await this async task

					textfield.focusout();
					// ! should await this async task

					expect(menu.open).to.equal(false);
				}
			);
		});

		it(`should not open ${VWC_MENU} if length is less than 1`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					menu.innerHTML = '';
					textfield.focus();
					// ! should await this async task

					expect(menu.open).to.equal(false);
				}
			);
		});
	});
});

// FUNCTIONS
async function whenDefined(iframeDocument, name) {
	return await iframeDocument.customElements.whenDefined(name);
}
