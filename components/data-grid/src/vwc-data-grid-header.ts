import '@vonage/vvd-core';
import { DataGridHeader } from './vwc-data-grid-api';
import { style as vwcDataGridHeaderStyle } from './vwc-data-grid-header.css';
import {
	html,
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid-header': VWCDataGridHeader;
	}
}

/**
 * `vwc-data-grid-header` component is designated to render VWC specific header for the data grids
 *
 * @element vwc-data-grid-header
 */
@customElement('vwc-data-grid-header')
export class VWCDataGridHeader extends LitElement implements DataGridHeader {
	static styles = [vwcDataGridHeaderStyle];

	@property({ type: Boolean, reflect: true })
	sortable = false;

	@property({ type: String, reflect: true })
	direction = undefined;

	protected render(): TemplateResult {
		return html`
			<slot></slot>
		`;
	}
}
