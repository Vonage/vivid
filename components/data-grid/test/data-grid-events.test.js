import { GRID_COMPONENT as COMPONENT_NAME } from '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	isFirefox,
	isSafari,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';

describe('data grid events API', () => {
	if (isFirefox() || isSafari()) {
		return;
	}

	let addElement = isolatedElementsCreation();

	//	items
	//
	it('should provide correct event context (click event, items)', async () => {
		const g = await createGrid(true);
		const eventPromise = new Promise((r) => {
			g.addEventListener('click', r, { once: true });
		});

		const itemToClick = pickCell(g, 2, 1, g.columns.length);
		itemToClick.click();

		const event = await eventPromise;
		event.composedPath = () => event.path;

		const eventContext = g.getEventContext(event);
		assertEventContext(eventContext, {
			row: 2,
			item: { x: 2, y: 'text 2', z: true }
		});
	});

	it('should provide correct event context (custom event, items)', async () => {
		const g = await createGrid();

		const eventPromise = new Promise((r) => {
			g.addEventListener('custom', r, { once: true });
		});

		const itemToClick = pickCell(g, 2, 1, g.columns.length);
		itemToClick.dispatchEvent(new CustomEvent('custom', { bubbles: true, composed: true }));

		const event = await eventPromise;
		event.composedPath = () => event.path;

		const eventContext = g.getEventContext(event);
		assertEventContext(eventContext, {
			row: 2,
			item: { x: 2, y: 'text 2', z: true }
		});
	});

	//	dataProvider
	//
	it('should provide correct event context (click event, data provider)', async () => {
		const g = await createGrid(true);

		const eventPromise = new Promise((r) => {
			g.addEventListener('click', r, { once: true });
		});

		const itemToClick = pickCell(g, 1, 1, g.columns.length);
		itemToClick.click();

		const event = await eventPromise;
		event.composedPath = () => event.path;

		const eventContext = g.getEventContext(event);
		assertEventContext(eventContext, {
			row: 1,
			item: { x: 1, y: 'text 1', z: true }
		});
	});

	it('should provide correct event context (custom event, data provider)', async () => {
		const g = await createGrid(true);

		const eventPromise = new Promise((r) => {
			g.addEventListener('custom', r, { once: true });
		});

		const itemToClick = pickCell(g, 3, 1, g.columns.length);
		itemToClick.dispatchEvent(new CustomEvent('custom', { bubbles: true, composed: true }));

		const event = await eventPromise;
		event.composedPath = () => event.path;

		const eventContext = g.getEventContext(event);
		assertEventContext(eventContext, {
			row: 3,
			item: { x: 3, y: 'text 3', z: true }
		});
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
