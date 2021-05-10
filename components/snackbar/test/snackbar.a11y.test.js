import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';
import { openSnackbar } from './snackbar-utils.test.js';

chai.use(chaiA11yAxe);

describe('snackbar a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations (normal flavor)', async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Message"></${COMPONENT_NAME}>`)
		);
		await openSnackbar(snackbar);

		await expect(snackbar).shadowDom.accessible();
	});

	it('should have 0 accessibility violations (legacy flavor)', async () => {
		const [snackbar] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Message" legacy></${COMPONENT_NAME}>`)
		);
		await openSnackbar(snackbar);

		await expect(snackbar).shadowDom.accessible();
	});
});
