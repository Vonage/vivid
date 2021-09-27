import { GRID_COMPONENT as COMPONENT_NAME } from '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';

const
	DATA_AS_ITEMS = true,
	DATA_AS_DATA_PROVIDER = false;

describe('data grid events API', () => {
	let addElement = isolatedElementsCreation();

	describe('data as items', () => {
		it('should provide correct event context (click event)', async () => {
			const g = await createGrid(DATA_AS_ITEMS);

			const clickedRow = 2;
			const contextPromise = waitEventContext(g, 'click');
			triggerEvent(g, 'click', clickedRow);
			const eventContext = await contextPromise;
			assertEventContext(eventContext, buildExpectedEventContext(clickedRow));
		});

		it('should provide correct event context (custom event)', async () => {
			const g = await createGrid(DATA_AS_ITEMS);

			const clickedRow = 2;
			const contextPromise = waitEventContext(g, 'custom');
			triggerEvent(g, 'custom', clickedRow);
			const eventContext = await contextPromise;
			assertEventContext(eventContext, buildExpectedEventContext(clickedRow));
		});
	});

	describe('data as data provider', () => {
		it('should provide correct event context (click event, data provider)', async () => {
			const g = await createGrid(DATA_AS_DATA_PROVIDER);

			const clickedRow = 1;
			const contextPromise = waitEventContext(g, 'click');
			triggerEvent(g, 'click', clickedRow);
			const eventContext = await contextPromise;
			assertEventContext(eventContext, buildExpectedEventContext(clickedRow));
		});

		it('should provide correct event context (custom event, data provider)', async () => {
			const g = await createGrid(DATA_AS_DATA_PROVIDER);

			const clickedRow = 3;
			const contextPromise = waitEventContext(g, 'custom');
			triggerEvent(g, 'custom', clickedRow);
			const eventContext = await contextPromise;
			assertEventContext(eventContext, buildExpectedEventContext(clickedRow));
		});
	});

	it('should provide null event context on non-relevant event', async () => {
		const g = await createGrid(DATA_AS_ITEMS);
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

	function waitEventContext(grid, eventType) {
		return new Promise((resolve) => {
			grid.addEventListener(eventType, async (event) => {
				const eventContext = grid.getEventContext(event);
				resolve(eventContext);
			}, { once: true });
		});
	}

	function triggerEvent(grid, event, clickedRow, clickedCol = 1) {
		const itemToClick = pickCell(grid, clickedRow, clickedCol);
		itemToClick.dispatchEvent(new CustomEvent(event, { bubbles: true, composed: true }));
	}

	function buildExpectedEventContext(clickedRow) {
		return {
			row: clickedRow,
			item: { x: clickedRow, y: `text ${clickedRow}`, z: true }
		};
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
function pickCell(grid, row, column) {
	const rowSize = grid.columns.length;
	if (column >= rowSize) {
		throw new Error(`column MUST NOT exceed row size, got rowSize = ${rowSize}, column = ${column}`);
	}
	const cellsFlat = grid.shadowRoot.querySelectorAll('vaadin-grid-cell-content');
	return cellsFlat[row * rowSize + column];
}
