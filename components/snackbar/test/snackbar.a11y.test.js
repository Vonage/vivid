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
	let snackbar;

	beforeEach(async () => {
		const [s] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Message"></${COMPONENT_NAME}>`)
		);
		await openSnackbar(s);
		snackbar = s;
	});


	it('should have 0 accessibility violations (normal flavor)', async () => {
		await expect(snackbar).shadowDom.accessible();
	});

	it('should have 0 accessibility violations (legacy flavor)', async () => {
		await expect(snackbar).shadowDom.accessible();
	});
});
