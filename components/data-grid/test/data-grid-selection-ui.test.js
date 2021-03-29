import { GRID_COMPONENT as COMPONENT_NAME } from '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

describe('data grid selection UI', () => {
	let addElement = isolatedElementsCreation();

	it('should render selector column with header (multi select)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should not render selector header when single mode', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'single';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should not render selector header when dataProvider used (even if multi mode)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.dataProvider = (_params, cb) => cb(getItems(3), 3);
		await waitNextTask();

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should select all when header checked', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		assertSelectAllState(grid, true, false, false);

		const selectAll = getSelectAllHeader(grid);
		selectAll.click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(3);
	});

	it('should deselect all when header uncheched', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.selectItem(grid.items[0]);
		grid.selectItem(grid.items[1]);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(2);

		assertSelectAllState(grid, true, true, true);

		const selectAll = getSelectAllHeader(grid);
		selectAll.click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(0);
	});

	it('should select item when its selector checked', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(0);

		const selectRowEls = grid.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		selectRowEls[1].click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(2);
	});

	it('should deselect item when its selector unchecked', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.selectAll();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(3);

		const selectRowEls = grid.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		selectRowEls[1].click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(1);
	});

	it('should deselect other items when new one checked (single mode)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'single';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(0);

		const selectRowEls = grid.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(1);

		selectRowEls[1].click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(1);
	});

	it('should show header unchecked when none selected', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(0);

		assertSelectAllState(grid, true, false, false);
	});

	it('should show header indeterminate when some of the items selected', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.selectItem(grid.items[0]);
		grid.selectItem(grid.items[1]);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(2);

		assertSelectAllState(grid, true, true, true);
	});

	it('should show header checked when all of the items selected', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.selectAll();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(3);

		assertSelectAllState(grid, true, true, false);
	});

	it('should show header when switching from single to multi (items data provider)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'single';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.columns[0].selector = 'multi';
		grid.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(grid, true, false, false);
	});

	it('should show header when switching from single to multi, indeterminate when some selected (items data provider)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'single';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.selectItem(grid.items[0]);
		await waitNextTask();

		grid.columns[0].selector = 'multi';
		grid.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(grid, true, true, true);
	});


	it('should show header when switching from single to multi, selected when all selected (items data provider)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'single';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.selectAll();
		await waitNextTask();

		grid.columns[0].selector = 'multi';
		grid.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(grid, true, true, false);
	});

	it('should hide header when switching from multi to single (items data provider)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = getItems(3);
		await waitNextTask();

		grid.columns[0].selector = 'single';
		grid.refreshConfiguration();
		await waitNextTask();

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should hide header when switching from items to data provider (multi mode)', async () => {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const columns = getColumns();
		const items = getItems(3);
		columns[0].selector = 'multi';
		grid.columns = columns;
		grid.items = items;
		await waitNextTask();

		grid.dataProvider = (_params, callback) => callback(items, items.length);
		grid.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(grid, false);
	});
});

function assertSelectAllState(grid, exist, checked, indeterminate) {
	const selectAll = getSelectAllHeader(grid);
	if (exist) {
		expect(selectAll).exist;
		expect(selectAll.checked).equal(checked);
		expect(selectAll.indeterminate).equal(indeterminate);
	} else {
		expect(selectAll).not.exist;
	}
}

function getSelectAllHeader(grid) {
	return grid.shadowRoot.querySelector('vwc-checkbox.vvd-all-selector');
}
