import '@vonage/vvd-core';
import {
	VwcGridAPI,
	VwcGridColumnAPI
} from './vwc-data-grid-api';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-grid/vaadin-grid-sorter';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';

import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	html,
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

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
	items: unknown[] | undefined = undefined;

	@property({ type: Function, reflect: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	protected render(): TemplateResult {
		const _dataProvider = this.dataProvider;
		let _items = this.items;
		if (this.dataProvider && this.items) {
			console.error('\'items\' and \'dataProvider\' MUST NOT be used both; \'dataProvider\' will be used');
			_items = undefined;
		}
		return html`
			<vaadin-grid
				?multi-sort="${this.multiSort}"
				?column-reordering-allowed="${this.reordering}"
				.rowDetailsRenderer="${this.rowDetailsRenderer}"
				.items="${_items}"
				.dataProvider="${_dataProvider}"
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

	private renderColumnDef(cc: VwcGridColumnAPI): TemplateResult {
		const _width = cc.width;
		let _autoWidth = cc.autoWidth;
		if (_width && _autoWidth) {
			console.error('\'width\' and \'autoWidth\' MUST NOT be used both; \'width\' will be used');
			_autoWidth = undefined;
		}
		if (cc.tree) {
			return html`<vaadin-grid-tree-column
				path="${cc.path}"
				header="${cc.header}"
				?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${_autoWidth}"
				width="${ifDefined(_width || undefined)}"
				.renderer="${cc.cellRenderer}"
				.footerRenderer="${cc.footerRenderer}"
			>
			</vaadin-grid-tree-column>`;
		} else {
			return html`<vaadin-grid-column
				path="${cc.path}"
				?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${_autoWidth}"
				width="${ifDefined(_width || undefined)}"
				.renderer="${cc.cellRenderer}"
				.footerRenderer="${cc.footerRenderer}"
			>
				${this.renderInColumnExtension(cc)}
			</vaadin-grid-column>`;
		}
	}

	private renderInColumnExtension(cc: VwcGridColumnAPI): TemplateResult {
		return cc.sortable
			? html`<template class="header"><vaadin-grid-sorter path="${cc.path}">${cc.header}</vaadin-grid-sorter></template>`
			: html`<template class="header">${cc.header}</template>`;
	}
}
