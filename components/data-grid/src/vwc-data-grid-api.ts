export {
	DataGrid,
	DataGridColumn,
	DataGridHeader
};

/**
 * API definition of the Vivid data grid, component
 * - this is the definitions of the top level APIs relevant to the grid as a whole
 */
interface DataGrid {
	multiSort: boolean;
	reordering: boolean;
	columns: DataGridColumn[];
	rowDetailsRenderer?(container: HTMLElement): void;

	items?: unknown[];
	dataProvider?(params: { page: number, pageSize: number }, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;
}

/**
 * API definition of the Vivid data grid column, component
 * - column here is a metadata definition of grid column's configuration and behavior
 * - as such, column has NO visual representation and serves as a configuration data management unit
 * - this API is to be applied to each column in the data grid
 */
interface DataGridColumn {
	path: string;
	header: string;

	hidden: boolean;
	frozen: boolean;
	sortable: boolean;
	resizable: boolean;
	autoWidth: boolean;
	width?: string;
	tree: boolean;

	cellRenderer?(container: HTMLElement): void;
	headerRenderer?(container: HTMLElement): void;
	footerRenderer?(container: HTMLElement): void;
}

/**
 * API definition of the Vivid data grid header, component
 * - header here is a web component representing each column's header
 */
interface DataGridHeader {
	label: string;
}
