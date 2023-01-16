import '../vwc-tag.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-tag';

describe('Tag', () => {
	const addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('Tag attributes', () => {
		it('should reflect default attributes', async () => {
			const COMPONENT_PROPERTIES = ['connotation', 'layout', 'shape', 'text'];
			for await (const property of COMPONENT_PROPERTIES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} ${property}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[property])
					.to
					.equal('');
			}
		});

		it('should set selected to true', async () => {
			const COMPONENT_PROPERTIES = ['selectable', 'selected'];
			for await (const property of COMPONENT_PROPERTIES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} ${property}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[property])
					.to
					.equal(true);
			}
		});

		it('should reflect from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} layout=outlined connotation="cta"></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;
			expect(actualElement.layout)
				.to
				.equal('outlined');
			expect(actualElement.connotation)
				.to
				.equal('cta');
		});
	});

	describe('removable', () => {
		it('should remove the tag if remove button clicked', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} layout=outlined connotation="cta"></${COMPONENT_NAME}>`)
			);
			actualElement.removable = true;
			await actualElement.updateComplete;
			const removeButton = actualElement.shadowRoot?.querySelector('.remove-button');
			removeButton?.click();
			expect(Array.from(document.body.children).includes(actualElement)).to.equal(false);
		});

		it('should fire an event remove tag with tag in detail', async () => {
			let elementFromRemoveEvent = null;
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} layout=outlined connotation="cta"></${COMPONENT_NAME}>`)
			);
			actualElement.removable = true;
			await actualElement.updateComplete;
			const removeButton = actualElement.shadowRoot?.querySelector('.remove-button');
			actualElement.addEventListener('remove-tag', (event) => {
				elementFromRemoveEvent = event.detail;
			});
			removeButton?.click();
			expect(elementFromRemoveEvent).to.equal(actualElement);
		});

		it('should fire an event remove-tag leaving the element in the dom with removeEventOnly true', async () => {
			let elementFromRemoveEvent = null;
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} layout=outlined connotation="cta"></${COMPONENT_NAME}>`)
			);
			actualElement.removable = true;
			actualElement.removeEventOnly = true;
			await actualElement.updateComplete;
			const removeButton = actualElement.shadowRoot?.querySelector('.remove-button');
			actualElement.addEventListener('remove-tag', (event) => {
				elementFromRemoveEvent = event.detail;
			});
			removeButton?.click();
			expect(Array.from(document.body.children).includes(elementFromRemoveEvent)).to.equal(true);
		});
	});
});
