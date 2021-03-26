import '../vwc-list.js';
import '../vwc-list-item.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	runAxeCore,
} from '../../../test/test-helpers.js';

const COMPONENT_NAME = 'vwc-list';

describe('list a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<vwc-list-item>Item 0</vwc-list-item>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
				</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		const options = {
			rules: {
				list: { enabled: false }
			}
		};

		await runAxeCore(actualElement, options);
	});
});
