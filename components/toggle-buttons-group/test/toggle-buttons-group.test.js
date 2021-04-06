import '../vwc-toggle-buttons-group.js';
import { VALID_BUTTON_ELEMENTS } from '../vwc-toggle-buttons-group';

import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-toggle-buttons-group';
const SELECTED_EVENT_NAME = 'selected';

function listenToToggleEvent(element, callback) {
	element.addEventListener(SELECTED_EVENT_NAME, callback);
}

describe.only('Toggle-buttons-group', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});

	it(`should set click listeners on the buttons`, function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
		);
		let clickIndex = 0;
		actualElement.addEventListener(SELECTED_EVENT_NAME, () => {
			clickIndex++;
		});
		const buttons = actualElement.children;
		buttons.forEach((button, index) => {
			button.click();
			expect(index)
				.to
				.equal(clickIndex - 1);
		});
	});

	it(`should set click listeners only for valid button elements`, function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>
								<div>BUTTON</div>
								<div>BUTTON</div>
								<div>BUTTON</div>
								<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
								</${COMPONENT_NAME}>
		`));

		let clickIndex = 0;
		actualElement.addEventListener(SELECTED_EVENT_NAME, () => {
			clickIndex++;
		});
		const buttons = actualElement.children;
		buttons.forEach((button, index) => {
			button.click();
		});
		expect(clickIndex)
			.to
			.equal(1);
	});

	it(`should send the value of the clicked button and the toggle state in the event`, function () {
		const buttonValue = 'button value';

		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValue}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
		);
		let eventData = {};
		actualElement.addEventListener(SELECTED_EVENT_NAME, (event) => {
			eventData = event.detail
		});
		const button = actualElement.children[0];
		button.click();
		expect(eventData.toggled.activeIndex).to.equal(0);
		expect(eventData.toggled.active).to.equal(true);
		button.click();
		expect(eventData.toggled.activeIndex).to.equal(0);
		expect(eventData.toggled.active).to.equal(false);
	});

	it(`should send the state of the group in the event`, function () {
		const buttonValues = [
			'11', '12', '13'
		];

		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
		);

		let eventData = {};
		actualElement.addEventListener(SELECTED_EVENT_NAME, (event) => {
			eventData = event.detail
		});

		const button = actualElement.children[1];

		button.click();
		eventData.state.forEach((state, index) => {
			expect(state.index).to.equal(index);
			expect(state.value).to.equal(buttonValues[index]);
			expect(state.active).to.equal(index === 1);
		});

		button.click();
		eventData.state.forEach((state, index) => {
			expect(state.index).to.equal(index);
			expect(state.value).to.equal(buttonValues[index]);
			expect(state.active).to.equal(false);
		});
	});
});
