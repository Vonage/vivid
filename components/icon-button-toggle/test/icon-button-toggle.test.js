import '../vwc-icon-button-toggle.js';
import { waitNextTask, textToDomToParent } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { shapeCircledTestCases, shapeRoundedTestCases, sizingTestCases } from '../../../test/shared';
import { connotationTestCases } from '@vonage/vwc-button/test/button.connotation.test';

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

	describe('icon button connotation', () => {
		connotationTestCases(COMPONENT_NAME);
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

		it(`should set onicon when state is "on"`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} onicon="home"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			actualElement.on = true;
			await waitNextTask();

			expect(actualElement.getAttribute('icon'))
				.to
				.equal('home');
		});

		it(`should set officon when state is "off"`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} onicon="home" officon="hotel" on></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			expect(actualElement.getAttribute('icon'))
				.to
				.equal('home');

			actualElement.on = false;
			await waitNextTask();

			expect(actualElement.getAttribute('icon'))
				.to
				.equal('hotel');
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
