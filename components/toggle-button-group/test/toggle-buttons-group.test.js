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
		function createElement(sizeProperty, childrenSizeProps = ['', '', '']) {
			return addElement(
				textToDomToParent(`<${COMPONENT_NAME} ${sizeProperty}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenSizeProps[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenSizeProps[1]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenSizeProps[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
		}

		function checkSizeProperty(actualElement, sizeProperty, exists = true) {
			[...actualElement.children].forEach((childNode, i) => expect(childNode.hasAttribute(sizeProperty), `Failed to test ${sizeProperty} index ${i}`)
				.to
				.equal(exists));
		}

		it(`should set every button size to dense if dense is set`, function () {
			const [actualElement] = createElement('dense');

			checkSizeProperty(actualElement, 'dense');
		});

		it(`should set every button size to enlarged if enlarged is set`, function () {
			const [actualElement] = createElement('enlarged');

			checkSizeProperty(actualElement, 'enlarged');
		});

		it(`should remove enlarged and dense if none is declared`, function () {
			const [actualElement] = createElement('', ['enlarged', 'dense', 'enlarged']);

			checkSizeProperty(actualElement, 'enlarged', false);
			checkSizeProperty(actualElement, 'dense', false);
		});

		it(`should remove enlarged if dense is declared`, function () {
			const [actualElement] = createElement('dense', ['enlarged', 'enlarged']);

			checkSizeProperty(actualElement, 'enlarged', false);
			checkSizeProperty(actualElement, 'dense', true);
		});

		it(`should remove dense if enlarged is declared`, async function () {
			const [actualElement] = createElement('dense');

			await actualElement.updateComplete;
			actualElement.enlarged = true;
			await actualElement.updateComplete;
			await waitNextTask();

			checkSizeProperty(actualElement, 'enlarged', true);
			checkSizeProperty(actualElement, 'dense', false);
		});

		it(`should change the size if changed dynamically`, async function () {
			const [actualElement] = createElement('enlarged', ['enlarged', 'dense']);

			actualElement.dense = true;
			await actualElement.updateComplete;
			await waitNextTask();

			checkSizeProperty(actualElement, 'dense', true);
		});
	});

	describe(`Mandatory Selection`, function () {
		function generateTemplate(props = [], childrenProps = [[], [], [], []]) {
			return textToDomToParent(`<${COMPONENT_NAME} ${props.join(' ')}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenProps[0].join(' ')} layout="filled">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenProps[1].join(' ')} layout="filled">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenProps[2].join(' ')} layout="filled">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[1]} ${childrenProps[3].join(' ')} layout="filled">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`);
		}

		it(`should not cancel the last selection`, async function () {
			const [actualElement] = (generateTemplate(['required', 'multi']));

			await actualElement.updateComplete;

			const valuesBeforeClick = actualElement.selected.length;
			const selectedButton = actualElement.children[0];
			selectedButton.click();
			const valueAfterClick = actualElement.selected[0];
			selectedButton.click();

			expect(valueAfterClick, 'Button not selected!')
				.to
				.equal(selectedButton);

			expect(valuesBeforeClick)
				.to
				.equal(0);

			expect(actualElement.selected[0], 'Button should not be deselected!')
				.to
				.equal(selectedButton);
		});

		it(`should not cancel the last selection`, async function () {
			const [actualElement] = addElement(generateTemplate(['required', 'multi'],
				[['selected'], [], [], []]));

			await actualElement.updateComplete;

			const valuesBeforeClick = actualElement.selected.length;
			const selectedButton = actualElement.children[0];
			const valueBeforeClick = actualElement.selected[0];
			selectedButton.click();

			expect(valueBeforeClick, 'Button not selected!')
				.to
				.equal(selectedButton);

			expect(valuesBeforeClick)
				.to
				.equal(1);

			expect(actualElement.selected[0], 'Button should not be deselected!')
				.to
				.equal(selectedButton);
		});

		it(`should not send an event if not canceling`, async function () {
			const [actualElement] = addElement(generateTemplate(['required', 'multi'],
				[['selected'], [], [], []]));

			await actualElement.updateComplete;

			let eventFired = false;
			actualElement.addEventListener(SELECTED_EVENT_NAME, () => {
				eventFired = true;
			});

			const selectedButton = actualElement.children[0];
			selectedButton.click();

			expect(eventFired)
				.to
				.equal(false);
		});
	});

	describe(`a11y`, function () {
		it(`should set 'disabled' property on all children when disabled`, async function () {
			function checkIfChildrenDisabled() {
				return [...actualElement.children].reduce((areAllDisabled, childNode) => (areAllDisabled && childNode.hasAttribute('disabled')), true);
			}

			const [actualElement] = (
				textToDomToParent(`<${COMPONENT_NAME} disabled>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const initializedWithDisabled = checkIfChildrenDisabled();

			actualElement.removeAttribute('disabled');
			await actualElement.updateComplete;

			const removedDisabled = !checkIfChildrenDisabled();

			actualElement.setAttribute('disabled', '');
			await actualElement.updateComplete;

			const addDisabledDynamically = checkIfChildrenDisabled();

			expect(initializedWithDisabled)
				.to
				.equal(true);
			expect(removedDisabled)
				.to
				.equal(true);
			expect(addDisabledDynamically)
				.to
				.equal(true);
		});
	});
});
