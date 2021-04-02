import '../vwc-textarea.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-textarea';

describe('textarea a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} label="VWC Textarea"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
