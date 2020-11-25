import {
	getFrameLoadedInjected,
	cleanFrame,
	// waitNextTask,
	waitInterval,
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
			assert.exists(
				customElements.get(VWC_TEXTFIELD, `${VWC_TEXTFIELD} element is not defined`)
			);
		});

		it(`should define ${VWC_MENU} in custom elements registry`, async () => {
			assert.exists(
				customElements.get(VWC_MENU, `${VWC_MENU} element is not defined`)
			);
		});

		it(`should open ${VWC_MENU} on ${VWC_TEXTFIELD} focus`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);

					// adding a timeout for component to render shadowed html input
					await waitInterval(200);
					textfield.focus();

					const menu = iframeDocument.querySelector(VWC_MENU);
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
					// adding a timeout for component to render shadowed html input
					await waitInterval(200);
					textfield.focus();
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
					// adding a timeout for component to render shadowed html input
					await waitInterval(200);
					textfield.focus();

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

					// adding a timeout for component to render shadowed html input
					await waitInterval(200);

					textfield.focus();

					expect(menu.open).to.equal(true);
				}
			);
		});

		it(`should close ${VWC_MENU} on ${VWC_TEXTFIELD} blur`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);
					const menu = iframeDocument.querySelector(VWC_MENU);
					expect(textfield.list).to.equal(menu.id);
					textfield.focus();

					textfield.blur();

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

					expect(menu.open).to.equal(false);
				}
			);
		});

		it(`should set ${VWC_TEXTFIELD}'s value as selected list option`, async () => {
			await getFrameLoadedInjected(
				TEXTFIELD_LIST_SETUP_HTML_TAG,
				async (iframe) => {
					const iframeDocument = iframe.contentDocument;

					const textfield = iframeDocument.querySelector(VWC_TEXTFIELD);

					await waitInterval(200);
					textfield.focus();
					const menu = iframeDocument.querySelector(VWC_MENU);
					menu.select(0);
					const [firstItem] = menu.items;
					const { value: itemValue } = firstItem;

					expect(textfield.value).to.equal(itemValue);
				}
			);
		});
	});
});

// FUNCTIONS
async function whenDefined(iframeDocument, name) {
	return await iframeDocument.customElements.whenDefined(name);
}
