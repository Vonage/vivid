import '@vonage/vvd-core';

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
export class VWCDataGridHeader extends LitElement {
	static styles = [vwcDataGridHeaderStyle];

	@property({ type: String, reflect: true })
	label = '';

	protected render(): TemplateResult {
		return html`
			<span>${this.label}</span>
		`;
	}
}
