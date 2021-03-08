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
import { VWCDataGridHeader } from './vwc-data-grid-header';

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
				?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${_autoWidth}"
				width="${ifDefined(_width || undefined)}"
				.renderer="${cc.cellRenderer}"
				header="${cc.header}"
				.headerRenderer="${this.getHeaderRenderer(cc)}"
				.footer="${cc.footer}"
				.footerRenderer="${this.getFooterRenderer(cc)}"
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
				header="${cc.header}"
				.headerRenderer="${this.getHeaderRenderer(cc)}"
				.footer="${cc.footer}"
				.footerRenderer="${this.getFooterRenderer(cc)}"
			>
			</vaadin-grid-column>`;
		}
	}

	private getHeaderRenderer(cc: DataGridColumn): ((container: HTMLElement, column: DataGridColumn) => void) | null {
		if (cc.headerRenderer) {
			return cc.headerRenderer;
		} else if (cc.sortable) {
			return this.sortingHeaderRenderer;
		} else if (cc.header) {
			return this.simpleHeaderRenderer;
		} else {
			return null;
		}
	}

	private getFooterRenderer(cc: DataGridColumn): ((container: HTMLElement, column: DataGridColumn) => void) | null {
		if (cc.footerRenderer) {
			return cc.footerRenderer;
		} else if (cc.footer) {
			return this.simpleFooterRenderer;
		} else {
			return null;
		}
	}

	private simpleHeaderRenderer(container: HTMLElement, column: DataGridColumn): void {
		const gh = VWCDataGridProviderVaadin.ensureHeaderIn(container);
		gh.removeAttribute('path');
		gh.removeAttribute('sortable');
		gh.textContent = column.header || '';
	}

	private sortingHeaderRenderer(container: HTMLElement, column: DataGridColumn): void {
		const gh = VWCDataGridProviderVaadin.ensureHeaderIn(container);
		gh.setAttribute('path', column.path || '');
		gh.setAttribute('sortable', '');
		gh.textContent = column.header || '';
	}

	private simpleFooterRenderer(container: HTMLElement, column: DataGridColumn): void {
		container.classList.add('vvd-grid-footer');
		container.textContent = column.footer;
	}

	private static ensureHeaderIn(container: HTMLElement): VWCDataGridHeader {
		let result = container.querySelector('vwc-data-grid-header');
		if (!result) {
			result = document.createElement('vwc-data-grid-header');
			container.appendChild(result);
		}
		return result;
	}
}

const vwcDataGridProvider = new VWCDataGridProviderVaadin();
