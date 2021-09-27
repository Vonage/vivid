import { DataRenderer, MetaRenderer } from './vwc-data-grid-renderer-api';

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
	/**
	 * path into the item to retrieve the data to be shown
	 * - won't be relevant for `selector` column
	 */
	path?: string;

	/**
	 * designates the column as a collapsible tree / groupable in case of a single level
	 */
	tree: boolean;

	/**
	 * hides / shows the column
	 */
	hidden: boolean;

	/**
	 * prevents columns from being scrolled / moved
	 */
	frozen: boolean;

	/**
	 * turns the column into sortable and vice-versa
	 * - when sortable and no custom header renderer, defaul sorting renderer will be shown and effective
	 */
	sortable: boolean;

	/**
	 * makes columns resizable an vice-versa
	 * - when resizable, a resize handle is available in UI to resize the column's width
	 */
	resizable: boolean;

	/**
	 * makes the column `selector`
	 * - won't react on features like `header`, `path`, `sortable`, `resizable` etc
	 * - unless overridden, will provide an OOTB UI for selecting the rows
	 * - if the values is `single`
	 * 	 - only one item will be selected, other unselected automatically
	 *   - no select all UI in the header will be provided
	 * - if `multi`
	 *   - header managing the select / deselect all will be shown
	 */
	selector?: string;

	autoWidth: boolean;
	width?: string;

	header: string;
	headerRenderer?: MetaRenderer;
	footer: string;
	footerRenderer?: MetaRenderer;
	cellRenderer?: DataRenderer;
}
