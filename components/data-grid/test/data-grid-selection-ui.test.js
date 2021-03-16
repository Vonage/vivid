import '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-data-grid';

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

		const selectAll = g.shadowRoot.querySelector('.vvd-all-selector');
		expect(selectAll).exist;

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

		const selectAll = g.shadowRoot.querySelector('.vvd-all-selector');
		expect(selectAll).exist;
		expect(selectAll.checked).true;
		expect(selectAll.indeterminate).true;

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

		const selectAll = g.shadowRoot.querySelector('.vvd-all-selector');
		expect(selectAll).exist;
		expect(selectAll.checked).false;
		expect(selectAll.indeterminate).false;
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

		const selectAll = g.shadowRoot.querySelector('.vvd-all-selector');
		expect(selectAll).exist;
		expect(selectAll.checked).true;
		expect(selectAll.indeterminate).true;
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

		const selectAll = g.shadowRoot.querySelector('.vvd-all-selector');
		expect(selectAll).exist;
		expect(selectAll.checked).true;
		expect(selectAll.indeterminate).false;
	});
});
