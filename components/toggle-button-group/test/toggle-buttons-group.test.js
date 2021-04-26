import '../vwc-toggle-button-group.js';
import { VALID_BUTTON_ELEMENTS } from '../vwc-toggle-button-group';

import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-toggle-button-group';
const SELECTED_EVENT_NAME = 'selected';
const GROUP_BUTTON_ATTRIBUTE = 'group-button';

describe('Toggle-buttons-group', () => {
	const buttonValues = [
		Math.random()
			.toString(),
		Math.random()
			.toString(),
		Math.random()
			.toString(),
	];
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

	it(`should add group-button attr to group buttons`, function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
		);

		const buttons = actualElement.children;
		buttons.forEach((button, index) => {
			expect(button.hasAttribute(GROUP_BUTTON_ATTRIBUTE))
				.to
				.equal(true);
		});
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
		`)
		);

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

	it(`should set layout filled for all child buttons`, function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
		);

		[...actualElement.children].forEach(childNode => expect(childNode.getAttribute('layout'))
			.to
			.equal('filled'));
	});

	describe(`selected`, function () {
		let actualElement;

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
			expect(actualElement.selected.length)
				.to
				.equal(0);
		});

		it(`should return an array with the selected element`, function () {
			actualElement.children[1].click();

			expect(actualElement.selected.length)
				.to
				.equal(1);
			expect(actualElement.selected[0])
				.to
				.equal(actualElement.children[1]);
		});

		it(`should set the elements in the array of the last button that was clicked`, function () {
			actualElement.children[1].click();
			actualElement.children[2].click();

			expect(actualElement.selected.length)
				.to
				.equal(1);
			expect(actualElement.selected[0])
				.to
				.equal(actualElement.children[2]);
		});
	});

	describe(`values`, function () {
		let actualElement;


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
			expect(actualElement.values.length)
				.to
				.equal(0);
		});

		it(`should return an array with the selected value`, function () {
			actualElement.children[1].click();

			expect(actualElement.values.length)
				.to
				.equal(1);
			expect(actualElement.values[0])
				.to
				.equal(buttonValues[1]);
		});

		it(`should set the value in the array of the last button that was clicked`, function () {
			actualElement.children[1].click();
			actualElement.children[2].click();

			expect(actualElement.values.length)
				.to
				.equal(1);
			expect(actualElement.values[0])
				.to
				.equal(buttonValues[2]);
		});

		it(`should set the group's state according to set values`, function () {
			const oldValues = actualElement.values;
			actualElement.values = [buttonValues[0], buttonValues[2]];
			const newValues = actualElement.values;
			expect(oldValues.length)
				.to
				.equal(0);
			expect(newValues.length)
				.to
				.equal(1);
			expect(newValues[0])
				.to
				.equal(buttonValues[0]);
		});
	});

	describe(`multi`, function () {
		let actualElement;

		beforeEach(function () {
			[actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} multi>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
		});

		it(`should set the value in the array of the last button that was clicked`, function () {
			actualElement.children[1].click();
			actualElement.children[2].click();

			expect(actualElement.values.length)
				.to
				.equal(2);
			expect(actualElement.values[0])
				.to
				.equal(buttonValues[1]);
			expect(actualElement.values[1])
				.to
				.equal(buttonValues[2]);
		});

		it(`should set the group's state according to set values`, function () {
			const oldValues = actualElement.values;
			actualElement.values = [buttonValues[0], buttonValues[2]];
			const newValues = actualElement.values;
			expect(oldValues.length)
				.to
				.equal(0);
			expect(newValues.length)
				.to
				.equal(2);
			expect(newValues[0])
				.to
				.equal(buttonValues[0]);
			expect(newValues[1])
				.to
				.equal(buttonValues[2]);
		});

		it(`should return an array with the selected elements`, function () {
			actualElement.children[1].click();
			actualElement.children[0].click();
			actualElement.children[2].click();
			actualElement.children[0].click();

			expect(actualElement.selected.length)
				.to
				.equal(2);
			expect(actualElement.selected[0])
				.to
				.equal(actualElement.children[1]);
			expect(actualElement.selected[1])
				.to
				.equal(actualElement.children[2]);
		});
	});

	describe(`dynamically assigned elements`, function () {
		let actualElement;

		beforeEach(async function () {
			[actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} multi>
<${VALID_BUTTON_ELEMENTS[0]} layout="filled" value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} layout="filled" value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} layout="filled" value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[1]} layout="filled" value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;
		});

		function waitForSlotChange() {
			return waitNextTask();
		}

		it(`should listen to click event of dynamically assigned valid element`, async function () {
			const element = document.createElement(VALID_BUTTON_ELEMENTS[0]);
			element.setAttribute('value', '22');
			element.setAttribute('layout', 'filled');
			actualElement.appendChild(element);
			await waitForSlotChange();
			element.click();
			expect(actualElement.values[0])
				.to
				.equal('22');
		});
	});

	describe(`size`, function () {
		function createElement(sizeProperty) {
			return addElement(
				textToDomToParent(`<${COMPONENT_NAME} ${sizeProperty}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
		}

		it(`should set every button size to dense if dense is set`, function () {
			const [actualElement] = createElement('dense');

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('dense'))
				.to
				.equal(true));
		});

		it(`should set every button size to enlaeged if enlarged is set`, function () {
			const [actualElement] = createElement('enlarged');

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('enlarged'))
				.to
				.equal(true));
		});

		it(`should remove enlarged and dense if none is declared`, function () {
			const [actualElement] = createElement('');

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('enlarged'))
				.to
				.equal(false));

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('dense'))
				.to
				.equal(false));
		});

		it(`should remove enlarged if dense is declared`, function () {
			const [actualElement] = createElement('dense');

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('enlarged'))
				.to
				.equal(false));

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('dense'))
				.to
				.equal(true));
		});

		it(`should remove dense if enlarged is declared`, function () {
			const [actualElement] = createElement('dense');

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('enlarged'))
				.to
				.equal(false));

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('dense'))
				.to
				.equal(true));
		});

		it(`should change the size if changed dynamically`, async function () {
			const [actualElement] = createElement('enlarged');

			actualElement.dense = true;
			await actualElement.updateComplete;
			await waitNextTask();

			[...actualElement.children].forEach(childNode => expect(childNode.hasAttribute('dense'))
				.to
				.equal(true));
		});
	});
});
