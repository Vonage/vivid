import '../vwc-inline.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_INLINE = 'vwc-inline';
const inlineHtmlStr = `<${VWC_INLINE}>
	<span>1</span>
	<span>2</span>
	<span>3</span>
	<span>4</span>
</${VWC_INLINE}>`;

const getNewElement = () => isolatedElementsCreation()(textToDomToParent(inlineHtmlStr))[0];

describe('inline', () => {
	let addElement = isolatedElementsCreation();
	describe('basics', () => {
		it(`${VWC_INLINE} is defined as a custom element`, async () => {
			assert.exists(
				customElements.get(VWC_INLINE, `${VWC_INLINE} element is not defined`)
			);
		});

		it('should have internal contents', async () => {
			const actualElement = getNewElement();
			await waitNextTask();
			expect(actualElement.shadowRoot.firstElementChild.innerHTML).to.equalSnapshot();
		});
	});

	describe('default values', () => {
		it('should have the default values', async () => {
			const COMPONENT_PROPERTIES = {
				columnBasis: 'sm', columnSpacing: 'md', inlineGutters: 'md'
			};
			for await (const [key, value] of Object.entries(COMPONENT_PROPERTIES)) {
				const [actualElement] = addElement(
					textToDomToParent(`<${VWC_INLINE}></${VWC_INLINE}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[key])
					.to
					.equal(value);
			}
		});
	});
});

