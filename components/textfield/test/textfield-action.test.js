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

		it(`should enforce disable on child nodes`, async function () {
			const actualElement = await createDisabledElement();
			const buttons = Array.from(actualElement.querySelectorAll(iconButton));

			const allDisabled = buttons.every(button => button.disabled);

			actualElement.disabled = false;
			await waitNextTask();
			const allEnabled = buttons.every(button => !button.disabled);

			expect(allDisabled, `Children not disabled on initialization`)
				.to
				.equal(true);

			expect(allEnabled, `Children not enabled on change`)
				.to
				.equal(true);
		});

		it(`should disable dynamically added child node's`, async function () {
			const actualElement = await createDisabledElement();
			const newIconButton = document.createElement(iconButton);
			newIconButton.setAttribute('slot', 'action');
			actualElement.appendChild(newIconButton);

			await waitForSlotChange();
			expect(newIconButton.hasAttribute('disabled')).to.equal(true);
		});
	});
});
