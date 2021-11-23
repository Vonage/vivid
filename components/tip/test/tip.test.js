import '../vwc-tip.js';
import 'chai-dom';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-tip';

describe('tip', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});

	describe('Tip default init', () => {
		it('should reflect from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;
			expect(actualElement.icon, 'open should be help-line')
				.to
				.equal('help-line');
			expect(actualElement.dismissible, 'dismissible should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.content, 'content should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.placement, 'placement should be auto')
				.to
				.equal('auto');
			expect(actualElement.distance, 'distance should be 10')
				.to
				.equal(10);
		});
	});
});
