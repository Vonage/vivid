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
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should not render selector header when single mode', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'single'
		});

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should not render selector header when dataProvider used (even if multi mode)', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			dataProvider: (_params, cb) => cb(getItems(3), 3),
			selectorType: 'multi'
		});

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should select all when header checked', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

		const expectations = { exists: true, checked: false, indeterminate: false };
		assertSelectAllState(grid, expectations);

		const selectAll = getSelectAllHeader(grid);
		selectAll.click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(3);
	});

	it('should deselect all when header uncheched', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

		grid.selectItem(grid.items[0]);
		grid.selectItem(grid.items[1]);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(2);

		const expectations = { exists: true, checked: true, indeterminate: true };
		assertSelectAllState(grid, expectations);

		const selectAll = getSelectAllHeader(grid);
		selectAll.click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(0);
	});

	it('should select item when its selector checked', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});
		expect(grid.selectedItems.length).equal(0);

		const selectRowEls = grid.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		selectRowEls[1].click();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(2);
	});

	it('should deselect item when its selector unchecked', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

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
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'single'
		});
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
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});
		expect(grid.selectedItems.length).equal(0);

		const expectations = { exists: true, checked: false, indeterminate: false };
		assertSelectAllState(grid, expectations);
	});

	it('should show header indeterminate when some of the items selected', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

		grid.selectItem(grid.items[0]);
		grid.selectItem(grid.items[1]);
		await waitNextTask();
		expect(grid.selectedItems.length).equal(2);

		const expectations = { exists: true, checked: true, indeterminate: true };
		assertSelectAllState(grid, expectations);
	});

	it('should show header checked when all of the items selected', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

		grid.selectAll();
		await waitNextTask();
		expect(grid.selectedItems.length).equal(3);

		const expectations = { exists: true, checked: true, indeterminate: false };
		assertSelectAllState(grid, expectations);
	});

	it('should show header when switching from single to multi (items data provider)', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'single'
		});

		grid.columns[0].selector = 'multi';
		grid.refreshConfiguration();
		await waitNextTask();

		const expectations = { exists: true, checked: false, indeterminate: false };
		assertSelectAllState(grid, expectations);
	});

	it('should show header when switching from single to multi, indeterminate when some selected (items data provider)', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'single'
		});

		grid.selectItem(grid.items[0]);
		await waitNextTask();

		grid.columns[0].selector = 'multi';
		grid.refreshConfiguration();
		await waitNextTask();

		const expectations = { exists: true, checked: true, indeterminate: true };
		assertSelectAllState(grid, expectations);
	});


	it('should show header when switching from single to multi, selected when all selected (items data provider)', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'single'
		});

		grid.selectAll();
		await waitNextTask();

		grid.columns[0].selector = 'multi';
		grid.refreshConfiguration();
		await waitNextTask();

		const expectations = { exists: true, checked: true, indeterminate: false };
		assertSelectAllState(grid, expectations);
	});

	it('should hide header when switching from multi to single (items data provider)', async () => {
		const grid = await setupGrid({
			columns: getColumns(),
			items: getItems(3),
			selectorType: 'multi'
		});

		grid.columns[0].selector = 'single';
		grid.refreshConfiguration();
		await waitNextTask();

		expect(grid).shadowDom.equalSnapshot();
	});

	it('should hide header when switching from items to data provider (multi mode)', async () => {
		const items = getItems(3);
		const grid = await setupGrid({
			columns: getColumns(),
			items: items,
			selectorType: 'multi'
		});

		grid.dataProvider = (_params, callback) => callback(items, items.length);
		grid.refreshConfiguration();
		await waitNextTask();

		const expectations = { exists: false };
		assertSelectAllState(grid, expectations);
	});

	async function setupGrid({
		columns, items, dataProvider, selectorType
	}) {
		const [grid] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		columns[0].selector = selectorType;
		grid.columns = columns;
		if (items) {
			grid.items = items;
		} else if (dataProvider) {
			grid.dataProvider = dataProvider;
		}
		await waitNextTask();

		return grid;
	}
});

function assertSelectAllState(grid, { exists, checked, indeterminate }) {
	const selectAll = getSelectAllHeader(grid);
	if (exists) {
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
