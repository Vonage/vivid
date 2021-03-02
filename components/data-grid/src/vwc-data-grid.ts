import '@vonage/vvd-core';
import {
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
	VwcGridColumnConfiguration
};

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement {
	#items: unknown[] = [];

	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;

	@property({ type: Boolean, reflect: true })
	reordering = false;

	@property({ type: Object, reflect: false })
	columns: VwcGridColumnConfiguration[] = [];

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
			<vaadin-grid ?multi-sort="${this.multiSort}" ?column-reordering-allowed="${this.reordering}">
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
			vg.items = this.#items;
		}
	}

	private renderColumnDef(cc: VwcGridColumnConfiguration): TemplateResult {
		if (cc.sortable) {
			return html`<vaadin-grid-sort-column path="${cc.path}" header="${cc.header}"></vaadin-grid-sort-column>`;
		} else {
			return html`<vaadin-grid-column path="${cc.path}" header="${cc.header}" .footerRenderer="${this.test}"></vaadin-grid-column>`;
		}
	}

	private test() {
		console.log('something');
	}
}
