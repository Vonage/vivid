import '../vwc-switch.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const VWC_SWITCH = 'vwc-switch';

describe('switch', () => {
	let addedElements = [];
	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('should have vwc-switch defined', async () => {
		assert.exists(
			customElements.get(VWC_SWITCH, 'vwc-switch element is not defined')
		);
	});

	it('should have internal contents', async () => {
		addedElements = textToDomToParent(`<${VWC_SWITCH}></${VWC_SWITCH}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('sizing', () => {
		it('should have normal size by default', async () => {
			addedElements = textToDomToParent(`<${VWC_SWITCH}></${VWC_SWITCH}>`);
			const actualElement = addedElements[0];
			await waitNextTask();
			const expectedStyles = {
				width: '30px',
				height: '20px',
			};
			assertComputedStyle(actualElement, expectedStyles);
		});

		it('should have enlarged size when enlarged', async () => {
			addedElements = textToDomToParent(
				`<${VWC_SWITCH} enlarged></${VWC_SWITCH}>`
			);
			const actualElement = addedElements[0];
			await waitNextTask();
			const expectedStyles = {
				width: '50px',
				height: '32px',
			};
			assertComputedStyle(actualElement, expectedStyles);
		});
	});
});
