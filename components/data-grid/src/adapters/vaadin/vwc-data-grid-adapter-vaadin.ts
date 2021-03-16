import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import { GridColumnElement, GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '../../headers/vwc-data-grid-header';
import { DataGrid, GRID_COMPONENT } from '../../vwc-data-grid-api';
import { DataGridColumn } from '../../vwc-data-grid-column-api';
import { DataGridAdapter } from '../vwc-data-grid-adapter-api';
import { DataRendererProvider, MetaRendererProvider } from '../vwc-data-grid-render-provider-api';
import { headerRendererProvider } from './vwc-renderer-provider-header-vaadin';
import { footerRendererProvider } from './vwc-renderer-provider-footer-vaadin';
import { cellRendererProvider } from './vwc-renderer-provider-cell-vaadin';
import { style as vwcDataGridStyleVaadin } from './vwc-data-grid-adapter-vaadin.css';
import { CSSResult, html, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export {
	VWCDataGridAdapterVaadin
};

interface VaadinMetaRenderer {
	(container: HTMLElement, column: GridColumnElement): void;
}

interface VaadinDataRenderer {
	(container: HTMLElement, column: GridColumnElement, data: { item: unknown, selected: boolean }): void;
}

/**
 * VWCDataGridProviderVaadin service implements DataGridProvider API
 * - it provides the whole rendering functionality of Vivid data grid over the Vaadin grid engine
 */
class VWCDataGridAdapterVaadin implements DataGridAdapter {
	static getStylesOverlay(): CSSResult[] {
		return [vwcDataGridStyleVaadin];
	}

	#vwcGrid: HTMLElement & DataGrid;

	constructor(vwcGrid: HTMLElement & DataGrid) {
		if (!vwcGrid || vwcGrid.localName !== GRID_COMPONENT) {
			throw new Error(`'vwcDataGrid' parameter invalid; expected '${GRID_COMPONENT}' component, got '${vwcGrid}'`);
		}
		this.#vwcGrid = vwcGrid;
	}

	render(): TemplateResult {
		const _dataProvider = this.#vwcGrid.dataProvider;
		let _items = this.#vwcGrid.items;
		if (this.#vwcGrid.dataProvider && this.#vwcGrid.items) {
			console.error('\'items\' and \'dataProvider\' MUST NOT be used both; \'dataProvider\' will be used');
			_items = undefined;
		}
		return html`
			<vaadin-grid
				theme="no-border"
				?multi-sort="${this.#vwcGrid.multiSort}"
				?column-reordering-allowed="${this.#vwcGrid.reordering}"
				.rowDetailsRenderer="${this.#vwcGrid.rowDetailsRenderer}"
				.items="${_items}"
				.dataProvider="${_dataProvider}"
			>
				${this.#vwcGrid.columns.map(cc => this.renderColumnDef(cc))}
			</vaadin-grid>
		`;
	}

	openItemDetails(item: unknown): void {
		const iGrid = this.getImplementationOrThrow();
		iGrid.openItemDetails(item);
	}

	closeItemDetails(item: unknown): void {
		const iGrid = this.getImplementationOrThrow();
		iGrid.closeItemDetails(item);
	}

	getSelectedItems(): unknown[] {
		const iGrid = this.getImplementationOrThrow();
		return iGrid.selectedItems || (iGrid.selectedItems = []);
	}

	selectItem(item: unknown, singleSelectMode = false) {
		const iGrid = this.getImplementationOrThrow();
		if (singleSelectMode) {
			if (iGrid.selectedItems?.length !== 1 || iGrid.selectedItems[0] !== item) {
				iGrid.selectedItems = [item];
			}
		} else {
			iGrid.selectItem(item);
		}
	}

	deselectItem(item: unknown) {
		const iGrid = this.getImplementationOrThrow();
		iGrid.deselectItem(item);
	}

	selectAll(): void {
		const iGrid = this.getImplementationOrThrow();
		const selectAllCandidates = Array.isArray(iGrid.items) ? iGrid._filter(iGrid.items) : [];
		if (selectAllCandidates.length === 0 && iGrid.selectedItems?.length === 0) {
			return;
		}
		iGrid.selectedItems = selectAllCandidates;
	}

	deselectAll(): void {
		const iGrid = this.getImplementationOrThrow();
		if (iGrid.selectedItems?.length) {
			iGrid.selectedItems = [];
		}
	}

	private getImplementationOrThrow(): GridElement {
		const vaadinGrid = this.#vwcGrid.shadowRoot?.querySelector('vaadin-grid');
		if (!vaadinGrid) {
			throw new Error(`'${GRID_COMPONENT}' is not yet fully initialized`);
		} else {
			return vaadinGrid;
		}
	}

	private renderColumnDef(cc: DataGridColumn): TemplateResult {
		if (cc.selector) {
			return html`<vaadin-grid-column
				width="56px"
				flex-grow="0"
				.headerRenderer="${this.adaptMetaRenderer(headerRendererProvider, cc, this.#vwcGrid)}"
				.renderer="${this.adaptDataRenderer(cellRendererProvider, cc, this.#vwcGrid)}"
			>
			</vaadin-grid-column>`;
		} else if (cc.tree) {
			return html`<vaadin-grid-tree-column
				path="${ifDefined(cc.path)}"
				?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${cc.autoWidth}"
				width="${ifDefined(cc.width)}"
				.headerRenderer="${this.adaptMetaRenderer(headerRendererProvider, cc, this.#vwcGrid)}"
				.footerRenderer="${this.adaptMetaRenderer(footerRendererProvider, cc, this.#vwcGrid)}"
				.renderer="${this.adaptDataRenderer(cellRendererProvider, cc, this.#vwcGrid)}"
			>
			</vaadin-grid-tree-column>`;
		} else {
			return html`<vaadin-grid-column
				path="${ifDefined(cc.path)}"
				?hidden="${cc.hidden}"
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${cc.autoWidth}"
				width="${ifDefined(cc.width)}"
				.headerRenderer="${this.adaptMetaRenderer(headerRendererProvider, cc, this.#vwcGrid)}"
				.footerRenderer="${this.adaptMetaRenderer(footerRendererProvider, cc, this.#vwcGrid)}"
				.renderer="${this.adaptDataRenderer(cellRendererProvider, cc, this.#vwcGrid)}"
			>
			</vaadin-grid-column>`;
		}
	}

	private adaptMetaRenderer(rendererProvider: MetaRendererProvider, column: DataGridColumn, grid: DataGrid): VaadinMetaRenderer | undefined {
		const renderer = rendererProvider(column);
		if (!renderer) {
			return;
		}
		const vvdColumnIndex = grid.columns.indexOf(column);
		return (container: HTMLElement): void => {
			renderer(container, {
				grid: grid,
				column: grid.columns[vvdColumnIndex]
			});
		};
	}

	private adaptDataRenderer(rendererProvider: DataRendererProvider, column: DataGridColumn, grid: DataGrid): VaadinDataRenderer | undefined {
		const renderer = rendererProvider(column);
		if (!renderer) {
			return;
		}
		const vvdColumnIndex = grid.columns.indexOf(column);
		return (container: HTMLElement, _column: GridColumnElement, data: { item: unknown, selected: boolean }): void => {
			renderer(container, {
				grid: grid,
				column: grid.columns[vvdColumnIndex]
			}, data);
		};
	}
}
