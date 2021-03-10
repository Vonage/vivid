import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import { GridColumnElement, GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '../headers/vwc-data-grid-header';									//	do NOT remove, MUST be present to not be cleaned by post TS
import '../headers/vwc-data-grid-select-header';						//	do NOT remove, MUST be present to not be cleaned by post TS
import {
	DataGrid, GRID_COMPONENT, GRID_HEADER_COMPONENT
} from '../vwc-data-grid-api';
import { DataGridColumn } from '../vwc-data-grid-column-api';
import { DataGridAdapter } from '../vwc-data-grid-adapter-api';
import { VWCDataGridHeader } from '../headers/vwc-data-grid-header';
import { style as vwcDataGridStyleVaadin } from './vwc-data-grid-adapter-vaadin.css';
import { CSSResult, html, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { VWCCheckbox } from '@vonage/vwc-checkbox';

export {
	VWCDataGridAdapterVaadin
};

const EMPTY_ARRAY: unknown[] = [];

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

	getSelectedItems(): unknown[] {
		const iGrid = this.getImplementationOrThrow();
		return iGrid.selectedItems || EMPTY_ARRAY;
	}

	selectItem(item: unknown) {
		const iGrid = this.getImplementationOrThrow();
		iGrid.selectItem(item);
	}

	deselectItem(item: unknown) {
		const iGrid = this.getImplementationOrThrow();
		iGrid.deselectItem(item);
	}

	selectAll(): void {
		const iGrid = this.getImplementationOrThrow();
		iGrid.selectedItems = Array.isArray(iGrid.items) ? iGrid._filter(iGrid.items) : EMPTY_ARRAY;
	}

	deselectAll(): void {
		const iGrid = this.getImplementationOrThrow();
		iGrid.selectedItems = EMPTY_ARRAY;
	}

	private getImplementationOrThrow(): GridElement {
		const vaadinGrid = this.#vwcGrid.shadowRoot?.querySelector('vaadin-grid');
		if (!vaadinGrid) {
			throw new Error(`'${GRID_COMPONENT}' is un-initialized, adapted implementation is not found`);
		} else {
			return vaadinGrid;
		}
	}

	private renderColumnDef(cc: DataGridColumn): TemplateResult {
		if (cc.selector) {
			return html`<vaadin-grid-column
				width="56px"
				flex-grow="0"
				.headerRenderer="${this.getHeaderRenderer(cc)}"
				.renderer="${this.getCellRenderer(cc)}"
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
				width="${ifDefined(cc.width)}"
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
		} else if (cc.selector) {
			result = this.selectingHeaderRenderer;
		} else if (cc.sortable) {
			result = this.sortingHeaderRenderer;
		} else if (cc.header) {
			result = this.simpleHeaderRenderer;
		}
		return result ? this.contextualizeHandler(result, cc) : null;
	}

	private getFooterRenderer(cc: DataGridColumn): ((column: DataGridColumn, container: HTMLElement) => void) | null {
		let result;
		if (cc.footerRenderer) {
			result = cc.footerRenderer;
		} else if (cc.footer) {
			result = this.simpleFooterRenderer;
		}
		return result ? this.contextualizeHandler(result, cc) : null;
	}

	private getCellRenderer(cc: DataGridColumn): ((column: DataGridColumn, container: HTMLElement) => void) | null {
		let result;
		if (cc.cellRenderer) {
			result = cc.cellRenderer;
		} else if (cc.selector) {
			result = this.simpleSelectorCellRenderer;
		}
		return result ? this.contextualizeHandler(result, cc) : null;
	}

	private contextualizeHandler(handler: (column: DataGridColumn, container: HTMLElement) => void, cc: DataGridColumn): (column: DataGridColumn, container: HTMLElement) => void {
		return handler.bind(undefined, cc) as unknown as ((column: DataGridColumn, container: HTMLElement) => void);
	}

	private selectingHeaderRenderer(_column: DataGridColumn, container: HTMLElement, nativeColumn?: GridColumnElement): void {
		const sh = VWCDataGridAdapterVaadin.ensureSelectHeaderIn(container);
		const g = nativeColumn?.parentElement as GridElement;
		sh.classList.add('vvd-all-selector');
		sh.setAttribute('aria-label', 'Select All');
		sh.addEventListener('change', ({ target }) => {
			const toSelectAll = (target as VWCCheckbox).checked;
			g.selectedItems = toSelectAll && Array.isArray(g.items) ? g._filter(g.items) : EMPTY_ARRAY;
		});
		g.addEventListener('selected-items-changed', (e) => {
			const ig = e.target as GridElement;
			const totalSelected = ig.selectedItems?.length || 0;
			if (totalSelected === 0) {
				sh.indeterminate = sh.checked = false;
			} else if (totalSelected === ig.items?.length) {
				sh.checked = true;
				sh.indeterminate = false;
			} else {
				sh.checked = true;
				sh.indeterminate = true;
			}
		});
	}

	private sortingHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		const gh = VWCDataGridAdapterVaadin.ensureHeaderIn(container);
		gh.sortable = true;
		gh.path = column.path;
		gh.textContent = column.header || '';
	}

	private simpleHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		const gh = VWCDataGridAdapterVaadin.ensureHeaderIn(container);
		gh.sortable = false;
		gh.path = column.path;
		gh.textContent = column.header || '';
	}

	private simpleFooterRenderer(column: DataGridColumn, container: HTMLElement): void {
		container.classList.add('vvd-grid-footer');
		container.textContent = column.footer;
	}

	private simpleSelectorCellRenderer(_column: DataGridColumn, container: HTMLElement, nativeColumn?: GridColumnElement, data?: { item: unknown, selected: boolean }): void {
		let rs = container.firstElementChild as VWCCheckbox;
		if (!rs) {
			rs = document.createElement('vwc-checkbox');
			rs.classList.add('vvd-row-selector');
			rs.setAttribute('aria-label', 'Select Row');
			rs.addEventListener('change', (e) => {
				const cb = e.target as unknown as { checked: boolean, _data: { item: unknown } };
				const g = nativeColumn?.parentElement as GridElement;
				if (cb.checked) {
					g.selectItem(cb._data.item);
				} else {
					g.deselectItem(cb._data.item);
				}
			});
			container.appendChild(rs);
		}
		(rs as unknown as { _data: unknown })._data = data;
		rs.checked = Boolean(data?.selected);
	}

	private static ensureHeaderIn(container: HTMLElement): VWCDataGridHeader {
		let result = container.querySelector(GRID_HEADER_COMPONENT);
		if (!result) {
			result = document.createElement(GRID_HEADER_COMPONENT);
			container.appendChild(result);
		}
		return result;
	}

	private static ensureSelectHeaderIn(container: HTMLElement): VWCCheckbox {
		let result = container.firstElementChild as VWCCheckbox;
		if (!result) {
			result = document.createElement('vwc-checkbox');
			container.appendChild(result);
		}
		return result;
	}
}
