import { DataGridColumn } from './vwc-data-grid-column-api';

export {
	GRID_COMPONENT,
	GRID_HEADER_COMPONENT,
	GRID_SELECT_HEADER_COMPONENT,
	DataGrid,
	DataGridHeader,
};

const GRID_COMPONENT = 'vwc-data-grid',
	GRID_HEADER_COMPONENT = 'vwc-data-grid-header',
	GRID_SELECT_HEADER_COMPONENT = 'vwc-data-grid-select-header';

/**
 * API definition of the Vivid data grid, component
 * - this is the definitions of the top level APIs relevant to the grid as a whole
 */
interface DataGrid {
	multiSort: boolean;
	reordering: boolean;
	columns: DataGridColumn[];

	rowDetailsRenderer?(container: HTMLElement, grid: DataGrid, data: { item: unknown }): void;

	items?: unknown[];
	dataProvider?(params: { page: number, pageSize: number }, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;

	selectedItems: unknown[];
	selectItem(item: unknown): void;
	deselectItem(item: unknown): void;
	selectAll(): void;
	deselectAll(): void;
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
