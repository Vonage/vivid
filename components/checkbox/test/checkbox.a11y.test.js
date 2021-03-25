import '../vwc-checkbox.js';
import '@vonage/vwc-formfield';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-checkbox';

describe('checkbox a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<vwc-formfield label="VWC Checkbox">
					<${COMPONENT_NAME}></${COMPONENT_NAME}>
				</vwc-formfield>
			`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
