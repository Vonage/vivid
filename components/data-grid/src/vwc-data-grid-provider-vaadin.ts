import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-grid/vaadin-grid-sorter';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle';
import { CSSResult, html, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { DataGrid, DataGridColumn } from './vwc-data-grid-api';
import { DataGridProvider } from './vwc-data-grid-provider-api';
import './vwc-data-grid-header';
import { style as vwcDataGridStyleVaadin } from './vwc-data-grid-provider-vaadin.css';

export {
	vwcDataGridProvider
};

class VWCDataGridProviderVaadin implements DataGridProvider {
	render(config: DataGrid): TemplateResult {
		const _dataProvider = config.dataProvider;
		let _items = config.items;
		if (config.dataProvider && config.items) {
			console.error('\'items\' and \'dataProvider\' MUST NOT be used both; \'dataProvider\' will be used');
			_items = undefined;
		}
		return html`
			<vaadin-grid
				theme="no-border"
				?multi-sort="${config.multiSort}"
				?column-reordering-allowed="${config.reordering}"
				.rowDetailsRenderer="${config.rowDetailsRenderer}"
				.items="${_items}"
				.dataProvider="${_dataProvider}"
			>
				${config.columns.map(cc => this.renderColumnDef(cc))}
			</vaadin-grid>
		`;
	}

	getStylesOverlay(): CSSResult[] {
		return [vwcDataGridStyleVaadin];
	}

	private renderColumnDef(cc: DataGridColumn): TemplateResult {
		const _width = cc.width;
		let _autoWidth = cc.autoWidth;
		if (_width && _autoWidth) {
			console.error('\'width\' and \'autoWidth\' MUST NOT be used both; \'width\' will be used');
			_autoWidth = false;
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
				.headerRenderer="${cc.headerRenderer}"
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

	private renderInColumnExtension(cc: DataGridColumn): TemplateResult {
		return cc.sortable
			? html`<template class="header"><vaadin-grid-sorter path="${cc.path}"><vwc-data-grid-header>${cc.header}</vwc-data-grid-header></vaadin-grid-sorter></template>`
			: html`<template class="header"><vwc-data-grid-header>${cc.header}</vwc-data-grid-header></template>`;
	}
}

const vwcDataGridProvider = new VWCDataGridProviderVaadin();
