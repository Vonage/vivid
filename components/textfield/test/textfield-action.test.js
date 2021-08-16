import { VALID_BUTTON_ELEMENTS } from '../vwc-textfield.js';

import {
	waitNextTask,
	textToDomToParent, isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';


chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

describe('textfield action', () => {
	const addElement = isolatedElementsCreation();
	const [iconButton] = VALID_BUTTON_ELEMENTS;

	function getInternalButtons(element) {
		return Array.from(element.querySelectorAll(iconButton));
	}

	async function createElement() {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<${iconButton} slot="action"></${iconButton}>
					<${iconButton} slot="action"></${iconButton}>
					<${iconButton} slot="action"></${iconButton}>
				</${COMPONENT_NAME}>
			`)
		);
		await actualElement.updateComplete;
		return actualElement;
	}

	it(`should enforce disable on child nodes`, async function () {
		const actualElement = await createElement();
		actualElement.disabled = true;
		await waitNextTask();
		const buttons = Array.from(actualElement.querySelectorAll(iconButton));

		const allDisabled = buttons.every(button => button.disabled);

		actualElement.disabled = false;
		await waitNextTask();
		const allEnabled = buttons.every(button => !button.disabled);

		expect(allDisabled, `Child nodes are not disabled on initialization`)
			.to
			.equal(true);

		expect(allEnabled, `Child nodes are not enabled on change`)
			.to
			.equal(true);
	});

	it(`should enforce shape on child nodes`, async function () {
		const actualElement = await createElement();
		actualElement.shape = 'pill';
		await waitNextTask();
		const buttons = Array.from(actualElement.querySelectorAll(iconButton));

		const allCircled = buttons.every(button => button.shape === 'circled');

		actualElement.shape = 'rounded';
		await waitNextTask();
		const allRounded = buttons.every(button => button.shape === 'rounded');

		expect(allCircled, `Child nodes are not shaped properly on initialization`)
			.to
			.equal(true);

		expect(allRounded, `Child nodes are not shaped properly on change`)
			.to
			.equal(true);
	});

	it(`should enforce density on child nodes`, async function () {
		const actualElement = await createElement();
		actualElement.dense = true;
		await waitNextTask();
		const buttons = Array.from(actualElement.querySelectorAll(iconButton));

		const allDense = buttons.every(button => button.dense === true);

		actualElement.dense = false;
		await waitNextTask();
		const allNormal = buttons.every(button => button.dense === false);

		expect(allDense, `Child nodes are not sized properly on initialization`)
			.to
			.equal(true);

		expect(allNormal, `Child nodes are not sized properly on change`)
			.to
			.equal(true);
	});

	it(`should disable dynamically added child node's`, async function () {
		const actualElement = await createElement();
		const newIconButton = document.createElement(iconButton);
		newIconButton.setAttribute('slot', 'action');
		actualElement.appendChild(newIconButton);

		actualElement.disabled = true;
		await waitNextTask();
		expect(newIconButton.disabled)
			.to
			.equal(true);
	});

	it(`should shape dynamically added child node's`, async function () {
		const actualElement = await createElement();
		const newIconButton = document.createElement(iconButton);
		newIconButton.setAttribute('slot', 'action');
		actualElement.appendChild(newIconButton);

		actualElement.shape = 'rounded';
		await waitNextTask();
		expect(newIconButton.shape)
			.to
			.equal('rounded');

		actualElement.shape = 'pill';
		await waitNextTask();
		expect(newIconButton.shape)
			.to
			.equal('circled');
	});

	it(`should set density dynamically to added child node's`, async function () {
		const actualElement = await createElement();
		const newIconButton = document.createElement(iconButton);
		newIconButton.setAttribute('slot', 'action');
		actualElement.appendChild(newIconButton);

		actualElement.dense = true;
		await waitNextTask();
		expect(newIconButton.dense)
			.to
			.equal(true);

		actualElement.dense = false;
		await waitNextTask();
		expect(newIconButton.dense)
			.to
			.equal(false);
	});

	describe(`noActionsSync`, function () {
		function getButtonsDisabledStates(actualElement) {
			const buttons = getInternalButtons(actualElement);
			return buttons.map(button => button.disabled);
		}

		function setElementAttributes(actualElement) {
			actualElement.disabled = true;
			actualElement.shape = 'pill';
			actualElement.toggleAttribute('dense', true);
		}

		function createElementWithIconButtons() {
			const [actualElement] = addElement(
				textToDomToParent(`
				<${COMPONENT_NAME}>
					<${iconButton} slot="action" disabled shape="circled"></${iconButton}>
					<${iconButton} slot="action" shape="pilled" dense></${iconButton}>
					<${iconButton} slot="action" disabled enlarged></${iconButton}>
				</${COMPONENT_NAME}>
			`)
			);
			return actualElement;
		}

		let actualElement;

		beforeEach(async function () {
			actualElement = createElementWithIconButtons();
			actualElement.noActionsSync = true;
			await waitNextTask();
			await actualElement.updateComplete;
		});

		it(`should not enforce disabled on child nodes`, async function () {
			const expectedButtonsDisabled = [true, false, true];
			const buttonsDisabledBefore = getButtonsDisabledStates(actualElement);
			actualElement.disabled = true;

			await waitNextTask();
			await actualElement.updateComplete;

			const buttonsDisabledAfter = getButtonsDisabledStates(actualElement);

			expectedButtonsDisabled.forEach((val, index) => {
				expect(val)
					.to
					.equal(buttonsDisabledBefore[index]);
				expect(val)
					.to
					.equal(buttonsDisabledAfter[index]);
			});
		});

		it(`should not dynamically enforce disabled on child nodes`, async function () {
			function generateNewButton() {
				const newButtonWrapper = document.createElement('div');
				newButtonWrapper.innerHTML = `<${iconButton} slot="action" shape="circled" enlarged></${iconButton}>`;
				return newButtonWrapper.firstChild;
			}

			const newButton = generateNewButton();

			const expectedButtonsDisabled = [true, false, true, false];

			actualElement.disabled = true;
			actualElement.appendChild(newButton);

			await waitNextTask();
			await actualElement.updateComplete;

			const buttonsDisabledAfter = getButtonsDisabledStates(actualElement);

			expectedButtonsDisabled.forEach((val, index) => {
				expect(val)
					.to
					.equal(buttonsDisabledAfter[index]);
			});
		});
	});
});
