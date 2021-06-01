import { GRID_COMPONENT as COMPONENT_NAME } from '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';

describe('data grid events API', () => {
	let addElement = isolatedElementsCreation();

	//	items
	//
	it('should provide correct event context (items)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await g.updateComplete;
		g.columns = getColumns();
		g.items = getItems(5);
		await g.updateComplete;

		//	TODO: make mouse and key events and assert
	});

	//	dataProvider
	//
	it('should provide correct event context (data provider)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await g.updateComplete;
		g.columns = getColumns();
		const d = getItems(5);
		g.dataProvider = (_params, cb) => cb(d, d.length);
		await g.updateComplete;

		//	TODO: make mouse and key events and assert
	});
});
