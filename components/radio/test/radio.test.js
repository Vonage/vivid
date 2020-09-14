import '../vwc-radio.js';
import {
  textToDocumentFragment,
  waitNextTask,
} from '../../../test/test-helpers.js';

describe('vwc-radio', () => {
  it('should be defined as a custom element', async () => {
    assert.exists(
      customElements.get('vwc-radio', 'vwc-radio element is not defined')
    );
  });

  it('should have internal contents', async () => {
    await customElements.whenDefined('vwc-radio');
    const docFragContainer = textToDocumentFragment(
      '<vwc-radio id="radio-a" name="myGroup" value="value1"></vwc-radio>'
    );
    const actualElement = docFragContainer.firstElementChild;
    document.body.appendChild(docFragContainer);
    await waitNextTask();
    assert.equal(document.querySelector('#radio-a'), actualElement);
    assert.exists(actualElement.shadowRoot);
    assert.equal(actualElement.shadowRoot.childElementCount, 1);
    assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 6);
  });
});
