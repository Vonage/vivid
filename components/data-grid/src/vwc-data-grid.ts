import '@vonage/vvd-core';
import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	customElement,
	LitElement,
} from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';

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
