import '../vwc-button.js';
import {
  waitNextTask,
  textToDomToParent,
  assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_BUTTON = 'vwc-button';

describe('button', () => {
  let addedElements = [];
  afterEach(() => {
    addedElements.forEach((elm) => elm.remove());
  });
  it('vwc-button is defined as a custom element', async () => {
    assert.exists(
      customElements.get(VWC_BUTTON, 'vwc-button element is not defined')
    );
  });

  it('should internal contents', async () => {
    addedElements = textToDomToParent(
      `<${VWC_BUTTON}>Button Text</${VWC_BUTTON}>`
    );
    const actualElement = addedElements[0];
    await waitNextTask();
    expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
  });

  describe('Form Association', function () {
    beforeEach(() => {
      window.formSubmitted = false;
    });

    it('should submit form when inside a form', async function () {
      let submitted = false;
      addedElements = textToDomToParent(
        `<form onsubmit="return false" name="testForm" id="testForm"><${VWC_BUTTON}>Button Text</${VWC_BUTTON}></form>`
      );
      const formElement = addedElements[0];
      const actualElement = formElement.firstChild;
      formElement.addEventListener('submit', () => (submitted = true));

      actualElement.click();

      expect(submitted).to.equal(true);
    });

    it('should submit form when of type submit', async function () {
      let submitted = false;
      addedElements = textToDomToParent(
        `<form onsubmit="return false" name="testForm" id="testForm"><${VWC_BUTTON} type="submit">Button Text</${VWC_BUTTON}></form>`
      );
      const formElement = addedElements[0];
      const actualElement = formElement.firstChild;
      formElement.addEventListener('submit', () => (submitted = true));

      actualElement.click();

      expect(submitted).to.equal(true);
    });

    it('should reset form when of type reset', async function () {
      let submitted = false;
      let reset = false;
      addedElements = textToDomToParent(
        `<form onsubmit="return false" name="testForm" id="testForm"><${VWC_BUTTON} type="reset">Button Text</${VWC_BUTTON}></form>`
      );
      const formElement = addedElements[0];
      const actualElement = formElement.firstChild;
      formElement.addEventListener('submit', () => (submitted = true));
      formElement.addEventListener('reset', () => (reset = true));

      actualElement.click();

      expect(reset).to.equal(true);
      expect(submitted).to.equal(false);
    });

    it('should associate with external form attribute is set with form id', async function () {
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

      addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${VWC_BUTTON} form="externalForm" type="reset">RESET</${VWC_BUTTON}>
					<${VWC_BUTTON} form="externalForm" type="submit">SUBMIT</${VWC_BUTTON}>
				</form>
				<form onsubmit="return false" name="externalForm" id="externalForm"></form>
			`);
      const formElement = addedElements[0];
      const resetButton = formElement.children[0];
      const submitButton = formElement.children[1];
      const externalForm = addedElements[1];

      formElement.addEventListener('submit', () => (submitted.internal = true));
      formElement.addEventListener('reset', () => (reset.internal = true));

      externalForm.addEventListener(
        'submit',
        () => (submitted.external = true)
      );
      externalForm.addEventListener('reset', () => (reset.external = true));

      resetButton.click();
      submitButton.click();

      expect(reset).to.eql(expectedReset);
      expect(submitted).to.eql(expectedSubmitted);
    });

    it('should associate with no form if form attribute is set with nonexistent id', async function () {
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

      addedElements = textToDomToParent(`
				<form onsubmit="return false" name="testForm" id="testForm">
					<${VWC_BUTTON} form="noneExistentForm" type="reset">RESET</${VWC_BUTTON}>
					<${VWC_BUTTON} form="noneExistentForm" type="submit">SUBMIT</${VWC_BUTTON}>
				</form>
				<form onsubmit="return false" name="externalForm" id="externalForm"></form>
			`);
      const formElement = addedElements[0];
      const resetButton = formElement.children[0];
      const submitButton = formElement.children[1];
      const externalForm = addedElements[1];

      formElement.addEventListener('submit', () => (submitted.internal = true));
      formElement.addEventListener('reset', () => (reset.internal = true));

      externalForm.addEventListener(
        'submit',
        () => (submitted.external = true)
      );
      externalForm.addEventListener('reset', () => (reset.external = true));

      resetButton.click();
      submitButton.click();

      expect(reset).to.eql(expectedReset);
      expect(submitted).to.eql(expectedSubmitted);
    });
  });

  describe('typography', function () {
    it(`should have set button (text, rounded) typography correct`, async function () {
      const actualElements = textToDomToParent(
        `<${VWC_BUTTON}>Button Text</${VWC_BUTTON}>`
      );
      await waitNextTask();
      const button = actualElements[0].shadowRoot.querySelector('#button');
      expect(button).to.exist;
      const expectedStyles = {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '14.2222px',
        fontWeight: '600',
        fontStretch: '50%',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textTransform: 'none',
      };
      assertComputedStyle(button, expectedStyles);
    });

    it(`should have set button (outlined, pill) typography correct`, async function () {
      const actualElements = textToDomToParent(
        `<${VWC_BUTTON} layout="outlined" shape="pill">Button Text</${VWC_BUTTON}>`
      );
      await waitNextTask();
      const button = actualElements[0].shadowRoot.querySelector('#button');
      expect(button).to.exist;
      const expectedStyles = {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '14.2222px',
        fontWeight: '600',
        fontStretch: '50%',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textTransform: 'none',
      };
      assertComputedStyle(button, expectedStyles);
    });

    it(`should have set button (filled, disabled, pill) typography correct`, async function () {
      const actualElements = textToDomToParent(
        `<${VWC_BUTTON} layout="filled" disabled shape="pill">Button Text</${VWC_BUTTON}>`
      );
      await waitNextTask();
      const button = actualElements[0].shadowRoot.querySelector('#button');
      expect(button).to.exist;
      const expectedStyles = {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '14.2222px',
        fontWeight: '600',
        fontStretch: '50%',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textTransform: 'none',
      };
      assertComputedStyle(button, expectedStyles);
    });
  });
});
