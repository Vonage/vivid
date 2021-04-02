import '../vwc-calendar.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-calendar';

describe('calendar a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		// Axe warns <ul>, <ol> should only directly contain <li>
		const options = {
			rules: {
				list: { enabled: false }
			}
		};

		await runAxeCore(actualElement, options);
	});
});
