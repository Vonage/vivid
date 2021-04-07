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

	describe(`values`, function () {
		let actualElement;

		const buttonValues = [
			Math.random().toString(),
			Math.random().toString(),
			Math.random().toString(),
		];

		beforeEach(function () {
			[actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
		});

		it(`should return the an empty array if none is selected`, function () {
			const button = actualElement.children[1];

			expect(actualElement.values.length).to.equal(0);

		});

		it(`should return an array with the selected value`, function () {
			actualElement.children[1].click();

			expect(actualElement.values.length).to.equal(1);
			expect(actualElement.values[0]).to.equal(buttonValues[1]);
		});

		it(`should set the value in the array of the last button that was clicked`, function () {
			actualElement.children[1].click();
			actualElement.children[2].click();

			expect(actualElement.values.length).to.equal(1);
			expect(actualElement.values[0]).to.equal(buttonValues[2]);
		});

		it(`should set the group's state according to set values`, function () {
			const oldValues = actualElement.values;
			actualElement.values = [buttonValues[0], buttonValues[2]];
			const newValues = actualElement.values;
			expect(oldValues.length).to.equal(0);
			expect(newValues.length).to.equal(2);
			expect(newValues[0]).to.equal(buttonValues[0]);
			expect(newValues[1]).to.equal(buttonValues[2]);
		});
	});


	it(`should `, function () {

	});
});
