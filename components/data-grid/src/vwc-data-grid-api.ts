export {
	GRID_COMPONENT,
	GRID_HEADER_COMPONENT,
	GRID_SELECT_HEADER_COMPONENT,
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGrid,
	DataGridColumn,
	DataGridHeader,
	DataGridSelectHeader
};

const GRID_COMPONENT = 'vwc-data-grid',
	GRID_HEADER_COMPONENT = 'vwc-data-grid-header',
	GRID_SELECT_HEADER_COMPONENT = 'vwc-data-grid-select-header',
	COLUMN_DEFINITION_COMPONENT = 'vwc-data-grid-column',
	COLUMN_DEFINITION_UPDATE_EVENT = 'column-definition-update';

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
}

/**
 * API definition of the Vivid data grid column, component
 * - column here is a metadata definition of grid column's configuration and behavior
 * - as such, column has NO visual representation and serves as a configuration data management unit
 * - this API is to be applied to each column in the data grid
 */
interface DataGridColumn {
	path?: string;

	tree: boolean;
	hidden: boolean;
	frozen: boolean;
	sortable: boolean;
	resizable: boolean;
	selector?: string;

	autoWidth: boolean;
	width?: string;

	header: string;
	headerRenderer?(column: DataGridColumn, container: HTMLElement): void;
	footer: string;
	footerRenderer?(column: DataGridColumn, container: HTMLElement): void;
	cellRenderer?(column: DataGridColumn, container: HTMLElement): void;
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
 * API definition of the Vivid data grid selector header, component
 * - web component representing selector column's header
 */
interface DataGridSelectHeader {
	selectMode?: string
}
