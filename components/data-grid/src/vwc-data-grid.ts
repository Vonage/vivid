import '@vonage/vvd-core';
import './vwc-data-grid-column';
import {
	GRID_COMPONENT,
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGrid,
	DataGridColumn,
	DataGridHeader
} from './vwc-data-grid-api';
import { VWCDataGridColumn } from './vwc-data-grid-column';
import { vwcDataGridProvider } from './vwc-data-grid-provider-vaadin';
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
	static styles = [vwcDataGridStyle, ...vwcDataGridProvider.getStylesOverlay()];

	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;

	@property({ type: Boolean, reflect: true })
	reordering = false;

	@property({ reflect: false, attribute: false })
	rowDetailsRenderer = undefined;

	@property({ type: Array, reflect: false })
	columns: DataGridColumn[] = [];

	@property({ type: Array, reflect: false })
	items: unknown[] | undefined = undefined;

	@property({ reflect: false, attribute: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	protected render(): TemplateResult {
		return vwcDataGridProvider.render(this);
	}

	protected firstUpdated(): void {
		this.addEventListener(COLUMN_DEFINITION_UPDATE_EVENT, () => this.processColumnDefs());
		this.processColumnDefs();
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
