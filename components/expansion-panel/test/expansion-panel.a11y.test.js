import '../vwc-expansion-panel.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-expansion-panel';

describe('expansion-panel a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME} header="Click me">
					<div>Expansion panel content</div>
				</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
