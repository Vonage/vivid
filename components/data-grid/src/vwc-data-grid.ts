import '@vonage/vvd-core';
import {
	VwcGridAPI,
	VwcGridColumnAPI
} from './vwc-data-grid-api';

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
	VwcGridAPI,
	VwcGridColumnAPI
};

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement implements VwcGridAPI {
	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;

	@property({ type: Boolean, reflect: true })
	reordering = false;

	@property({ type: Function, reflect: false })
	rowDetailsRenderer = undefined;

	@property({ type: Array, reflect: false })
	columns: VwcGridColumnAPI[] = [];

	@property({ type: Array, reflect: false })
	items: unknown[] = [];

	@property({ type: Function, reflect: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	protected render(): TemplateResult {
		//	TODO: do mutually exclusive validations and elliminations with errors in console
		return html`
			<vaadin-grid
				?multi-sort="${this.multiSort}"
				?column-reordering-allowed="${this.reordering}"
				.rowDetailsRenderer="${this.rowDetailsRenderer}"
				.items="${this.items}"
				.dataProvider="${this.dataProvider}"
			>
				${this.columns.map(cc => this.renderColumnDef(cc))}
			</vaadin-grid>
		`;
	}

	protected firstUpdated(): void {
		const vwcStyle = document.createElement('style');
		vwcStyle.innerHTML = vwcDataGridStyle.cssText;
		const vg = this.shadowRoot?.querySelector('vaadin-grid');
		if (vg) {
			vg.shadowRoot?.appendChild(vwcStyle);
		}
	}

	//	TODO: optimize the logic below
	private renderColumnDef(cc: VwcGridColumnAPI): TemplateResult {
		if (cc.sortable) {
			return html`<vaadin-grid-sort-column path="${cc.path}" header="${cc.header}" ?hidden="${cc.hidden}" ?resizable="${cc.resizable}" .renderer="${cc.cellRenderer}" .footerRenderer="${cc.footerRenderer}"></vaadin-grid-sort-column>`;
		} else if (cc.tree) {
			return html`<vaadin-grid-tree-column path="${cc.path}" header="${cc.header}" ?hidden="${cc.hidden}" ?resizable="${cc.resizable}" .renderer="${cc.cellRenderer}" .footerRenderer="${cc.footerRenderer}"></vaadin-grid-tree-column>`;
		} else {
			return html`<vaadin-grid-column path="${cc.path}" header="${cc.header}" ?hidden="${cc.hidden}" ?resizable="${cc.resizable}" .renderer="${cc.cellRenderer}" .footerRenderer="${cc.footerRenderer}"></vaadin-grid-column>`;
		}
	}
}
