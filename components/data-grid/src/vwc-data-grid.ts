import '@vonage/vvd-core';
import {
	VwcGridAPI,
	VwcGridColumnAPI
} from './vwc-data-grid-api';
import { vwcDataGridProvider } from './vwc-data-grid-provider-vaadin';

import { style as vwcDataGridStyle } from './vwc-data-grid.css';
import {
	customElement,
	html,
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
	VwcGridAPI,
	VwcGridColumnAPI
};

/**
 * `vwc-data-grid` component is designated to render Rich/Responsive/Data tables/grids
 *
 * @element vwc-data-grid
 */
@customElement('vwc-data-grid')
export class VWCDataGrid extends LitElement implements VwcGridAPI {
	static styles = [vwcDataGridStyle, ...vwcDataGridProvider.getStylesOverlay()];

	@property({ type: Boolean, reflect: true, attribute: 'multi-sort' })
	multiSort = false;

	@property({ type: Boolean, reflect: true })
	reordering = false;

	@property({ type: Function, reflect: false })
	rowDetailsRenderer = undefined;

	@property({ type: Array, reflect: false })
	columns: VwcGridColumnAPI[] | undefined = undefined;

	@property({ type: Array, reflect: false })
	items: unknown[] | undefined = undefined;

	@property({ type: Function, reflect: false })
	dataProvider: ((params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void) => void) | undefined = undefined;

	protected render(): TemplateResult {
		return html`
			<slot class="column-defs"></slot>
			${vwcDataGridProvider.render(this)}
		`;
	}

	protected firstUpdated(): void {
		const assignedElements = this.shadowRoot?.querySelector('column-defs').assignedElements();
		const columnDefs = assignedElements.map((ae: unknown) => ae.getColumnConfig());
		this.processColumnDefs(columnDefs);
	}

	private processColumnDefs(columnDefs: VwcGridColumnAPI[]) {
		//	TODO: build columns
		//	TODO: set the columns on self
		//	trigger update
	}
}
