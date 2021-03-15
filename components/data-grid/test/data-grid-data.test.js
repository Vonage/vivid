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

describe('data grid data API', () => {
	let addElement = isolatedElementsCreation();

	//	items
	//
	it('should have items as data provider', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		g.items = getItems(3);

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should update items on reassign the whole array', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		g.items = getItems(3);

		g.items = g.items.reverse().slice(0);
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should update items internal change by refreshData', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		g.items = getItems(3);

		await waitNextTask();
		g.items.push(g.items[0]);
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		g.refreshData();
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	//	dataProvider
	//
	it('should have dataProvider as data provider', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		const d = getItems(3);
		g.dataProvider = (_params, cb) => cb(d, d.length);

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should update dataProvider on reassign it as a new function', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		const d = getItems(3);
		g.dataProvider = (_params, cb) => cb(d, d.length);

		g.dataProvider = (_params, cb) => cb(d.reverse(), d.length);
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should update dataProvider internal change by refreshData', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		const d = getItems(3);
		g.dataProvider = (_params, cb) => cb(d, d.length);

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		d.push(d[0]);
		g.refreshData();
		await waitNextTask();
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});
});
