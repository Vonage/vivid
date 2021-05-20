import '../vwc-textfield.js';
import { VALID_BUTTON_ELEMENTS } from '../vwc-textfield.js';

import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';


chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

describe('textfield action', () => {
	const [iconButton] = VALID_BUTTON_ELEMENTS;

	function waitForSlotChange() {
		return waitNextTask();
	}

	describe(`a11y`, function () {
		async function createDisabledElement() {
			const [actualElement] = (
				textToDomToParent(`
				<${COMPONENT_NAME} disabled>
					<${iconButton} slot="action"></${iconButton}>
					<${iconButton} slot="action"></${iconButton}>
					<${iconButton} slot="action"></${iconButton}>
				</${COMPONENT_NAME}>
				`)
			);
			await actualElement.updateComplete;
			return actualElement;
		}

		it(`should set  dynamically added child node's 'disabled' property`, async function () {
			const actualElement = await createDisabledElement();
			const newIconButton = document.createElement(iconButton);
			newIconButton.setAttribute('slot', 'action');
			actualElement.appendChild(newIconButton);

			await waitForSlotChange();
			expect(newIconButton.hasAttribute('disabled')).to.equal(true);
		});

		// it(`should init 'disabled' property on child nodes`, async function () {
		// 	async function enableElement() {
		// 		actualElement.removeAttribute('disabled');
		// 		await actualElement.updateComplete;
		// 	}

		// 	async function disableElement() {
		// 		actualElement.setAttribute('disabled', '');
		// 		await actualElement.updateComplete;
		// 	}

		// 	function checkIfChildrenDisabled() {
		// 		return [...actualElement.children].reduce((areAllDisabled, childNode) => (areAllDisabled && childNode.hasAttribute('disabled')), true);
		// 	}

		// 	const actualElement = await createDisabledElement();
		// 	const initializedWithDisabled = checkIfChildrenDisabled();

		// 	await enableElement();
		// 	const removedDisabledFromChildrenAfterEnable = !checkIfChildrenDisabled();

		// 	await disableElement();
		// 	const addDisabledDynamically = checkIfChildrenDisabled();

		// 	expect(initializedWithDisabled, `Children not disabled on initialization`)
		// 		.to
		// 		.equal(true);

		// 	expect(removedDisabledFromChildrenAfterEnable, `Children are still disabled after removing disabled property`)
		// 		.to
		// 		.equal(true);

		// 	expect(addDisabledDynamically, `Children not disabled after disabling the group`)
		// 		.to
		// 		.equal(true);
		// });

		// it(`should set 'disabled' property on child elements`, async function () {
		// 	async function enableElement() {
		// 		actualElement.removeAttribute('disabled');
		// 		await actualElement.updateComplete;
		// 	}

		// 	async function disableElement() {
		// 		actualElement.setAttribute('disabled', '');
		// 		await actualElement.updateComplete;
		// 	}

		// 	function checkIfChildrenDisabled() {
		// 		return [...actualElement.children].reduce((areAllDisabled, childNode) => (areAllDisabled && childNode.hasAttribute('disabled')), true);
		// 	}

		// 	const actualElement = await createDisabledElement();
		// 	const initializedWithDisabled = checkIfChildrenDisabled();

		// 	await enableElement();
		// 	const removedDisabledFromChildrenAfterEnable = !checkIfChildrenDisabled();

		// 	await disableElement();
		// 	const addDisabledDynamically = checkIfChildrenDisabled();

		// 	expect(initializedWithDisabled, `Children not disabled on initialization`)
		// 		.to
		// 		.equal(true);

		// 	expect(removedDisabledFromChildrenAfterEnable, `Children are still disabled after removing disabled property`)
		// 		.to
		// 		.equal(true);

		// 	expect(addDisabledDynamically, `Children not disabled after disabling the group`)
		// 		.to
		// 		.equal(true);
		// });
	});
});
