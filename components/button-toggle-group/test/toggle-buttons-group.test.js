import { VALID_BUTTON_ELEMENTS } from '../vwc-button-toggle-group.js';

import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-button-toggle-group';
const SELECTED_EVENT_NAME = 'selected';

describe('Toggle-buttons-group', () => {
	function waitForSlotChange() {
		return waitNextTask();
	}

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

	describe(`selected`, function () {
		let actualElement;

		beforeEach(function () {
			[actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
<${VALID_BUTTON_ELEMENTS[0]} layout="filled" value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} layout="filled" value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
		});

		it(`should have the filled attribute when selected`, async function () {
			actualElement.children[1].click();
			await actualElement.updateComplete;

			expect(actualElement.children[0].getAttribute('layout'), 'non selected cannot be filled').not.to.equal('filled');
			expect(actualElement.children[1].getAttribute('layout'), 'selected must be filled').to.equal('filled');
			expect(actualElement.children[2].getAttribute('layout'), 'non selected cannot be filled').not.to.equal('filled');
		});

		it(`should remove the filled attribute when unselected`, async function () {
			actualElement.children[0].click();
			await actualElement.updateComplete;

			const filledBeforeUnselect = actualElement.children[0].getAttribute('layout') === 'filled';

			actualElement.children[1].click();
			await actualElement.updateComplete;

			const filledAfterUnselect =  actualElement.children[0].hasAttribute('layout');

			const newSelectedFilled = actualElement.children[1].getAttribute('layout') === 'filled';

			expect(filledBeforeUnselect).to.equal(true);
			expect(filledAfterUnselect).to.equal(false);
			expect(newSelectedFilled).to.equal(true);
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

		it(`should set the elements in the array as the last button that was clicked`, function () {
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

		it(`should return an empty array if none is selected`, function () {
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

		it(`should set the last button that was clicked in the selected array`, function () {
			actualElement.children[1].click();
			actualElement.children[2].click();

			expect(actualElement.values.length)
				.to
				.equal(1);
			expect(actualElement.values[0])
				.to
				.equal(buttonValues[2]);
		});

		it(`should set the group's state according to set values`, async function () {
			const oldValues = actualElement.values;
			actualElement.values = [buttonValues[0], buttonValues[2]];
			await actualElement.updateComplete;
			const newValues = actualElement.selected;
			expect(oldValues.length)
				.to
				.equal(0);
			expect(newValues.length)
				.to
				.equal(1);
			expect(newValues[0].getAttribute('value'))
				.to
				.equal(buttonValues[0]);
		});

		it('should return empty values array when set to null', async function() {
			const emptyValues = [];
			actualElement.multi = true;
			actualElement.values = [buttonValues[0], buttonValues[2]];
			await actualElement.updateComplete;
			actualElement.values = null;
			await actualElement.updateComplete;
			expect(actualElement.values.length).to.equal(0);
			expect(actualElement.selected.length).to.equal(0);
		});

		it('should return empty values array when set to []', async function() {
			const emptyValues = [];
			actualElement.multi = true;
			actualElement.values = [buttonValues[0], buttonValues[2]];
			await actualElement.updateComplete;
			actualElement.values = [];
			expect(actualElement.values.length).to.equal(0);
			expect(actualElement.selected.length).to.equal(0);
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
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[0]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[1]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[1]} value="${buttonValues[2]}">BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;
		});

		it(`should listen to click event of dynamically assigned valid element`, async function () {
			const element = document.createElement(VALID_BUTTON_ELEMENTS[0]);
			element.setAttribute('value', '22');
			actualElement.appendChild(element);
			await waitForSlotChange();
			element.click();
			expect(actualElement.values[0])
				.to
				.equal('22');
		});

		it(`should apply the right state to a dynamically added element`, async function () {
			actualElement.values = ['22'];
			const element = document.createElement(VALID_BUTTON_ELEMENTS[0]);
			element.setAttribute('value', '22');
			actualElement.appendChild(element);
			await waitForSlotChange();
			expect(actualElement.selected[0].getAttribute('value')).to.equal('22');
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
			return addElement(textToDomToParent(`<${COMPONENT_NAME} ${props.join(' ')}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenProps[0].join(' ')}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenProps[1].join(' ')}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]} ${childrenProps[2].join(' ')}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[1]} ${childrenProps[3].join(' ')}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`));
		}

		it(`should prepopulate the values according to set selected buttons`, async function () {
			const [actualElement] = (generateTemplate(['multi'],
				[
					['selected', 'value="1"'],
					[],
					['selected', 'value="2"'],
					['selected', 'value="3"']
				]));

			expect(JSON.stringify(actualElement.values)).to.equal(JSON.stringify(['1', '2', '3']));
		});

		it(`should leave last selection on click`, async function () {
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

		it(`should deselect an active element when clicked`, async function () {
			const [actualElement] = (generateTemplate(['required', 'multi'],
				[['selected'], [], [], []]));
			await actualElement.updateComplete;
			const selectedButton = actualElement.children[1];

			selectedButton.click();
			await actualElement.updateComplete;
			selectedButton.click();
			await actualElement.updateComplete;

			expect(selectedButton.hasAttribute('selected')).to.equal(false);
		});

		it(`should leave the last selection when button preselected`, async function () {
			const [actualElement] = (generateTemplate(['required', 'multi'],
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

		it(`should prevent event emit if unselect is not available`, async function () {
			const [actualElement] = (generateTemplate(['required', 'multi', 'dense'],
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
		async function createDisabledElement() {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} disabled>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
<${VALID_BUTTON_ELEMENTS[0]}>BUTTON</${VALID_BUTTON_ELEMENTS[0]}>
</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;
			return actualElement;
		}

		it(`should set 'disabled' property to dynamically added children`, async function () {
			const actualElement = await createDisabledElement();
			const element = document.createElement(VALID_BUTTON_ELEMENTS[0]);
			actualElement.appendChild(element);
			await waitForSlotChange();
			expect(element.hasAttribute('disabled')).to.equal(true);
		});

		it(`should set 'disabled' property on all children when disabled`, async function () {
			async function enableElement() {
				actualElement.removeAttribute('disabled');
				await actualElement.updateComplete;
			}

			async function disableElement() {
				actualElement.setAttribute('disabled', '');
				await actualElement.updateComplete;
			}

			function checkIfChildrenDisabled() {
				return [...actualElement.children].reduce((areAllDisabled, childNode) => (areAllDisabled && childNode.hasAttribute('disabled')), true);
			}

			const actualElement = await createDisabledElement();
			const initializedWithDisabled = checkIfChildrenDisabled();

			await enableElement();
			const removedDisabledFromChildrenAfterEnable = !checkIfChildrenDisabled();

			await disableElement();
			const addDisabledDynamically = checkIfChildrenDisabled();

			expect(initializedWithDisabled, `Children not disabled on initialization`)
				.to
				.equal(true);

			expect(removedDisabledFromChildrenAfterEnable, `Children are still disabled after removing disabled property`)
				.to
				.equal(true);

			expect(addDisabledDynamically, `Children not disabled after disabling the group`)
				.to
				.equal(true);
		});
	});
});
