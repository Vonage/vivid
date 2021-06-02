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
	it('should provide correct event context (click event, items)', async () => {
		const g = await createGrid(true);

		const clickedRow = 2;
		const done = assertEventPromise(g, 'click', clickedRow);

		const itemToClick = pickCell(g, clickedRow, 1, g.columns.length);
		itemToClick.click();
		return done;
	});

	it('should provide correct event context (custom event, items)', async () => {
		const g = await createGrid();

		const clickedRow = 2;
		const done = assertEventPromise(g, 'custom', clickedRow);

		const itemToClick = pickCell(g, clickedRow, 1, g.columns.length);
		itemToClick.dispatchEvent(new CustomEvent('custom', { bubbles: true, composed: true }));
		return done;
	});

	//	dataProvider
	//
	it('should provide correct event context (click event, data provider)', async () => {
		const g = await createGrid(true);

		const clickedRow = 1;
		const done = assertEventPromise(g, 'click', clickedRow);

		const itemToClick = pickCell(g, clickedRow, 1, g.columns.length);
		itemToClick.click();
		return done;
	});

	it('should provide correct event context (custom event, data provider)', async () => {
		const g = await createGrid(true);

		const clickedRow = 3;
		const done = assertEventPromise(g, 'custom', clickedRow);

		const itemToClick = pickCell(g, clickedRow, 1, g.columns.length);
		itemToClick.dispatchEvent(new CustomEvent('custom', { bubbles: true, composed: true }));
		return done;
	});

	it('should provide null event context on non-relevant event', async () => {
		const g = await createGrid();
		const eventContext = g.getEventContext(new CustomEvent('custom'));
		expect(eventContext).equal(null);
	});

	async function createGrid(useDataProvider = false) {
		const [result] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await result.updateComplete;
		result.columns = getColumns();
		const items = getItems(5);
		if (useDataProvider) {
			result.dataProvider = (_params, cb) => cb(items, items.length);
		} else {
			result.items = items;
		}
		await result.updateComplete;
		return result;
	}

	function assertEventPromise(grid, eventType, clickedRow) {
		return new Promise((resolve) => {
			grid.addEventListener(eventType, async (event) => {
				const eventContext = grid.getEventContext(event);
				assertEventContext(eventContext, {
					row: clickedRow,
					item: { x: clickedRow, y: `text ${clickedRow}`, z: true }
				});

				resolve();
			}, { once: true });
		});
	}

	function assertEventContext(eventContext, expectedEventContext) {
		expect(eventContext).exist;

		expect(eventContext.row).equal(expectedEventContext.row);
		expect(eventContext.item).exist;

		expect(eventContext.item.x).equal(expectedEventContext.item.x);
		expect(eventContext.item.y).equal(expectedEventContext.item.y);
		expect(eventContext.item.z).equal(expectedEventContext.item.z);
	}
});

//	note: this works for small grids (up to ~50 rows)
function pickCell(grid, row, column, rowSize) {
	if (column >= rowSize) {
		throw new Error(`column MUST NOT exceed row size, got rowSize = ${rowSize}, column = ${column}`);
	}
	const cellsFlat = grid.shadowRoot.querySelectorAll('vaadin-grid-cell-content');
	return cellsFlat[row * rowSize + column];
}
