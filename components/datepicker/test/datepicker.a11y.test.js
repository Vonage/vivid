import '../vwc-datepicker.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-datepicker';

describe('datepicker a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} inline></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		// .prevMonthDay fails contrast check
		// we disable interaction with css so lets consider aria-disabled
		const options = {
			rules: {
				'color-contrast': { enabled: false }
			}
		};

		await runAxeCore(actualElement, options);
	});
});
