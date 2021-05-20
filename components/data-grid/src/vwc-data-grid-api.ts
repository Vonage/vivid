import { DataGridColumn } from './vwc-data-grid-column-api';
import { RowDetailsRenderer } from './vwc-data-grid-renderer-api';

export {
	GRID_COMPONENT,
	GRID_HEADER_COMPONENT,
	GRID_SELECT_HEADER_COMPONENT,
	GRID_ENGINE_ROOT_CLASS,
	DataGrid,
	DataGridHeader,
};

const GRID_COMPONENT = 'vwc-data-grid',
	GRID_HEADER_COMPONENT = 'vwc-data-grid-header',
	GRID_SELECT_HEADER_COMPONENT = 'vwc-data-grid-select-header',
	GRID_ENGINE_ROOT_CLASS = 'vvd-grid-engine-root';

/**
 * API definition of the Vivid data grid, component
 * - this is the definitions of the top level APIs relevant to the grid as a whole
 */
interface DataGrid extends EventTarget {
	multiSort: boolean;
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
