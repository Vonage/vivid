import '../vwc-textfield.js';
import {
  textToDomToParent,
  waitNextTask,
  waitInterval,
  assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

describe('textfield helper', () => {
  let addedElements = [];

  afterEach(() => {
    while (addedElements.length) {
      addedElements.pop().remove();
    }
  });

  it('should have a helper text visible when focused', async () => {
    const helper = 'helper',
      error = 'error';
    addedElements = textToDomToParent(`
			<${COMPONENT_NAME}
				outlined
				label="Vwc textfield"
				helper="${helper}"
				validationMessage="${error}"
				required pattern="[0-9]+"></${COMPONENT_NAME}>
		`);
    await waitNextTask();

    //	present, not seen
    const helperLine = addedElements[0].shadowRoot.querySelector(
      '.mdc-text-field-helper-text'
    );
    expect(helperLine).to.exist;
    expect(helperLine.textContent).to.equal(helper);
    assertComputedStyle(helperLine, { opacity: '0' });

    //	focused, seen
    addedElements[0].focus();
    await waitInterval(200);
    assertComputedStyle(helperLine, { opacity: '1' });

    //	blurred, not seen
    addedElements[0].shadowRoot
      .querySelector('.mdc-text-field')
      .classList.remove('mdc-text-field--focused');
    await waitInterval(200);
    assertComputedStyle(helperLine, { opacity: '0' });
  });

  it('should have helper error message visible when error', async () => {
    const helper = 'helper',
      error = 'error';
    addedElements = textToDomToParent(`
			<${COMPONENT_NAME}
				outlined
				label="Vwc textfield"
				helper="${helper}"
				validationMessage="${error}"
				required pattern="[0-9]+"></${COMPONENT_NAME}>
		`);
    await waitNextTask();

    //	ensure icon is there, not seen
    const vwcIcon = addedElements[0].shadowRoot.querySelector('vwc-icon');
    expect(vwcIcon).to.exist;
    assertComputedStyle(vwcIcon, { display: 'none' });

    //	present helper, not seen
    let helperLine = addedElements[0].shadowRoot.querySelector(
      '.mdc-text-field-helper-text'
    );
    expect(helperLine).to.exist;
    expect(helperLine.textContent).to.equal(helper);
    let errorLine = addedElements[0].shadowRoot.querySelector(
      '.mdc-text-field-helper-text--validation-msg'
    );
    expect(errorLine).to.not.exist;
    assertComputedStyle(helperLine, { opacity: '0' });

    //	make it error, error present
    addedElements[0].focus();
    addedElements[0].value = 'not-a-number';
    addedElements[0].reportValidity();
    await waitInterval(200);
    errorLine = addedElements[0].shadowRoot.querySelector(
      '.mdc-text-field-helper-text--validation-msg'
    );
    expect(errorLine).to.exist;
    expect(errorLine.textContent).to.equal(error);
    assertComputedStyle(errorLine, { opacity: '1' });

    //	ensure icon is there, not seen
    assertComputedStyle(vwcIcon, { display: 'flex' });

    //	blur, the error is still visible
    addedElements[0].shadowRoot
      .querySelector('.mdc-text-field')
      .classList.remove('mdc-text-field--focused');
    await waitInterval(200);
    assertComputedStyle(errorLine, { opacity: '1' });

    //	fix the error, error made invisible
    addedElements[0].focus();
    addedElements[0].value = '12';
    addedElements[0].reportValidity();
    await waitInterval(200);
    errorLine = addedElements[0].shadowRoot.querySelector(
      '.mdc-text-field-helper-text--validation-msg'
    );
    assertComputedStyle(errorLine, { opacity: '0' });

    //	blurred, not seen and becomes helper
    addedElements[0].blur();
    addedElements[0].shadowRoot
      .querySelector('.mdc-text-field')
      .classList.remove('mdc-text-field--focused');
    helperLine = addedElements[0].shadowRoot.querySelector(
      '.mdc-text-field-helper-text'
    );
    await waitInterval(200);
    expect(helperLine).to.exist;
    expect(helperLine.textContent).to.equal(helper);
  });
});
