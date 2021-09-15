import '../vwc-inline.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
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

	describe('API', () => {
		it(`should set template fit`, async () => {
			const actualElement = getNewElement();
			actualElement.template = "fit";
			actualElement.style.width = "1300px";
			await waitNextTask();
			const { shadowRoot: { firstElementChild: div } } = actualElement;
			const assignedElements = div.firstElementChild.assignedElements();
			const [childEl] = assignedElements;
			await waitNextTask();
			expect(childEl.clientWidth).to.equal(282);
		});
		it(`should set template fill`, async () => {
			const actualElement = getNewElement();
			actualElement.template = "fill";
			actualElement.style.width = "1300px";
			await waitNextTask();
			const { shadowRoot: { firstElementChild: div } } = actualElement;
			const assignedElements = div.firstElementChild.assignedElements();
			const [childEl] = assignedElements;
			await waitNextTask();
			expect(childEl.clientWidth).to.equal(180);
		});
		it(`should set size to block`, async () => {
			const actualElement = getNewElement();
			actualElement.columnBasis = "block";
			actualElement.style.width = "1300px";
			await actualElement.updateComplete;
			const { shadowRoot: { firstElementChild: div } } = actualElement;
			const assignedElements = div.firstElementChild.assignedElements();
			const [childEl] = assignedElements;
			await actualElement.updateComplete;
			expect(childEl.clientWidth).to.equal(1200);
		});
	});
});
