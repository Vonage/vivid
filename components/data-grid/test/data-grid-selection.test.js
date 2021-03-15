import '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-data-grid';

describe('data grid selection API', () => {
	let addElement = isolatedElementsCreation();

	it('should set item selected on select item', async () => {
		let fires = 0;
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.addEventListener('selected-items-changed', () => fires++);
		g.columns = getColumns();
		g.items = getItems(3);
		expect(g.selectedItems).exist;
		expect(g.selectedItems.length).equal(0);

		g.selectItem(g.items[0]);
		expect(g.selectedItems).exist;
		expect(g.selectedItems.length).equal(1);
		expect(g.selectedItems[0]).equal(g.items[0]);

		expect(fires).equal(1);
	});

	it('should unset item selected on de-select item', async () => {
		let fires = 0;
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.addEventListener('selected-items-changed', () => fires++);
		g.columns = getColumns();
		g.items = getItems(3);
		g.selectItem(g.items[0]);

		g.deselectItem(g.items[0]);
		expect(g.selectedItems).exist;
		expect(g.selectedItems.length).equal(0);

		expect(fires).equal(2);
	});

	it('should set all items selected on select all', async () => {
		let fires = 0;
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.addEventListener('selected-items-changed', () => fires++);
		g.columns = getColumns();
		g.items = getItems(3);

		await waitNextTask();
		g.selectAll();
		expect(g.selectedItems.length).equal(3);

		expect(fires).equal(1);
	});

	it('should unset all items selected on de-select all', async () => {
		let fires = 0;
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.addEventListener('selected-items-changed', () => fires++);
		g.columns = getColumns();
		g.items = getItems(3);

		await waitNextTask();
		g.selectAll();
		g.deselectAll();
		expect(g.selectedItems.length).equal(0);

		expect(fires).equal(2);
	});

	it('should set all items selected when select item used with default mode', async () => {
		let fires = 0;
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.addEventListener('selected-items-changed', () => fires++);
		g.columns = getColumns();
		g.items = getItems(3);

		await waitNextTask();
		g.selectItem(g.items[0]);
		g.selectItem(g.items[1], false);
		expect(g.selectedItems.length).equal(2);

		expect(fires).equal(2);
	});

	it('should set only one item selected when select item used with single mode', async () => {
		let fires = 0;
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.addEventListener('selected-items-changed', () => fires++);
		g.columns = getColumns();
		g.items = getItems(3);

		await waitNextTask();
		g.selectItem(g.items[0]);
		g.selectItem(g.items[1], true);
		expect(g.selectedItems.length).equal(1);
		expect(g.selectedItems[0]).equal(g.items[1]);

		expect(fires).equal(2);
	});

	it('should throw when select all used with data provider', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const i = getItems(3);
		g.dataProvider = (_params, cb) => cb(i, i.length);
		g.columns = getColumns();

		await waitNextTask();
		expect(g.selectAll.bind(g)).throw(`'selectAll' is NOT supported when grid data supplied by 'dataProvider' method`);
	});
});
