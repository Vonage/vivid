import '../vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import {
  textToDomToParent,
  waitNextTask,
  assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_SELECT = 'vwc-select';

function listenToSubmission(formElement) {
  return new Promise((res) => {
    formElement.addEventListener('submit', () => {
      const formData = new FormData(formElement);
      res(formData);
    });
  });
}

async function changeFieldValue(actualElement, value, eventName = 'change') {
  actualElement.value = value.toString();
  await waitNextTask();

  let evt = new Event(eventName);
  actualElement.dispatchEvent(evt);
}

describe('select', () => {
  let addedElements = [];

  afterEach(() => {
    addedElements.forEach((elm) => elm.remove());
  });

  it('should be defined as a custom element', () => {
    assert.exists(
      customElements.get(VWC_SELECT, 'vwc-select element is not defined')
    );
  });

  describe('init flow', () => {
    it('should have the required elements', async () => {
      addedElements = textToDomToParent(`
				<${VWC_SELECT}>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
      await waitNextTask();
      expect(addedElements[0]).dom.to.equalSnapshot();
    });
  });

  describe(`form association`, function () {
    let value1, value2, fieldName, formId;

    beforeEach(() => {
      value1 = Math.random().toString();
      value2 = Math.random().toString();
      fieldName = 'test-field';
      formId = 'testForm';
    });

    it(`should attach to closest form`, async function () {
      addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} name="${fieldName}" value="${value2}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>`);
      const formElement = addedElements[0];
      await waitNextTask();

      const submitPromise = listenToSubmission(formElement);

      formElement.requestSubmit();

      for (let pair of (await submitPromise).entries()) {
        expect(pair[0]).to.equal(fieldName);
        expect(pair[1]).to.equal(value2);
      }

      expect(
        formElement.querySelectorAll(`input[name="${fieldName}"`).length
      ).to.equal(1);
    });

    it(`should attach to form when given form id`, async function () {
      const externalFormID = 'externalForm';

      addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} name="${fieldName}" value="${value1}" form="${externalFormID}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>
				<form onsubmit="return false" name="externalForm" id="${externalFormID}"></form>`);

      await waitNextTask();

      const formElement = addedElements[0];
      const externalForm = addedElements[1];

      const submitPromise = listenToSubmission(externalForm);

      externalForm.requestSubmit();

      for (let pair of (await submitPromise).entries()) {
        expect(pair[0]).to.equal(fieldName);
        expect(pair[1]).to.equal(value1);
      }

      expect(formElement.querySelector(`input[name="${fieldName}"`)).to.equal(
        null
      );
      expect(
        externalForm.querySelectorAll(`input[name="${fieldName}"`).length
      ).to.equal(1);
    });

    it(`should do nothing if form value resolves to a non form element`, async function () {
      addedElements = textToDomToParent(`
			<div onsubmit="return false" name="testForm" id="${formId}">
				<${VWC_SELECT} name="${fieldName}" value="${value1}" form="${formId}">
					<vwc-list-item value="${value1}">Item 1</vwc-list-item>
					<vwc-list-item value="${value2}">Item 2</vwc-list-item>
				</${VWC_SELECT}>
			</div>`);
      const formElement = addedElements[0];
      await waitNextTask();

      expect(formElement.querySelector('input')).to.equal(null);
    });

    describe(`value binding`, function () {
      it(`should reset the value of the custom element to default on form reset`, async function () {
        addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} name="${fieldName}" value="${value1}" form="${formId}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>`);
        const formElement = addedElements[0];
        const actualElement = formElement.querySelector('vwc-select');
        await waitNextTask();
        actualElement.value = '5';
        await waitNextTask();
        formElement.reset();

        expect(actualElement.value).to.equal(value1);
      });

      it(`should change the value of the mock input on internal input change`, async function () {
        addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} name="${fieldName}" value="${value1}" form="${formId}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>`);
        const formElement = addedElements[0];
        const actualElement = formElement.querySelector('vwc-select');
        await waitNextTask();

        actualElement.value = value2.toString();
        await waitNextTask();

        expect(actualElement.hiddenInput.value).to.equal(value2);
      });
    });

    describe(`validation`, function () {
      it(`should get validity from the element's validationMessage`, async function () {
        addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} required name="${fieldName}" form="${formId}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>`);
        const formElement = addedElements[0];
        const actualElement = formElement.querySelector('vwc-select');
        await waitNextTask();

        const invalidity = formElement.checkValidity();

        await changeFieldValue(actualElement, value1, 'change');

        expect(invalidity).to.equal(false);
        expect(formElement.checkValidity()).to.equal(true);
      });

      it(`should validate on reset`, async function () {
        addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} required name="${fieldName}" value="${value1}" form="${formId}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>`);
        const formElement = addedElements[0];
        const actualElement = formElement.querySelector('vwc-select');
        await waitNextTask();

        const validInput = formElement.checkValidity();
        await changeFieldValue(actualElement, '', 'change');
        const invalidInput = formElement.checkValidity();

        formElement.reset();

        expect(validInput).to.equal(true);
        expect(invalidInput).to.equal(false);
        expect(formElement.checkValidity()).to.equal(true);
      });

      it(`should not submit an invalid form`, async function () {
        let submitted = false;
        addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${VWC_SELECT} required name="${fieldName}" value="${value1}" form="${formId}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
				</form>`);
        const formElement = addedElements[0];
        const actualElement = formElement.querySelector('vwc-select');
        await waitNextTask();

        const invalidity = formElement.checkValidity();

        await waitNextTask();

        formElement.addEventListener('submit', () => {
          submitted = true;
        });

        formElement.requestSubmit();

        const submitValidForm = submitted;

        submitted = false;

        await changeFieldValue(actualElement, '', 'change');
        formElement.requestSubmit();

        expect(invalidity).to.equal(true);
        expect(submitValidForm).to.equal(true);
        expect(submitted).to.equal(false);
      });
    });

    it(`should work under multiple shadow layers`, async function () {
      addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="${formId}">
				<vwc-formfield>
					<${VWC_SELECT} required name="${fieldName}" value="${value1}" form="${formId}">
						<vwc-list-item value="${value1}">Item 1</vwc-list-item>
						<vwc-list-item value="${value2}">Item 2</vwc-list-item>
					</${VWC_SELECT}>
					</vwc-formfield>
				</form>`);
      const formElement = addedElements[0];
      const actualElement = formElement.querySelector('vwc-select');
      await waitNextTask();

      const validInput = formElement.checkValidity();

      const submitPromise = listenToSubmission(formElement);

      formElement.requestSubmit();

      for (let pair of (await submitPromise).entries()) {
        expect(pair[0]).to.equal(fieldName);
        expect(pair[1]).to.equal(value1);
      }

      await changeFieldValue(actualElement, '', 'change');

      expect(
        formElement.querySelectorAll(`input[name="${fieldName}"`).length
      ).to.equal(1);
      expect(validInput).to.equal(true);
      expect(formElement.checkValidity()).to.equal(false);
    });
  });

  describe('typography', () => {
    it('should have set typography for a label', async () => {
      addedElements = textToDomToParent(`
				<${VWC_SELECT} outlined label="VWC Select">
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
      await waitNextTask();
      const labelElement = addedElements[0].shadowRoot
        .querySelector('.mdc-notched-outline')
        .querySelector('#label');
      expect(labelElement).to.exist;
      assertComputedStyle(labelElement, {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '16px',
        fontWeight: '400',
        fontStretch: '50%',
        lineHeight: '18.4px',
        letterSpacing: '0.15px',
        textTransform: 'none',
      });
    });

    it('should have set typography for a helper', async () => {
      addedElements = textToDomToParent(`
				<${VWC_SELECT} outlined label="VWC Select" helper="Helper text">
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
      await waitNextTask();
      const helperElement = addedElements[0].shadowRoot.querySelector(
        '.mdc-select-helper-text'
      );
      expect(helperElement).to.exist;
      assertComputedStyle(helperElement, {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '12.642px',
        fontWeight: '400',
        fontStretch: '50%',
        lineHeight: 'normal',
        letterSpacing: '0.421399px',
        textTransform: 'none',
      });
    });
  });

  describe('notched outlined', () => {
    it('should have vwc-notched-outline defined', async () => {
      addedElements = textToDomToParent(`
				<${VWC_SELECT} outlined>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${VWC_SELECT}>
			`);
      await waitNextTask();
      const notchedOutline = addedElements[0].shadowRoot.querySelector(
        'vwc-notched-outline'
      );
      expect(notchedOutline).to.exist;
    });
  });
});
