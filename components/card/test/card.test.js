import '../vwc-card.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { LitElement } from 'lit-element';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-card';

describe('Card', () => {
	let addElement = isolatedElementsCreation();

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

	describe(`heading`, function () {
		const headingText = 'This is the heading';

		it(`should set the heading according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} heading="${headingText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('.vwc-card-header');

			expect(headerElement.innerText).to.equal(headingText);
		});

		it(`should set the heading according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.heading = headingText;

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('.vwc-card-header');

			expect(headerElement.innerText).to.equal(headingText);
		});

		it(`should reflect the heading property and attribute`, async function () {
			const differentText = 'Diff';

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.heading = headingText;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('heading');

			actualElement.setAttribute('heading', differentText);

			expect(attributeValue).to.equal(headingText);
			expect(actualElement.heading).to.equal(differentText);
		});
	});

	describe(`header-icon`, function () {
		const iconName = 'home';

		it(`should set the icon according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} header-icon="${iconName}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerIconElement = actualElement.shadowRoot.querySelector('header vwc-icon');

			expect(headerIconElement.type).to.equal(iconName);
		});

		it(`should set the icon according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.headerIcon = iconName;

			await actualElement.updateComplete;

			const headerIconElement = actualElement.shadowRoot.querySelector('header vwc-icon');

			expect(headerIconElement.type).to.equal(iconName);
		});

		it(`should reflect the icon property and attribute`, async function () {
			const differentIconName = 'share';

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.headerIcon = iconName;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('header-icon');

			actualElement.setAttribute('header-icon', differentIconName);

			await actualElement.updateComplete;

			expect(attributeValue).to.equal(iconName);
			expect(actualElement.headerIcon).to.equal(differentIconName);
		});
	});
});
