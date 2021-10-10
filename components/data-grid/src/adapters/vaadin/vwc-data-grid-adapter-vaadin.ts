import '@vaadin/vaadin-grid/src/vaadin-grid.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-tree-column.js';
import '../../headers/vwc-data-grid-header.js';
import {
	DataGrid, EventContext, GRID_COMPONENT, GRID_ENGINE_ROOT_CLASS
} from '../../vwc-data-grid-api.js';
import type { GridElement } from '@vaadin/vaadin-grid/src/vaadin-grid.js';
import type { GridColumnElement } from '@vaadin/vaadin-grid/src/vaadin-grid-column.js';
import type { GridEventContext } from '@vaadin/vaadin-grid/src/interfaces.js';
import type { DataGridColumn } from '../../vwc-data-grid-column-api.js';
import type { DataGridAdapter } from '../vwc-data-grid-adapter-api.js';
import type { MetaRendererProvider, DataRendererProvider, RowDetailsRendererProvider } from '../vwc-data-grid-render-provider-api.js';
import { headerRendererProvider } from './vwc-renderer-provider-header-vaadin.js';
import { footerRendererProvider } from './vwc-renderer-provider-footer-vaadin.js';
import { cellRendererProvider } from './vwc-renderer-provider-cell-vaadin.js';
import { rowDetailsRendererProvider } from './vwc-renderer-provider-row-details-vaadin.js';
import { style as vwcDataGridStyleVaadin } from './vwc-data-grid-adapter-vaadin.css.js';
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

interface VaadinRowDetailsRenderer {
	(container: HTMLElement, grid: GridElement, data: { item: unknown, selected: boolean }): void;
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
			<dom-module id="my-grid-styles" theme-for="vaadin-grid">
				<template>
					<style>
						[part~="cell"] ::slotted(vaadin-grid-cell-content) {
							padding: 4px 16px;
						}
						:host(:not([reordering])) [part~='row'][selected] [part~='body-cell']:not([part~='details-cell']) {
							background-image: linear-gradient(var(--vvd-color-neutral-30), var(--vvd-color-neutral-30));
						}
					</style>
				</template>
			</dom-module>
			<vaadin-grid
				class="${GRID_ENGINE_ROOT_CLASS}"
				theme="no-border"
				?multi-sort="${this.#vwcGrid.multiSort}"
				?column-reordering-allowed="${this.#vwcGrid.reordering}"
				.rowDetailsRenderer="${this.adaptRowDetailsRenderer(rowDetailsRendererProvider, this.#vwcGrid)}"
				.items="${_items}"
				.heightByRows="${this.#vwcGrid.heightByRows}"
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

	getEventContext(event: Event): EventContext | null {
		let result = null;
		const iGrid = this.getImplementationOrThrow();
		const vContext = iGrid.getEventContext(event) as GridEventContext;
		if (vContext && typeof vContext.index === 'number') {
			result = {
				row: vContext.index,
				item: vContext.item,
			};
		}
		return result;
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

	private adaptRowDetailsRenderer(rendererProvider: RowDetailsRendererProvider, grid: DataGrid): VaadinRowDetailsRenderer | undefined {
		const renderer = rendererProvider(grid);
		if (!renderer) {
			return;
		}
		return (container: HTMLElement, _grid: GridElement, data: { item: unknown, selected: boolean }): void => {
			renderer(container, {
				grid: grid
			}, data);
		};
	}
}
