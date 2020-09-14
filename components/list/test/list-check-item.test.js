import '../vwc-check-list-item.js';
import {
  textToDomToParent,
  waitNextTask,
  assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_CHECK_LIST_ITEM = 'vwc-check-list-item';

describe('check list item', () => {
  it('should be defined as a custom element', () => {
    assert.exists(
      customElements.get(
        VWC_CHECK_LIST_ITEM,
        'vwc-check-list-item element is not defined'
      )
    );
  });

  describe('init flow', () => {
    it('should have expected HTML', async () => {
      const docFragContainer = textToDomToParent(
        `<${VWC_CHECK_LIST_ITEM} id="check-list-item-a">Item 0</${VWC_CHECK_LIST_ITEM}>`,
        document.body
      );
      await waitNextTask();
      expect(docFragContainer[0]).shadowDom.to.equalSnapshot();
    });
  });

  describe('typography', function () {
    it(`should have set typography correct (normal)`, async function () {
      const actualElements = textToDomToParent(
        `<${VWC_CHECK_LIST_ITEM}>Item 1</${VWC_CHECK_LIST_ITEM}>`
      );
      await waitNextTask();
      const listItem = actualElements[0];
      expect(listItem).to.exist;
      assertComputedStyle(listItem, {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '14.2222px',
        fontWeight: '400',
        fontStretch: '50%',
        //	lineHeight: '22.8697px',
        letterSpacing: 'normal',
        textTransform: 'none',
      });
    });

    it(`should have set typography correct (left, selected)`, async function () {
      const actualElements = textToDomToParent(
        `<${VWC_CHECK_LIST_ITEM} left selected>Item 1</${VWC_CHECK_LIST_ITEM}>`
      );
      await waitNextTask();
      const listItem = actualElements[0];
      expect(listItem).to.exist;
      const expectedStyles = {
        fontFamily: 'SpeziaWebVariable',
        fontSize: '14.2222px',
        fontWeight: '400',
        fontStretch: '50%',
        //	lineHeight: '22.8697px',
        letterSpacing: 'normal',
        textTransform: 'none',
      };
      assertComputedStyle(listItem, expectedStyles);
    });
  });
});
