import '../vwc-keypad.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-keypad';

describe('keypad a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}></${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		// vwc-textfield duplicating ID on host and internal input
		const options = {
			rules: {
				'duplicate-id-active': { enabled: false }
			}
		};

		await runAxeCore(actualElement, options);
	});
});
