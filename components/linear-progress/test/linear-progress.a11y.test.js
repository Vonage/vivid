import '../vwc-linear-progress.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-linear-progress';

describe('linear progress a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} ariaLabel="Example progress bar"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
