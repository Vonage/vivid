import '../vwc-upload.js';
import { waitNextTask, textToDomToParent } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_COMPONENT = 'vwc-upload';

describe('upload', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_COMPONENT, 'vwc-upload element is not defined')
		);
	});

	it('should have the expected internal contents', async () => {
		addedElements = textToDomToParent(`<${VWC_COMPONENT}></${VWC_COMPONENT}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('form association', () => {
		it('should be associated with the wrapping form', () => {
			//
		});

		it('should be associated with the targeted form by form property', () => {
			//
		});

		it('should re-associate itself upon moving in the DOM', () => {
			//
		});

		it('should re-associate itself upon change of the "form" attribute', () => {
			//
		});
	});
});
