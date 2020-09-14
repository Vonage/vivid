import '../vwc-checkbox.js';
import {
  textToDocumentFragment,
  waitNextTask,
} from '../../../test/test-helpers.js';

describe('checkbox', () => {
  it('should be defined as a custom element', async () => {
    assert.exists(
      customElements.get('vwc-checkbox', 'vwc-checkbox element is not defined')
    );
  });

  it('should have internal contents', async () => {
    await customElements.whenDefined('vwc-checkbox');
    const docFragContainer = textToDocumentFragment(
      '<vwc-checkbox id="checkbox-a"></vwc-checkbox>'
    );
    const actualElement = docFragContainer.firstElementChild;
    document.body.appendChild(docFragContainer);
    await waitNextTask();
    assert.equal(document.querySelector('#checkbox-a'), actualElement);
    assert.exists(actualElement.shadowRoot);
    assert.equal(actualElement.shadowRoot.childElementCount, 1);
    assert.equal(actualElement.shadowRoot.querySelectorAll('*').length, 6);
  });
});
