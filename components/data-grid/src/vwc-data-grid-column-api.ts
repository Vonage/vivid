import { DataRenderer, MetaRenderer } from './vwc-data-grid-render-provider-api';

export {
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	SELECTOR_SINGLE,
	SELECTOR_MULTI,
	DataGridColumn,
};

const COLUMN_DEFINITION_COMPONENT = 'vwc-data-grid-column',
	COLUMN_DEFINITION_UPDATE_EVENT = 'column-definition-update',
	SELECTOR_SINGLE = 'single',
	SELECTOR_MULTI = 'multi';

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
	headerRenderer?: MetaRenderer;
	footer: string;
	footerRenderer?: MetaRenderer;
	cellRenderer?: DataRenderer;
}
