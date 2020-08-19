import '../vwc-button.js';
import { waitNextTask, textToDomToParent } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

describe('test vwc-button', () => {
	let addedElements = [];

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('vwc-button is defined as a custom element', async () => {
		assert.exists(customElements.get('vwc-button', 'vwc-button element is not defined'));
	});

	it('vwc-button has internal contents', async () => {
		addedElements = textToDomToParent('<vwc-button id="button-a">Button Text</vwc-button>');
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`Form Association`, function() {

		beforeEach(() => {
			window.formSubmitted = false;
		});

		it(`should submit form when inside a form`, async function() {
			let submitted = false;
			addedElements = textToDomToParent('<form onsubmit="return false" name="testForm" id="testForm"><vwc-button id="button-a">Button Text</vwc-button></form>');
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			await waitNextTask();
			await waitNextTask();
			formElement.addEventListener('submit', () => submitted = true);

			actualElement.click();

			expect(submitted).to.equal(true);
		});

		it(`should submit form when of type submit`, async function() {
			let submitted = false;
			addedElements = textToDomToParent('<form onsubmit="return false" name="testForm" id="testForm"><vwc-button id="button-a" type="submit">Button Text</vwc-button></form>');
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			await waitNextTask();
			await waitNextTask();
			formElement.addEventListener('submit', () => submitted = true);

			actualElement.click();

			expect(submitted).to.equal(true);
		});

		it(`should reset form when of type reset`, async function() {
			let submitted = false;
			let reset = false;
			addedElements = textToDomToParent('<form onsubmit="return false" name="testForm" id="testForm"><vwc-button id="button-a" type="reset">Button Text</vwc-button></form>');
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			await waitNextTask();
			await waitNextTask();
			formElement.addEventListener('submit', () => submitted = true);
			formElement.addEventListener('reset', () => reset = true);

			actualElement.click();

			expect(reset).to.equal(true);
			expect(submitted).to.equal(false);
		});

		it(`should associate with external form attribute is set with form id`, async function() {
			const submitted = {
				external: false,
				internal: false
			};

			const reset = {
				external: false,
				internal: false
			};

			const expectedSubmitted = {
				external: true,
				internal: false
			}
			const expectedReset = {
				external: true,
				internal: false
			}

			addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<vwc-button id="button-a" form="externalForm" type="reset">RESET</vwc-button>
					<vwc-button id="button-b" form="externalForm" type="submit">SUBMIT</vwc-button>
				</form>
				<form onsubmit="return false" name="externalForm" id="externalForm"></form>
			`);
			const formElement = addedElements[0];
			const resetButton = formElement.children[0];
			const submitButton = formElement.children[1];
			const externalForm = addedElements[1];

			await waitNextTask();
			await waitNextTask();

			formElement.addEventListener('submit', () => submitted.internal = true);
			formElement.addEventListener('reset', () => reset.internal = true);

			externalForm.addEventListener('submit', () => submitted.external = true);
			externalForm.addEventListener('reset', () => reset.external = true);

			resetButton.click();
			submitButton.click();

			expect(reset).to.eql(expectedReset);
			expect(submitted).to.eql(expectedSubmitted);
		});

		it(`should associate with no form if form attribute is set with nonexistent id`, async function() {
			const submitted = {
				external: false,
				internal: false
			};

			const reset = {
				external: false,
				internal: false
			};

			const expectedSubmitted = {
				external: false,
				internal: false
			}
			const expectedReset = {
				external: false,
				internal: false
			}

			addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<vwc-button id="button-a" form="noneExistentForm" type="reset">RESET</vwc-button>
					<vwc-button id="button-b" form="noneExistentForm" type="submit">SUBMIT</vwc-button>
				</form>
				<form onsubmit="return false" name="externalForm" id="externalForm"></form>
			`);
			const formElement = addedElements[0];
			const resetButton = formElement.children[0];
			const submitButton = formElement.children[1];
			const externalForm = addedElements[1];

			await waitNextTask();
			await waitNextTask();

			formElement.addEventListener('submit', () => submitted.internal = true);
			formElement.addEventListener('reset', () => reset.internal = true);

			externalForm.addEventListener('submit', () => submitted.external = true);
			externalForm.addEventListener('reset', () => reset.external = true);

			resetButton.click();
			submitButton.click();

			expect(reset).to.eql(expectedReset);
			expect(submitted).to.eql(expectedSubmitted);
		});
	});
});
