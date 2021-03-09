import '@vonage/vvd-core';
import './vwc-data-grid-column';		//	do NOT remove, MUST have to not be elliminated
import {
	GRID_COMPONENT,
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGrid,
	DataGridColumn,
	DataGridHeader
} from './vwc-data-grid-api';
import { VWCDataGridColumn } from './vwc-data-grid-column';
import { VWCDataGridAdapterVaadin } from './adapters/vwc-data-grid-adapter-vaadin';
import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		[GRID_COMPONENT]: VWCDataGrid;
	}
}

export {
	GRID_COMPONENT,
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGrid,
	DataGridColumn,
	DataGridHeader
};

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
	rowDetailsRenderer: ((container: HTMLElement, grid: DataGrid, data: { item: unknown }) => void) | undefined = undefined;

	@property({ type: Array, reflect: false })
	items: unknown[] | undefined = undefined;
	@property({ reflect: false, attribute: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	get selectedItems(): unknown[] {
		return this.#gridAdapter.getSelectedItems();
	}

	selectItem(item: unknown) {
		this.#gridAdapter.selectItem(item);
	}

	deselectItem(item: unknown) {
		this.#gridAdapter.deselectItem(item);
	}

	protected render(): TemplateResult {
		return this.#gridAdapter.render();
	}

	protected firstUpdated(): void {
		this.addEventListener(COLUMN_DEFINITION_UPDATE_EVENT, () => this.processColumnDefs());
		this.processColumnDefs();
		this.shadowRoot?.firstElementChild?.addEventListener('selected-items-changed', () => {
			this.dispatchEvent(new Event('selected-items-changed', { bubbles: true, composed: true }));
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
