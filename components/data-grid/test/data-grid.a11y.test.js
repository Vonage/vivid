import { GRID_COMPONENT as COMPONENT_NAME } from '../vwc-data-grid.js';
import '../vwc-data-grid-column.js';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { getColumns, getItems } from './helper-utils.test.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

describe('data grid a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [g] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<vwc-data-grid-column header="First Name"></vwc-data-grid-column>
				</${COMPONENT_NAME}>
			`)
		);
		await g.updateComplete;
		g.columns = getColumns();
		g.items = getItems(30);
		await g.updateComplete;

		await expect(g).shadowDom.to.be.accessible();
	});
});
