import '../vwc-popup.js';
import '@vonage/vwc-button';
import 'chai-dom';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-popup';

describe('popup', () => {
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

	describe('Popup default init', () => {
		it('should reflect from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;
			expect(actualElement.anchor, 'anchor should be null')
				.to
				.equal(null);
			expect(actualElement.open, 'open should be false')
				.to
				.equal(false);
			expect(actualElement.arrow, 'arrow should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.corner, 'corner should be left')
				.to
				.equal('left');
			expect(actualElement.dismissible, 'dismissible should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.strategy, 'strategy should be fixed')
				.to
				.equal('fixed');
		});
	});

	describe(`show`, function () {
		it(`should set "open" to true`, function () {
			const [anchorElement] = addElement(
				textToDomToParent(`<vwc-button></vwc-button>`)
			);
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.anchor = anchorElement;
			actualElement.show();

			expect(actualElement.open)
				.to
				.equal(true);
		});
	});

	describe(`hide`, function () {
		it(`should set "open" to false`, function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
			);

			actualElement.hide();
			expect(actualElement.open)
				.to
				.equal(false);
		});
	});
});