import '../vwc-data-grid.js';
import '../vwc-data-grid-column.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-data-grid';

describe('data grid a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<vwc-data-grid-column header="First Name"></vwc-data-grid-column>
				</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		await expect(actualElement).shadowDom.to.be.accessible();
	});
});
