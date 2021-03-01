import '@vonage/vvd-core';
import {
	VwcGridConfiguration,
	VwcGridColumnConfiguration
} from './vwc-data-grid-configuration';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';

import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	html,
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid': VWCDataGrid;
	}
}

export {
	VwcGridConfiguration
};

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement {
	@property({ type: Object, reflect: false })
	configuration: VwcGridConfiguration = { columns: [] };

	protected render(): TemplateResult {
		return html`
			<vaadin-grid class="grid-impl">
				${this.configuration.columns.map(cc => this.renderColumnDef(cc))}
			</vaadin-grid>
		`;
	}

	protected firstUpdated(): void {
		const vwcStyle = document.createElement('style');
		vwcStyle.innerHTML = vwcDataGridStyle.cssText;
		this.shadowRoot?.querySelector('.grid-impl')?.shadowRoot?.appendChild(vwcStyle);
	}

	private renderColumnDef(cc: VwcGridColumnConfiguration): TemplateResult {
		if (cc.sortable) {
			return html`<vaadin-grid-sort-column header="${cc.header}"></vaadin-grid-sort-column>`;
		} else {
			return html`<vaadin-grid-column header="${cc.header}"></vaadin-grid-column>`;
		}
	}
}
