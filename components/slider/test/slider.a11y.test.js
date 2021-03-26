import '../vwc-slider.js';
import '@vonage/vwc-list/vwc-list-item';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-slider';

describe('slider a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME} min="0" max="100" value="50"></${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		const options = {
			rules: {
				'aria-input-field-name': { enabled: false }
			}
		};

		await runAxeCore(actualElement, options);
	});
});
