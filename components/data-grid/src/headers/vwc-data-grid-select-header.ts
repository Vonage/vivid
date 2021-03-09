import '@vonage/vvd-core';
import '@vonage/vwc-checkbox';
import { DataGridSelectHeader, GRID_SELECT_HEADER_COMPONENT } from '../vwc-data-grid-api';
import { style as vwcDataGridSelectHeaderStyle } from './vwc-data-grid-select-header.css';
import {
	html,
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		[GRID_SELECT_HEADER_COMPONENT]: VWCDataGridSelectHeader;
	}
}

/**
 * `vwc-data-grid-select-header` component is designated to render VWC specific header for the data grids, supporting
 * - selecting column
 *
 * @element vwc-data-grid-select-header
 */
@customElement(GRID_SELECT_HEADER_COMPONENT)
export class VWCDataGridSelectHeader extends LitElement implements DataGridSelectHeader {
	static styles = [vwcDataGridSelectHeaderStyle];

	@property({ type: Boolean, reflect: true })
	selectMode = undefined;

	// protected updated(changes: PropertyValues): void {
	// }

	protected render(): TemplateResult {
		return html`<vwc-checkbox></vwc-checkbox>`;
	}
}
