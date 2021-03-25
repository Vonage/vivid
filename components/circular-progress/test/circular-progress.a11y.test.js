import '../vwc-circular-progress.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-circular-progress';

describe('circular-progress a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} ariaLabel="example progress spinner"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
