import '../vwc-radio.js';
import '@vonage/vwc-formfield';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-radio';

describe('radio a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<vwc-formfield label="VWC Radio">
					<${COMPONENT_NAME}></${COMPONENT_NAME}>
				</vwc-formfield>
			`)
		);
		await waitNextTask();

		await runAxeCore(actualElement);
	});
});
