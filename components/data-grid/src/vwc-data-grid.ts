import '@vonage/vvd-core';
import './vwc-data-grid-column';
import {
	GRID_COMPONENT,
	DataGrid,
	DataGridHeader
} from './vwc-data-grid-api';
import {
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGridColumn,
} from './vwc-data-grid-column-api';
import { DataRenderer } from './vwc-data-grid-renderer-api';
import {
	VWCDataGridColumn
} from './vwc-data-grid-column';
import { VWCDataGridAdapterVaadin } from './adapters/vaadin/vwc-data-grid-adapter-vaadin';
import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';

export {
	GRID_COMPONENT,
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGrid,
	DataGridColumn,
	DataGridHeader
};

declare global {
	interface HTMLElementTagNameMap {
		[GRID_COMPONENT]: VWCDataGrid;
	}
}

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement(GRID_COMPONENT)
export class VWCDataGrid extends LitElement implements DataGrid {
	static styles = [vwcDataGridStyle, ...VWCDataGridAdapterVaadin.getStylesOverlay()];
	#gridAdapter = new VWCDataGridAdapterVaadin(this);

	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;
	@property({ type: Boolean, reflect: true })
	reordering = false;
	@property({ type: Array, reflect: false })
	columns: DataGridColumn[] = [];
	@property({ reflect: false, attribute: false })
	rowDetailsRenderer?: DataRenderer | undefined = undefined;

	@property({ type: Array, reflect: false })
	items: unknown[] | undefined = undefined;
	@property({ reflect: false, attribute: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	refreshConfiguration(): void {
		this.requestUpdate('columns');
	}

	refreshData(): void {
		if (this.dataProvider) {
			this.dataProvider = this.dataProvider.bind(undefined);
		} else if (this.items && this.items.length) {
			this.items = this.items.slice(0);
		}
	}

	get selectedItems(): unknown[] {
		return this.#gridAdapter.getSelectedItems();
	}

	selectItem(item: unknown, singleSelectMode = false): void {
		this.#gridAdapter.selectItem(item, singleSelectMode);
	}

	deselectItem(item: unknown): void {
		this.#gridAdapter.deselectItem(item);
	}

	selectAll(): void {
		if (this.dataProvider) {
			throw new Error('\'selectAll\' is NOT supported when grid data supplied by \'dataProvider\' method');
		}
		this.#gridAdapter.selectAll();
	}

	deselectAll(): void {
		this.#gridAdapter.deselectAll();
	}

	openItemDetails(item: unknown): void {
		this.#gridAdapter.openItemDetails(item);
	}

	closeItemDetails(item: unknown): void {
		this.#gridAdapter.closeItemDetails(item);
	}

	protected render(): TemplateResult {
		return this.#gridAdapter.render();
	}

	protected firstUpdated(): void {
		this.addEventListener(COLUMN_DEFINITION_UPDATE_EVENT, () => this.processColumnDefs());
		this.processColumnDefs();
		this.shadowRoot?.firstElementChild?.addEventListener('selected-items-changed', (e) => {
			//	this will happen twice: https://github.com/vaadin/vaadin-grid/issues/859, therefore treatment:
			const ne = e as CustomEvent;
			if (ne.detail && typeof ne.detail.path === 'string' && ne.detail.path.includes('length')) {
				this.dispatchEvent(new CustomEvent('selected-items-length-changed', { bubbles: true, composed: true }));
			} else {
				this.dispatchEvent(new CustomEvent('selected-items-changed', { bubbles: true, composed: true }));
			}
		});
	}

	private processColumnDefs() {
		//	collect
		const columnDefinitionElements = this.querySelectorAll(COLUMN_DEFINITION_COMPONENT);
		if (!columnDefinitionElements.length) {
			return;
		}

		//	transform
		const columnDefs = [];
		for (const ae of columnDefinitionElements) {
			columnDefs.push((ae as VWCDataGridColumn).getColumnConfig());
		}

		//	apply
		this.columns = columnDefs;
	}
}
