import '../vwc-inline.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-inline';

describe('inline a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
				</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
