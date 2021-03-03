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
	#columns: VwcGridColumnAPI[] = [];
	#items: unknown[] = [];

	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;

	@property({ type: Boolean, reflect: true })
	reordering = false;

	@property({ type: Function, reflect: false })
	rowDetailsRenderer = undefined;

	@property()
	set columns(columns: VwcGridColumnAPI[]) {
		//	TODO: validate data
		this.#columns = columns;
		this.requestUpdate();
	}

	set items(items: unknown[]) {
		//	TODO: validations
		this.#items = items;
		const vg = this.shadowRoot?.querySelector('vaadin-grid');
		if (vg) {
			vg.items = items;
		}
	}

	protected render(): TemplateResult {
		return html`
			<vaadin-grid ?multi-sort="${this.multiSort}" ?column-reordering-allowed="${this.reordering}" .rowDetailsRenderer="${this.rowDetailsRenderer}">
				${this.#columns.map(cc => this.renderColumnDef(cc))}
			</vaadin-grid>
		`;
	}

	protected firstUpdated(): void {
		const vwcStyle = document.createElement('style');
		vwcStyle.innerHTML = vwcDataGridStyle.cssText;
		const vg = this.shadowRoot?.querySelector('vaadin-grid');
		if (vg) {
			vg.shadowRoot?.appendChild(vwcStyle);
			vg.items = this.#items;
		}
	}

	//	TODO: optimize the logic below
	private renderColumnDef(cc: VwcGridColumnAPI): TemplateResult {
		if (cc.sortable) {
			return html`<vaadin-grid-sort-column path="${cc.path}" header="${cc.header}" ?hidden="${cc.hidden}" ?resizable="${cc.resizable}" .renderer="${cc.cellRenderer}" .footerRenderer="${cc.footerRenderer}"></vaadin-grid-sort-column>`;
		} else {
			return html`<vaadin-grid-column path="${cc.path}" header="${cc.header}" ?hidden="${cc.hidden}" ?resizable="${cc.resizable}" .renderer="${cc.cellRenderer}" .footerRenderer="${cc.footerRenderer}"></vaadin-grid-column>`;
		}
	}
}
