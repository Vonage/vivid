import '../vwc-select.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-select';

describe('select a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} label="VWC Select"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
