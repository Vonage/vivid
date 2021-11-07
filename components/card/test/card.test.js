import '../vwc-card.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

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
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`header`, function () {
		it(`should not be displayed if heading, icon and subtitle are missing`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('header');

			expect(headerElement.classList.contains('no-content'))
				.to
				.equal(true);
		});

		it(`should be displayed if slotted icon exists even without heading, icon and subtitle`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content<div slot="graphics"></div></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('header');

			expect(headerElement.classList.contains('no-content'))
				.to
				.equal(false);
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

			expect(headerIconElement.type)
				.to
				.equal(iconName);
		});

		it(`should set the icon according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.headerIcon = iconName;

			await actualElement.updateComplete;

			const headerIconElement = actualElement.shadowRoot.querySelector('header vwc-icon');

			expect(headerIconElement.type)
				.to
				.equal(iconName);
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

			expect(attributeValue)
				.to
				.equal(iconName);
			expect(actualElement.headerIcon)
				.to
				.equal(differentIconName);
		});

		it(`should not render the icon if no icon is present`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerIconElement = actualElement.shadowRoot.querySelector('header slot vwc-icon');

			expect(headerIconElement)
				.to
				.equal(null);
		});
	});

	describe(`heading`, function () {
		const headingText = 'This is the heading';

		it(`should set the heading according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} heading="${headingText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('.vwc-card-title');

			expect(headerElement.innerText)
				.to
				.equal(headingText);
		});

		it(`should set the heading according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.heading = headingText;

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('.vwc-card-title');

			expect(headerElement.innerText)
				.to
				.equal(headingText);
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

			expect(attributeValue)
				.to
				.equal(headingText);
			expect(actualElement.heading)
				.to
				.equal(differentText);
		});
	});

	describe(`subtitle`, function () {
		const subtitleText = 'This is the subtitle';

		it(`should set the subtitle according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} subtitle="${subtitleText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const subtitleElement = actualElement.shadowRoot.querySelector('.vwc-card-subtitle');


			expect(subtitleElement.innerText)
				.to
				.equal(subtitleText);
		});

		it(`should set the subtitle according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.subtitle = subtitleText;

			await actualElement.updateComplete;

			const subtitleElement = actualElement.shadowRoot.querySelector('.vwc-card-subtitle');

			expect(subtitleElement.innerText)
				.to
				.equal(subtitleText);
		});

		it(`should reflect the subtitle property and attribute`, async function () {
			const differentText = 'Diff';

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.subtitle = subtitleText;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('subtitle');

			actualElement.setAttribute('subtitle', differentText);

			expect(attributeValue)
				.to
				.equal(subtitleText);
			expect(actualElement.subtitle)
				.to
				.equal(differentText);
		});
	});

	describe(`supportingText`, function () {
		const supportingText = 'This is the supporting text';

		it(`should set the supporting according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} supporting-text="${supportingText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const supportingElement = actualElement.shadowRoot.querySelector('.vwc-card-supportText');


			expect(supportingElement.innerText)
				.to
				.equal(supportingText);
		});

		it(`should set the supporting according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.supportingText = supportingText;

			await actualElement.updateComplete;

			const supportingTextElement = actualElement.shadowRoot.querySelector('.vwc-card-supportText');

			expect(supportingTextElement.innerText)
				.to
				.equal(supportingText);
		});

		it(`should reflect the supporting property and attribute`, async function () {
			const differentText = 'Diff';

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.supportingText = supportingText;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('supporting-text');

			actualElement.setAttribute('supporting-text', differentText);

			expect(attributeValue)
				.to
				.equal(supportingText);
			expect(actualElement.supportingText)
				.to
				.equal(differentText);
		});
	});

	describe(`actions`, function () {
		const headingText = 'This is the heading';

		it(`should not be displayed if actions slot is empty`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const actionsElement = actualElement.shadowRoot.querySelector('.vwc-card-actions');


			expect(actionsElement.classList.contains('no-content'))
				.to
				.equal(true);
		});

		it(`should be displayed if slotted actions exist`, async function () {
			async function waitForSlotChangeUpdate() {
				await waitNextTask();

				await actualElement.updateComplete;
			}

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content<div slot="actions"></div></${COMPONENT_NAME}>`)
			);

			await waitForSlotChangeUpdate();

			const actionsElement = actualElement.shadowRoot.querySelector('.vwc-card-actions');

			expect(actionsElement.classList.contains('no-content'))
				.to
				.equal(false);
		});
	});
});
