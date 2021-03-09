import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import { GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '../headers/vwc-data-grid-header';									//	do NOT remove, MUST be present to not be cleaned by post TS
import '../headers/vwc-data-grid-select-header';						//	do NOT remove, MUST be present to not be cleaned by post TS
import {
	DataGrid, DataGridColumn, GRID_COMPONENT, GRID_HEADER_COMPONENT, GRID_SELECT_HEADER_COMPONENT
} from '../vwc-data-grid-api';
import { DataGridAdapter } from '../vwc-data-grid-adapter-api';
import { VWCDataGridHeader } from '../headers/vwc-data-grid-header';
import { VWCDataGridSelectHeader } from '../headers/vwc-data-grid-select-header';
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
			return html`<vaadin-grid-selection-column
				auto-select
				?frozen="${cc.frozen}"
				?resizable="${cc.resizable}"
				?auto-width="${cc.autoWidth}"
				width="${ifDefined(cc.width)}"
				.headerRenderer="${this.getHeaderRenderer(cc)}"
				.footerRenderer="${this.getFooterRenderer(cc)}"
				.renderer="${this.getCellRenderer(cc)}"
			>
			</vaadin-grid-selection-column>
			`;
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

	private selectingHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		VWCDataGridAdapterVaadin.ensureSelectHeaderIn(container);
		console.info(column);
	}

	private sortingHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		const gh = VWCDataGridAdapterVaadin.ensureHeaderIn(container);
		gh.setAttribute('path', column.path || '');
		gh.setAttribute('sortable', '');
		gh.textContent = column.header || '';
	}

	private simpleHeaderRenderer(column: DataGridColumn, container: HTMLElement): void {
		const gh = VWCDataGridAdapterVaadin.ensureHeaderIn(container);
		gh.removeAttribute('path');
		gh.removeAttribute('sortable');
		gh.textContent = column.header || '';
	}

	private simpleFooterRenderer(column: DataGridColumn, container: HTMLElement): void {
		container.classList.add('vvd-grid-footer');
		container.textContent = column.footer;
	}

	private simpleSelectorCellRenderer(_column: DataGridColumn, container: HTMLElement, nativeColumn?: HTMLElement, data?: { item: unknown, selected: boolean }): void {
		let gs = container.firstElementChild as VWCCheckbox;
		if (!gs) {
			gs = document.createElement('vwc-checkbox');
			gs.classList.add('vvd-row-selector');
			gs.setAttribute('aria-label', 'Select Row');
			gs.addEventListener('change', (e) => {
				const cb = e.target as unknown as { checked: boolean, _data: { item: unknown } };
				const g = nativeColumn?.parentElement as unknown as { selectItem: (i: unknown) => void, deselectItem: (i: unknown) => void, render: () => void };
				if (cb.checked) {
					g.selectItem(cb._data.item);
				} else {
					g.deselectItem(cb._data.item);
				}
				g.render();
			});
			container.appendChild(gs);
		}
		(gs as unknown as { _data: unknown })._data = data;
		gs.checked = Boolean(data?.selected);
	}

	private static ensureHeaderIn(container: HTMLElement): VWCDataGridHeader {
		let result = container.querySelector(GRID_HEADER_COMPONENT);
		if (!result) {
			result = document.createElement(GRID_HEADER_COMPONENT);
			container.appendChild(result);
		}
		return result;
	}

	private static ensureSelectHeaderIn(container: HTMLElement): VWCDataGridSelectHeader {
		let result = container.querySelector(GRID_SELECT_HEADER_COMPONENT);
		if (!result) {
			result = document.createElement(GRID_SELECT_HEADER_COMPONENT);
			container.appendChild(result);
		}
		return result;
	}
}
