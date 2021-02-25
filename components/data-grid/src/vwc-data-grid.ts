import '@vonage/vvd-core';
import {
	customElement,
	LitElement,
} from 'lit-element';
import { style as vwcDataGridStyle } from './vwc-data-grid.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid': VWCDataGrid;
	}
}

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement {
	static styles = [vwcDataGridStyle];
}
