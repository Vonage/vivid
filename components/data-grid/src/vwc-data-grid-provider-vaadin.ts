import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
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

/**
 * VWCDataGridProviderVaadin service implements DataGridProvider API
 * - it provides the whole rendering functionality of Vivid data grid over the Vaadin grid engine
 */
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
		if (cc.tree) {
			return html`<vaadin-grid-tree-column
			path="${ifDefined(cc.path)}"
			?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${cc.autoWidth}"
				width="${ifDefined(cc.width || undefined)}"
				.headerRenderer="${this.getHeaderRenderer(cc)}"
				.footerRenderer="${this.getFooterRenderer(cc)}"
				.renderer="${cc.cellRenderer}"
			>
			</vaadin-grid-tree-column>`;
		} else {
			return html`<vaadin-grid-column
				path="${ifDefined(cc.path)}"
				?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${cc.autoWidth}"
				width="${ifDefined(cc.width || undefined)}"
				.headerRenderer="${this.getHeaderRenderer(cc)}"
				.footerRenderer="${this.getFooterRenderer(cc)}"
				.renderer="${cc.cellRenderer}"
			>
			</vaadin-grid-column>`;
		}
	}

	private getHeaderRenderer(cc: DataGridColumn): ((column: DataGridColumn, container: HTMLElement) => void) | null {
		let result;
		if (cc.headerRenderer) {
			result = cc.headerRenderer;
		} else if (cc.sortable) {
			result = this.sortingHeaderRenderer;
		} else if (cc.header) {
			result = this.simpleHeaderRenderer;
		}
		return result
			? this.contextualizeHandler(result, cc)
			: null;
	}

	private getFooterRenderer(cc: DataGridColumn): ((column: DataGridColumn, container: HTMLElement) => void) | null {
		let result;
		if (cc.footerRenderer) {
			result = cc.footerRenderer;
		} else if (cc.footer) {
			result = this.simpleFooterRenderer;
		}
		return result
			? this.contextualizeHandler(result, cc)
			: null;
	}

	private contextualizeHandler(handler: (column: DataGridColumn, container: HTMLElement) => void, cc: DataGridColumn): (column: DataGridColumn, container: HTMLElement) => void {
		return handler.bind(undefined, cc) as unknown as ((column: DataGridColumn, container: HTMLElement) => void);
	}

	private simpleHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		const gh = VWCDataGridProviderVaadin.ensureHeaderIn(container);
		gh.removeAttribute('path');
		gh.removeAttribute('sortable');
		gh.textContent = column.header || '';
	}

	private sortingHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		const gh = VWCDataGridProviderVaadin.ensureHeaderIn(container);
		gh.setAttribute('path', column.path || '');
		gh.setAttribute('sortable', '');
		gh.textContent = column.header || '';
	}

	private simpleFooterRenderer(column: DataGridColumn, container: HTMLElement): void {
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
