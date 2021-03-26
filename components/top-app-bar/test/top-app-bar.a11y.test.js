import '@vonage/vwc-icon';
import '../vwc-top-app-bar.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-top-app-bar';

describe('top app bar a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const options = {
			rules: {
				'aria-allowed-role': { enabled: false }
			}
		};

		await runAxeCore(actualElement, options);
	});
});
