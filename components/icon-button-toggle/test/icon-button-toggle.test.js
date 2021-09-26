import '../vwc-icon-button-toggle.js';
import { waitNextTask, textToDomToParent } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers.js';
import { shapeCircledTestCases, shapeRoundedTestCases, sizingTestCases } from '../../../test/shared.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-icon-button-toggle';

describe('icon button toggle', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				`${COMPONENT_NAME} element is not defined`
			)
		);
	});

	it('should have internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});

	describe('sizing', () => {
		sizingTestCases(COMPONENT_NAME);
	});

	describe('shape', () => {
		shapeRoundedTestCases(COMPONENT_NAME);
		shapeCircledTestCases(COMPONENT_NAME);
	});

	describe(`toggle mode`, function () {
		it(`should set "on" property when clicked`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const hasOnOnStartup = actualElement.hasAttribute('on');

			actualElement.click();

			expect(hasOnOnStartup)
				.to
				.equal(false);

			await actualElement.updateComplete;

			expect(actualElement.hasAttribute('on'))
				.to
				.equal(true);
		});

		it(`should remove "on" property when clicked`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} on></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const hasOnOnStartup = actualElement.hasAttribute('on');

			actualElement.click();

			expect(hasOnOnStartup)
				.to
				.equal(true);

			await actualElement.updateComplete;

			expect(actualElement.hasAttribute('on'))
				.to
				.equal(false);
		});

		it(`should reflect the "on" attribute`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} on></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const hasOnOnStartup = actualElement.on;

			actualElement.on = false;
			await waitNextTask();
			const hasOnWhenPropFalse = actualElement.hasAttribute('on');

			actualElement.on = true;
			await waitNextTask();
			const hasOnWhenPropTrue = actualElement.hasAttribute('on');

			expect(hasOnOnStartup)
				.to
				.equal(true);

			expect(hasOnWhenPropFalse)
				.to
				.equal(false);

			expect(hasOnWhenPropTrue)
				.to
				.equal(true);
		});

		const getIconDisplayValue = (icon, el) => {
			const iconHome = el.shadowRoot.querySelector(`vwc-icon[type="${icon}"]`);
			const iconHomeWrapper = iconHome.closest('.mdc-icon-button__icon');
			const { display } = globalThis.getComputedStyle(iconHomeWrapper);
			return display;
		};

		it(`should display onicon when state is "on"`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} onicon="home-solid" officon="home-line"></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			actualElement.on = true;
			await actualElement.updateComplete;

			expect(getIconDisplayValue('home-solid', actualElement)).to.equal('block');
			expect(getIconDisplayValue('home-line', actualElement)).to.equal('none');
		});

		it(`should set officon when state is "off"`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} onicon="home-solid" officon="home-line"></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			expect(getIconDisplayValue('home-solid', actualElement)).to.equal('none');
			expect(getIconDisplayValue('home-line', actualElement)).to.equal('block');
		});

		it(`should emit an event with the right state`, async function () {
			let eventsDetails = [];

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} onicon="home" officon="hotel" on></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.addEventListener('icon-button-toggle-change', e => eventsDetails.push(e.detail.isOn));

			actualElement.click();
			actualElement.click();

			expect(eventsDetails[0])
				.to
				.equal(false);
			expect(eventsDetails[1])
				.to
				.equal(true);
		});
	});
});
