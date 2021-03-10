export {
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGridColumn,
};

const COLUMN_DEFINITION_COMPONENT = 'vwc-data-grid-column',
	COLUMN_DEFINITION_UPDATE_EVENT = 'column-definition-update';

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
