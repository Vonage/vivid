import '../vwc-tooltip.js';
import '@vonage/vwc-button';
import 'chai-dom';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-tooltip';

describe('tooltip', () => {
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
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('tooltip default init', () => {
		it('should reflect from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;
			expect(actualElement.anchor, 'anchor should be ""')
				.to
				.equal("");
			expect(actualElement.open, 'open should be false')
				.to
				.equal(false);
			expect(actualElement.text, 'text should be empty')
				.to
				.equal('');
			expect(actualElement.corner, 'corner should be undefined')
				.to
				.equal(undefined);
		});
	});

	describe(`hide`, () => {
		it(`should hide tooltip`, async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
			);	
			actualElement.hide();
			await actualElement.updateComplete;
			expect(actualElement.open)
				.to
				.equal(false);
		});
	});

	describe(`show`, () => {
		it(`should show tooltip`, async () => {
			addElement(
				textToDomToParent(`<vwc-button id="anchor"></vwc-button>`)
			);
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.anchor = "anchor";
			await actualElement.updateComplete;
			actualElement.show();
			await actualElement.updateComplete;
			expect(actualElement.open)
				.to
				.equal(true);
		});
	});
});
