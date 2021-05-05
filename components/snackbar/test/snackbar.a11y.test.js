import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

describe('snackbar a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations (normal flavor)', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Message"></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		actualElement.show();
		await waitNextTask();

		await expect(actualElement).shadowDom.accessible();
	});

	it('should have 0 accessibility violations (legacy flavor)', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Message" legacy></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		actualElement.show();
		await waitNextTask();

		await expect(actualElement).shadowDom.accessible();
	});
});
