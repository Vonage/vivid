import '../vwc-switch.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-switch';

describe('switch a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<vwc-formfield label="VWC Switch">
					<${COMPONENT_NAME}></${COMPONENT_NAME}>
				</vwc-formfield>
			`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
