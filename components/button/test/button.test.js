import '../vwc-button.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,

	isolatedElementsCreation,
	randomAlpha,
} from '../../../test/test-helpers.js';
import {
	sizingTestCases,
	shapeRoundedTestCases,
	shapePillTestCases,
} from '../../../test/shared';
import { connotationTestCases } from './button.connotation.test.js';


chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-button';

describe('button', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-button is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-button element is not defined')
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('Form Association', () => {
		function hiddenButtonExists(formElement) {
			return formElement.querySelector('button') !== null;
		}

		it('should submit form when inside a form', async () => {
			let submitted = false;
			const addedElements = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			formElement.addEventListener('submit', () => (submitted = true));

			actualElement.click();

			expect(submitted).to.equal(true);
		});

		it('should submit form when of type submit', async () => {
			let submitted = false;
			const addedElements = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} type="submit">Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			formElement.addEventListener('submit', () => (submitted = true));

			actualElement.click();

			expect(submitted).to.equal(true);
		});

		it('should reset form when of type reset', async () => {
			let submitted = false;
			let reset = false;
			const addedElements = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} type="reset">Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			formElement.addEventListener('submit', () => (submitted = true));
			formElement.addEventListener('reset', () => (reset = true));

			actualElement.click();

			expect(reset).to.equal(true);
			expect(submitted).to.equal(false);
		});

		it('should associate with external form attribute is set with form id', async () => {
			const submitted = {
				external: false,
				internal: false,
			};

			const reset = {
				external: false,
				internal: false,
			};

			const expectedSubmitted = {
				external: true,
				internal: false,
			};
			const expectedReset = {
				external: true,
				internal: false,
			};

			const externalFormID = randomAlpha();
			const [formElement, externalForm] = addElement(
				textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} form="${externalFormID}" type="reset">RESET</${COMPONENT_NAME}>
					<${COMPONENT_NAME} form="${externalFormID}" type="submit">SUBMIT</${COMPONENT_NAME}>
				</form>
				<form onsubmit="return false" name="externalForm" id="${externalFormID}"></form>
			`)
			);
			await waitNextTask();

			const resetButton = formElement.children[0];
			const submitButton = formElement.children[1];

			formElement.addEventListener('submit', () => (submitted.internal = true));
			formElement.addEventListener('reset', () => (reset.internal = true));

			externalForm.addEventListener('submit', () => (submitted.external = true));
			externalForm.addEventListener('reset', () => (reset.external = true));

			resetButton.click();
			submitButton.click();

			expect(reset, 'expected button to reset the external form').to.eql(
				expectedReset
			);
			expect(submitted, 'expected button to submit the external form').to.eql(
				expectedSubmitted
			);
		});

		it('should associate with form even if the form is added after the button', async () => {
			const afterSubmit = {
				external: false,
				internal: false,
			};

			const afterReset = {
				external: false,
				internal: false,
			};

			const expectedAfterSubmitted = {
				external: true,
				internal: false,
			};
			const expectedAfterReset = {
				external: true,
				internal: false,
			};

			const [formElement] = addElement(
				textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} form="externalForm" type="reset">RESET</${COMPONENT_NAME}>
					<${COMPONENT_NAME} form="externalForm" type="submit">SUBMIT</${COMPONENT_NAME}>
				</form>
			`)
			);
			await waitNextTask();
			const [externalForm] = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="externalForm" id="externalForm"></form>`
				)
			);
			const resetButton = formElement.children[0];
			const submitButton = formElement.children[1];

			formElement.addEventListener('submit', () => (afterSubmit.internal = true));
			formElement.addEventListener('reset', () => (afterReset.internal = true));

			externalForm.addEventListener('submit', () => (afterSubmit.external = true));
			externalForm.addEventListener('reset', () => (afterReset.external = true));

			resetButton.click();
			submitButton.click();

			expect(afterReset).to.eql(expectedAfterReset);
			expect(afterSubmit).to.eql(expectedAfterSubmitted);
		});

		it('should associate with no form if form attribute is set with nonexistent id', async () => {
			const submitted = {
				external: false,
				internal: false,
			};

			const reset = {
				external: false,
				internal: false,
			};

			const expectedSubmitted = {
				external: false,
				internal: false,
			};
			const expectedReset = {
				external: false,
				internal: false,
			};

			const addedElements = addElement(
				textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} form="noneExistentForm" type="reset">RESET</${COMPONENT_NAME}>
					<${COMPONENT_NAME} form="noneExistentForm" type="submit">SUBMIT</${COMPONENT_NAME}>
				</form>
				<form onsubmit="return false" name="externalForm" id="externalForm"></form>
			`)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const resetButton = formElement.children[0];
			const submitButton = formElement.children[1];
			const externalForm = addedElements[1];

			formElement.addEventListener('submit', () => (submitted.internal = true));
			formElement.addEventListener('reset', () => (reset.internal = true));

			externalForm.addEventListener('submit', () => (submitted.external = true));
			externalForm.addEventListener('reset', () => (reset.external = true));

			resetButton.click();
			submitButton.click();

			expect(reset).to.eql(expectedReset);
			expect(submitted).to.eql(expectedSubmitted);
		});

		it(`should do nothing when of type button`, async () => {
			let submitted = false;
			let reset = false;
			const addedElements = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} type="button">Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;
			formElement.addEventListener('submit', () => (submitted = true));
			formElement.addEventListener('reset', () => (reset = true));

			actualElement.click();

			expect(reset, 'reset was initiated').to.equal(false);
			expect(submitted, 'submit was initiated').to.equal(false);
		});

		it(`should submit even when requestSubmit is not supported`, async () => {
			let submitted = false;
			const addedElements = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const formElement = addedElements[0];
			formElement.requestSubmit = undefined;
			const actualElement = formElement.firstChild;
			formElement.addEventListener('submit', () => (submitted = true));

			actualElement.click();

			expect(submitted, 'submit was not initiated').to.equal(true);
		});

		it(`should cleanup the hidden button on disconnection`, async () => {
			const [formElement] = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const actualElement = formElement.querySelector(COMPONENT_NAME);

			const buttonExistsBeforeDisconnection = hiddenButtonExists(formElement);
			actualElement.remove();
			expect(buttonExistsBeforeDisconnection).to.equal(true);
			expect(hiddenButtonExists(formElement)).to.equal(false);
		});

		it(`should set the form property to parent form`, async () => {
			const [formElement] = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm">
								<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>
							</form>`
				)
			);
			await waitNextTask();
			const actualElement = formElement.querySelector(COMPONENT_NAME);
			expect(actualElement.form).to.equal(formElement);
		});

		it(`should set the form property to form with the form's attribute`, async () => {
			const otherFormId = randomAlpha();
			const [formElement, otherForm] = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm">
								<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>
							</form>
							<form id="${otherFormId}"></form>`
				)
			);
			await waitNextTask();

			const actualElement = formElement.querySelector(COMPONENT_NAME);
			actualElement.setAttribute('form', otherFormId);
			expect(actualElement.form).to.equal(otherForm);
		});

		it(`should have display:none on the hidden button`, async () => {
			const [formElement] = addElement(
				textToDomToParent(
					`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}></form>`
				)
			);
			await waitNextTask();
			const buttonElement = formElement.querySelector('button');

			assertComputedStyle(buttonElement, {
				display: 'none',
			});
		});
	});

	describe(`Safari Fiasco`, () => {
		const originalAttachShadow = HTMLElement.prototype.attachShadow;
		let attachShadowConfig = {};

		beforeEach(() => {
			HTMLElement.prototype.attachShadow = function (config) {
				attachShadowConfig = config;
			};
		});

		afterEach(() => {
			HTMLElement.prototype.attachShadow = originalAttachShadow;
		});

		it(`should set the shadowroot without delegatesFocus: true on Safari`, () => {
			const isOnSafari = !HTMLFormElement.prototype.requestSubmit;
			addElement(textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`));
			expect(Boolean(attachShadowConfig.delegatesFocus)).to.equal(!isOnSafari);
		});
	});

	describe('sizing', () => {
		sizingTestCases(COMPONENT_NAME);
	});

	describe('shape', () => {
		shapeRoundedTestCases(COMPONENT_NAME);
		shapePillTestCases(COMPONENT_NAME, false);
	});

	describe('button connotation', () => {
		connotationTestCases(COMPONENT_NAME);
	});
});
