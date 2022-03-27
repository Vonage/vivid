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

	describe(`icon`, function () {
		const iconName = 'home';

		it(`should set the icon according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} icon="${iconName}">Content</${COMPONENT_NAME}>`)
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

			actualElement.icon = iconName;

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

			actualElement.icon = iconName;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('icon');

			actualElement.setAttribute('icon', differentIconName);

			await actualElement.updateComplete;

			expect(attributeValue)
				.to
				.equal(iconName);
			expect(actualElement.icon)
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
				textToDomToParent(`<${COMPONENT_NAME} text="${supportingText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const textElement = actualElement.shadowRoot.querySelector('.vwc-card-text');


			expect(textElement.innerText)
				.to
				.equal(supportingText);
		});

		it(`should set the supporting according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.text = supportingText;

			await actualElement.updateComplete;

			const supportingTextElement = actualElement.shadowRoot.querySelector('.vwc-card-text');

			expect(supportingTextElement.innerText)
				.to
				.equal(supportingText);
		});

		it(`should reflect the supporting property and attribute`, async function () {
			const differentText = 'Diff';

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.text = supportingText;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('text');

			actualElement.setAttribute('text', differentText);

			expect(attributeValue)
				.to
				.equal(supportingText);
			expect(actualElement.text)
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

			const footerElement = actualElement.shadowRoot.querySelector('.vwc-card-footer');


			expect(footerElement.classList.contains('no-content'))
				.to
				.equal(true);
		});

		it(`should be displayed if slotted footer exist`, async function () {
			async function waitForSlotChangeUpdate() {
				await waitNextTask();

				await actualElement.updateComplete;
			}

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content<div slot="footer"></div></${COMPONENT_NAME}>`)
			);

			await waitForSlotChangeUpdate();

			const footerElement = actualElement.shadowRoot.querySelector('.vwc-card-footer');

			expect(footerElement.classList.contains('no-content'))
				.to
				.equal(false);
		});
	});
});
