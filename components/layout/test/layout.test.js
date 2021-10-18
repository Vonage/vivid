import '../vwc-layout.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_LAYOUT = 'vwc-layout';
const layoutHtmlStr = `<${VWC_LAYOUT}>
	<span>1</span>
	<span>2</span>
	<span>3</span>
	<span>4</span>
</${VWC_LAYOUT}>`;

const getNewElement = () => isolatedElementsCreation()(textToDomToParent(layoutHtmlStr))[0];

describe('layout', () => {
	let addElement = isolatedElementsCreation();
	describe('basics', () => {
		it(`${VWC_LAYOUT} is defined as a custom element`, async () => {
			assert.exists(
				customElements.get(VWC_LAYOUT, `${VWC_LAYOUT} element is not defined`)
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
				columnBasis: 'sm', columnSpacing: 'md'
			};
			for await (const [key, value] of Object.entries(COMPONENT_PROPERTIES)) {
				const [actualElement] = addElement(
					textToDomToParent(`<${VWC_LAYOUT}></${VWC_LAYOUT}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[key])
					.to
					.equal(value);
			}
		});
	});
});

