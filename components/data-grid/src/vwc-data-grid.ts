import '@vonage/vvd-core';
import {
	DataGrid,
	DataGridColumn
} from './vwc-data-grid-api';
import { VWCDataGridColumn } from './vwc-data-grid-column-def';
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
		'vwc-data-grid': VWCDataGrid;
	}
}

export {
	DataGrid,
	DataGridColumn
};

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement implements DataGrid {
	static styles = [vwcDataGridStyle, ...vwcDataGridProvider.getStylesOverlay()];

	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;

	@property({ type: Boolean, reflect: true })
	reordering = false;

	@property({ type: Function, reflect: false })
	rowDetailsRenderer = undefined;

	@property({ type: Array, reflect: false })
	columns: DataGridColumn[] = [];

	@property({ type: Array, reflect: false })
	items: unknown[] | undefined = undefined;

	@property({ type: Function, reflect: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	protected render(): TemplateResult {
		return vwcDataGridProvider.render(this);
	}

	protected firstUpdated(): void {
		this.addEventListener('column-definition-update', () => this.processColumnDefs());
		this.processColumnDefs();
	}

	private processColumnDefs() {
		//	collect
		const columnDefinitionElements = this.querySelectorAll('vwc-data-grid-column');
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
