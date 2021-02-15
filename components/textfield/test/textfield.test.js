import '../vwc-textfield.js';
import '@vonage/vwc-formfield';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	assertDistancePixels,
	changeValueAndNotify,
	isolatedElementsCreation,
	randomAlpha,
	listenToSubmission,
} from '../../../test/test-helpers.js';
import {
	shapeRoundedTestCases,
	shapePillTestCases,
} from '../../../test/shared';
import {
	typographyTestCases,
	assertDenseStyles,
	hasNotchedOutline,
	validateMultipleShadowLayers,
	validateOnReset,
} from '@vonage/vvd-foundation/test/input-utils.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { requestSubmit } from '@vonage/vvd-foundation/form-association';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

function getHiddenInput(formElement, fieldName) {
	return formElement.querySelector(`input[name="${fieldName}"]`);
}

describe('textfield', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', async () => {
		expect(Boolean(customElements.get(COMPONENT_NAME))).to.equal(true);
	});

	it('should have internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e).lightDom.equalSnapshot();
		expect(e).shadowDom.equalSnapshot();
	});

	describe('typography', () => {
		typographyTestCases(COMPONENT_NAME);
	});

	describe(`form association`, function () {
		function createElementInForm(fieldName, fieldValue, formId, otherFormId) {
			const otherForm = otherFormId
				? `<form onsubmit="return false" id="${otherFormId}"><button></button></form>`
				: '';
			return textToDomToParent(
				`<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} name="${fieldName}"
						value="${fieldValue}"
						${formId ? `form="${formId}"` : ''}>
					</${COMPONENT_NAME}>
					<button></button>
				</form>
				${otherForm}`
			);
		}

		let fieldValue, fieldName;
		beforeEach(function () {
			fieldValue = Math.random().toString();
			fieldName = 'test-field';
		});

		it(`should attach to closest form`, async function () {
			const [formElement] = addElement(createElementInForm(fieldName, fieldValue));
			await waitNextTask();

			const submitPromise = listenToSubmission(formElement);

			requestSubmit(formElement);

			for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
				expect(formDataKey).to.equal(fieldName);
				expect(formDataValue).to.equal(fieldValue);
			}

			expect(
				formElement.querySelectorAll(`input[name="${fieldName}"]`).length
			).to.equal(1);
		});

		it(`should attach to form when given form id`, async function () {
			const externalFormID = randomAlpha();

			const addedElements = addElement(
				createElementInForm(fieldName, fieldValue, externalFormID, externalFormID)
			);

			await waitNextTask();

			const formElement = addedElements[0];
			const externalForm = addedElements[1];
			const inputElement = formElement
				.querySelector(COMPONENT_NAME)
				.querySelector(`input[name="${fieldName}"`);

			const submitPromise = listenToSubmission(externalForm);

			requestSubmit(externalForm);

			for (let [formDataKey, formDataValue] of (await submitPromise).entries()) {
				expect(formDataKey).to.equal(fieldName);
				expect(formDataValue).to.equal(fieldValue);
			}

			expect([...formElement.elements].includes(inputElement)).to.equal(false);
			expect([...externalForm.elements].includes(inputElement)).to.equal(true);
		});

		describe(`value binding`, function () {
			it(`should reset the value of the custom element to default on form reset`, async function () {
				const [formElement] = addElement(
					createElementInForm(fieldName, fieldValue)
				);
				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();
				actualElement.value = '5';
				await waitNextTask();
				formElement.reset();

				expect(actualElement.value).to.equal(fieldValue);
			});

			it(`should change the value of the mock input on internal input change`, async function () {
				const [formElement] = addElement(
					createElementInForm(fieldName, fieldValue)
				);

				const actualElement = formElement.querySelector(COMPONENT_NAME);
				await waitNextTask();

				await changeValueAndNotify(actualElement, fieldValue, 'change');

				expect(getHiddenInput(formElement, fieldName).value).to.equal(fieldValue);
			});
		});

		describe(`validation`, function () {
			const invalidValue = '';
			const validValue = 'abc';
			let formElement, actualElement;

			beforeEach(async function () {
				[formElement] = addElement(createElementInForm(fieldName, validValue));
				actualElement = formElement.querySelector(COMPONENT_NAME);
				actualElement.setAttribute('required', 'true');
				await waitNextTask();
			});

			it(`should set validity on the form`, async function () {
				await changeValueAndNotify(actualElement, invalidValue);
				const invalidity = formElement.checkValidity();

				await changeValueAndNotify(actualElement, validValue, 'input');

				expect(invalidity).to.equal(false);
				expect(formElement.checkValidity()).to.equal(true);
			});

			it(`should validate on reset`, async function () {
				validateOnReset(actualElement, formElement, invalidValue);
			});

			it(`should not submit an invalid form`, async function () {
				let submitted = false;
				formElement.addEventListener('submit', () => {
					submitted = true;
				});

				await changeValueAndNotify(actualElement, invalidValue);
				requestSubmit(formElement);

				expect(formElement.checkValidity()).to.equal(false);
				expect(submitted).to.equal(false);
			});
		});

		it(`should work under multiple shadow layers`, async function () {
			validateMultipleShadowLayers(COMPONENT_NAME, 'input');
		});
	});

	describe('notched outlined', () => {
		it('should have vwc-notched-outline defined', async () => {
			hasNotchedOutline(COMPONENT_NAME);
		});
	});

	describe('density', () => {
		it('should have normal size by default', async () => {
			const [e] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			assertComputedStyle(e, { height: '48px' });
		});

		it('should have dense size when dense', async () => {
			assertDenseStyles(COMPONENT_NAME);
		});

		it('should have 16px space between edge and the input (outlined)', async () => {
			const [e] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const i = e.querySelector('input');
			assertDistancePixels(e, i, 'left', 0);
			assertComputedStyle(i, { paddingInlineStart: '16px' });
		});

		it('should have 16px space between edge and the label (outlined)', async () => {
			const [e] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} label="Label"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const l = e.shadowRoot.querySelector('.mdc-floating-label');
			assertDistancePixels(e, l, 'left', 16);
		});

		it('should have leading icon positioned correctly (outlined)', async () => {
			const [e] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} label="Label" icon="info"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const i = e.shadowRoot.querySelector('vwc-icon');
			expect(i).exist;
			expect(i.offsetHeight).equal(20);
			expect(i.offsetWidth).equal(14);
			assertDistancePixels(e, i, 'left', 16);
			assertDistancePixels(e, i, 'top', (e.offsetHeight - i.offsetHeight) / 2);
		});

		it('should have leading icon positioned correctly (dense)', async () => {
			const [e] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} dense label="Label" icon="info"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const icn = e.shadowRoot.querySelector('vwc-icon');
			const inp = e.querySelector('input');
			expect(icn).exist;
			expect(icn.offsetHeight).equal(20);
			expect(icn.offsetWidth).equal(14);
			assertDistancePixels(inp, icn, 'left', 16);
			assertDistancePixels(
				inp,
				icn,
				'top',
				(inp.offsetHeight - icn.offsetHeight) / 2
			);
		});
	});

	describe('shape', () => {
		shapeRoundedTestCases(COMPONENT_NAME);
		shapePillTestCases(COMPONENT_NAME);
	});
});
