import '../vwc-icon-button-toggle.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-icon-button-toggle';

describe('icon button toggle a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}
					label="toggle bookmark"
					onicon="bookmark-full"
					officon="bookmark"
				></${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
