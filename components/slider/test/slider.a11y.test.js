import '../vwc-slider.js';
import '@vonage/vwc-list/vwc-list-item';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

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

		await expect(actualElement).shadowDom.to.be.accessible({
			ignoredRules: ['aria-input-field-name'],
		});
	});
});
