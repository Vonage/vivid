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

	it(`${COMPONENT_NAME} defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualEl = addedElements[0];
		await waitNextTask();
		expect(actualEl.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('tooltip default init', () => {
		it('should reflect from attribute to tooltip property', async () => {
			const [actualEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			await actualEl.updateComplete;
			expect(actualEl.open, 'tooltip open should be false')
				.to
				.equal(false);
			expect(actualEl.anchor, 'tooltip anchor should be ""')
				.to
				.equal("");
			expect(actualEl.text, 'tooltip text should be empty')
				.to
				.equal('');
			expect(actualEl.corner, 'tooltip corner should be undefined')
				.to
				.equal(undefined);
		});
	});

	describe(`hide`, () => {
		it(`should hide tooltip`, async () => {
			const [actualEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
			);
			actualEl.hide();
			await actualEl.updateComplete;
			expect(actualEl.open)
				.to
				.equal(false);
		});
	});

	describe(`show`, () => {
		it(`should show the tooltip`, async () => {
			addElement(
				textToDomToParent(`<vwc-button id="tooltip-anchor"></vwc-button>`)
			);
			const [actualEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualEl.anchor = "tooltip-anchor";
			await actualEl.updateComplete;
			actualEl.show();
			await actualEl.updateComplete;
			expect(actualEl.open)
				.to
				.equal(true);
		});
	});
});
