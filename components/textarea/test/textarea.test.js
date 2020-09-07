import '../vwc-textarea.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textarea';

function listenToSubmission(formElement) {
	return new Promise(res => {
		formElement.addEventListener('submit', () => {
			const formData = new FormData(formElement);
			res(formData);
		});
	});
}

describe.only('textarea', () => {
	let addedElements = [];

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should be defined as a custom element', async () => {
		assert.exists(customElements.get(COMPONENT_NAME, 'vwc-textarea element is not defined'));
	});

	it('should have internal contents', async () => {
		addedElements = textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`form association`, function() {

		it(`should attach to closest form`, async function() {
			const fieldValue = `
				${Math.random().toString()}
				${Math.random().toString()}
			`;
			const fieldName = 'test-field';
			addedElements = textToDomToParent(`<form onsubmit="return false" name="testForm" id="testForm"><${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}">Button Text</${COMPONENT_NAME}></form>`);
			const formElement = addedElements[0];
			await waitNextTask();

			const submitPromise = listenToSubmission(formElement);

			formElement.requestSubmit();

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1].split('\r').join('')).to.equal(fieldValue);
			}

			expect(formElement.querySelectorAll(`textarea[name="${fieldName}"`).length).to.equal(1);
		});

		it(`should attach to form when given form id`, async function () {
			const fieldValue = Math.random().toString();
			const fieldName = 'test-field';
			const externalFormID = 'externalForm';

			addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${COMPONENT_NAME} name="${fieldName}" value="${fieldValue}" form="${externalFormID}">Button Text
					</${COMPONENT_NAME}>
				</form>
				<form onsubmit="return false" name="externalForm" id="${externalFormID}"></form>`);

			await waitNextTask();

			const formElement = addedElements[0];
			const externalForm = addedElements[1];

			const submitPromise = listenToSubmission(externalForm);

			externalForm.requestSubmit();

			for (let pair of (await submitPromise).entries()) {
				expect(pair[0]).to.equal(fieldName);
				expect(pair[1]).to.equal(fieldValue);
			}

			expect(formElement.querySelector(`textarea[name="${fieldName}"`)).to.equal(null);
			expect(externalForm.querySelectorAll(`textarea[name="${fieldName}"`).length).to.equal(1);
		});
	});

	describe('typography', () => {
		it('should have set typography for a label', async () => {
			addedElements = textToDomToParent(`<${COMPONENT_NAME} outlined label="Vwc textarea"></${COMPONENT_NAME}>`);
			await waitNextTask();
			const labelElement = addedElements[0].shadowRoot.querySelector('.mdc-notched-outline').querySelector('#label');
			expect(labelElement).to.exist;
			assertComputedStyle(labelElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '18.4px',
				letterSpacing: '0.133333px',
				textTransform: 'none'
			});
		});

		it('should have set typography for an input', async () => {
			addedElements = textToDomToParent(`<${COMPONENT_NAME} outlined disabled label="Vwc textarea"></${COMPONENT_NAME}>`);
			await waitNextTask();
			const inputElement = addedElements[0].shadowRoot.querySelector('.mdc-text-field__input');
			expect(inputElement).to.exist;
			assertComputedStyle(inputElement, {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '14.2222px',
				fontWeight: '400',
				fontStretch: '50%',
				lineHeight: '24px',
				letterSpacing: '0.133333px',
				textTransform: 'none'
			});
		});
	});
});
