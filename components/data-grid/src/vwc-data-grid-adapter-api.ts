import { TemplateResult, CSSResult } from 'lit-element';
import { DataGrid } from './vwc-data-grid-api';

export {
	DataGridAdapter
};

/**
 * API definition of the Vivid data grid adapter
 * - should be considered as an internal API for Vivid's needs only
 * - allows to abstract the data grid APIs from an internal implementation
 * - defines Vivid data grid provisioning via any underlying engine (eg Vaadin, ag-grid, custom)
 */
interface DataGridAdapter {
	render(configuration: DataGrid): TemplateResult;
	getStylesOverlay(): CSSResult[];
}
