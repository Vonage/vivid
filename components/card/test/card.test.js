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

	describe(`heading`, function () {
		const headingText = 'This is the heading';

		it(`should not render the icon if no icon is present`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerIconElement = actualElement.shadowRoot.querySelector('header slot vwc-icon');

			expect(headerIconElement).to.equal(null);
		});

		it(`should not be displayed if heading, icon and badge are missing`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('header');

			expect(headerElement.classList.contains('no-header-content')).to.equal(true);
		});

		it(`should be displayed if slotted content exists even without heading, icon and badge`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content<div slot="header-icon"></div></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('header');

			expect(headerElement.classList.contains('no-header-content')).to.equal(false);
		});

		it(`should set the heading according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} heading="${headingText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('.vwc-card-header-text');

			expect(headerElement.innerText).to.equal(headingText);
		});

		it(`should set the heading according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.heading = headingText;

			await actualElement.updateComplete;

			const headerElement = actualElement.shadowRoot.querySelector('.vwc-card-header-text');

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

	describe(`actions`, function () {
		const headingText = 'This is the heading';

		it(`should not be displayed if actions slot is empty`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const actionsElement = actualElement.shadowRoot.querySelector('.vwc-card-actions');


			expect(actionsElement.classList.contains('no-actions-content')).to.equal(true);
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

			expect(actionsElement.classList.contains('no-actions-content')).to.equal(false);
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

	describe(`badge-content`, function () {
		const badgeText = 'home';

		it(`should set the badge according to the attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} badge-content="${badgeText}">Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerBadgeElement = actualElement.shadowRoot.querySelector('header vwc-badge');

			expect(headerBadgeElement.textContent).to.equal(badgeText);
		});

		it(`should set the badge according to the property`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.badgeContent = badgeText;

			await actualElement.updateComplete;

			const headerBadgeElement = actualElement.shadowRoot.querySelector('header vwc-badge');

			expect(headerBadgeElement.textContent).to.equal(badgeText);
		});

		it(`should reflect the badge property and attribute`, async function () {
			const differentBadgeText = 'share';

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			actualElement.badgeContent = badgeText;

			await actualElement.updateComplete;

			const attributeValue = actualElement.getAttribute('badge-content');

			actualElement.setAttribute('badge-content', differentBadgeText);

			await actualElement.updateComplete;

			expect(attributeValue).to.equal(badgeText);
			expect(actualElement.badgeContent).to.equal(differentBadgeText);
		});

		it(`should show no badge if badge-content is falsy or empty`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			const headerBadgeElement = actualElement.shadowRoot.querySelector('header vwc-badge');

			expect(headerBadgeElement).to.equal(null);
		});
	});
});
