import { TemplateResult, CSSResult } from 'lit-element';
import { DataGrid } from './vwc-data-grid-api';

export {
	DataGridProvider
};

/**
 * API definition of the Vivid data grid provider
 * - this API allows to abstract the data grid APIs from an internal implementation
 * - this API defines Vivid data grid provisioning via any underlying engine (eg Vaadin, ag-grid, custom)
 */
interface DataGridProvider {
	render(configuration: DataGrid): TemplateResult;
	getStylesOverlay(): CSSResult[];
}
