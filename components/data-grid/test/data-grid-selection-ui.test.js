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
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should not render selector header when single mode', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'single';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should not render selector header when dataProvider used (even if multi mode)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.dataProvider = (_params, cb) => cb(getItems(3), 3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should select all when header checked', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		assertSelectAllState(g, true, false, false);

		const selectAll = getSelectAllHeader(g);
		selectAll.click();
		await waitNextTask();
		expect(g.selectedItems.length).equal(3);
	});

	it('should deselect all when header uncheched', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.selectItem(g.items[0]);
		g.selectItem(g.items[1]);
		await waitNextTask();
		expect(g.selectedItems.length).equal(2);

		assertSelectAllState(g, true, true, true);

		const selectAll = getSelectAllHeader(g);
		selectAll.click();
		await waitNextTask();
		expect(g.selectedItems.length).equal(0);
	});

	it('should select item when its selector checked', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();
		expect(g.selectedItems.length).equal(0);

		const selectRowEls = g.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		selectRowEls[1].click();
		await waitNextTask();
		expect(g.selectedItems.length).equal(2);
	});

	it('should deselect item when its selector unchecked', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.selectAll();
		await waitNextTask();
		expect(g.selectedItems.length).equal(3);

		const selectRowEls = g.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		selectRowEls[1].click();
		await waitNextTask();
		expect(g.selectedItems.length).equal(1);
	});

	it('should deselect other items when new one checked (single mode)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'single';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();
		expect(g.selectedItems.length).equal(0);

		const selectRowEls = g.shadowRoot.querySelectorAll('.vvd-row-selector');
		expect(selectRowEls.length).equal(3);

		selectRowEls[0].click();
		await waitNextTask();
		expect(g.selectedItems.length).equal(1);

		selectRowEls[1].click();
		await waitNextTask();
		expect(g.selectedItems.length).equal(1);
	});

	it('should show header unchecked when none selected', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();
		expect(g.selectedItems.length).equal(0);

		assertSelectAllState(g, true, false, false);
	});

	it('should show header indeterminate when some of the items selected', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.selectItem(g.items[0]);
		g.selectItem(g.items[1]);
		await waitNextTask();
		expect(g.selectedItems.length).equal(2);

		assertSelectAllState(g, true, true, true);
	});

	it('should show header checked when all of the items selected', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.selectAll();
		await waitNextTask();
		expect(g.selectedItems.length).equal(3);

		assertSelectAllState(g, true, true, false);
	});

	it('should show header when switching from single to multi (items data provider)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'single';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.columns[0].selector = 'multi';
		g.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(g, true, false, false);
	});

	it('should show header when switching from single to multi, indeterminate when some selected (items data provider)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'single';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.selectItem(g.items[0]);
		await waitNextTask();

		g.columns[0].selector = 'multi';
		g.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(g, true, true, true);
	});


	it('should show header when switching from single to multi, selected when all selected (items data provider)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'single';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.selectAll();
		await waitNextTask();

		g.columns[0].selector = 'multi';
		g.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(g, true, true, false);
	});

	it('should hide header when switching from multi to single (items data provider)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		c[0].selector = 'multi';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		g.columns[0].selector = 'single';
		g.refreshConfiguration();
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should hide header when switching from items to data provider (multi mode)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const c = getColumns();
		const i = getItems(3);
		c[0].selector = 'multi';
		g.columns = c;
		g.items = i;
		await waitNextTask();

		g.dataProvider = (_params, callback) => callback(i, i.length);
		g.refreshConfiguration();
		await waitNextTask();

		assertSelectAllState(g, false);
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
