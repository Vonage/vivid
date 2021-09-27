import { DataGridColumn } from './vwc-data-grid-column-api';
import { RowDetailsRenderer } from './vwc-data-grid-renderer-api';

export {
	GRID_COMPONENT,
	GRID_HEADER_COMPONENT,
	GRID_SELECT_HEADER_COMPONENT,
	GRID_ENGINE_ROOT_CLASS,
	DataGrid,
	DataGridHeader,
	EventContext,
};

const GRID_COMPONENT = 'vwc-data-grid',
	GRID_HEADER_COMPONENT = 'vwc-data-grid-header',
	GRID_SELECT_HEADER_COMPONENT = 'vwc-data-grid-select-header',
	GRID_ENGINE_ROOT_CLASS = 'vvd-grid-engine-root';

/**
 * API definition of the Vivid data grid, component
 * - this is the definitions of the top level APIs relevant to the grid as a whole
 */
interface DataGrid extends HTMLElement {
	multiSort: boolean;
	heightByRows: boolean;
	reordering: boolean;
	columns: DataGridColumn[];
	refreshConfiguration(): void;

	rowDetailsRenderer?: RowDetailsRenderer;
	openItemDetails(item: unknown): void;
	closeItemDetails(item: unknown): void;

	items?: unknown[];
	dataProvider?(params: { page: number, pageSize: number }, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;
	refreshData(): void;

	selectedItems: unknown[];
	selectItem(item: unknown, singleSelectMode?: boolean): void;
	deselectItem(item: unknown): void;
	selectAll(): void;
	deselectAll(): void;

	getEventContext(event: Event): EventContext | null;
}

/**
 * API definition of the Vivid data grid header, component
 * - web component representing each column's header
 */
interface DataGridHeader {
	sortable: boolean;
	direction: string | null;
	path?: string;
}

/**
 * Data structure definition of the event context
 */
interface EventContext {
	/**
	 * row number, index, of the interacted row
	 */
	row?: number,

	/**
	 * actual data item, underlying interacted row
	 */
	item?: unknown
}
