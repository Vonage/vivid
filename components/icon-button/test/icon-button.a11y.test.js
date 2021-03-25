import '../vwc-icon-button.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-icon-button';

describe('icon button a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} icon="info"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
