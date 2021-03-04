import '@vonage/vvd-core';
import {
	DataGridColumn
} from './vwc-data-grid-api';

import {
	customElement,
	property,
	LitElement,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid-column': VWCDataGridColumn;
	}
}

@customElement('vwc-data-grid-column')
export class VWCDataGridColumn extends LitElement implements DataGridColumn {
	@property({ type: String, reflect: true })
	path = '';

	@property({ type: String, reflect: true })
	header = '';

	@property({ type: Boolean, reflect: true })
	frozen: boolean | undefined;

	@property({ type: Boolean, reflect: true })
	sortable: boolean | undefined;

	@property({ type: Boolean, reflect: true })
	resizable: boolean | undefined;

	@property({ type: Boolean, reflect: true })
	autoWidth: boolean | undefined;

	@property({ type: String, reflect: true })
	width: string | undefined;

	@property({ type: Boolean, reflect: true })
	tree: boolean | undefined;

	@property({ type: Function, reflect: false })
	cellRenderer = undefined;

	@property({ type: Function, reflect: false })
	headerRenderer = undefined;

	@property({ type: Function, reflect: false })
	footerRenderer = undefined;

	getColumnConfig(): DataGridColumn {
		return {
			path: this.path,
			header: this.header,
			frozen: this.frozen,
			sortable: this.sortable,
			resizable: this.resizable,
			autoWidth: this.autoWidth,
			width: this.width,
			tree: this.tree,
			cellRenderer: this.cellRenderer,
			headerRenderer: this.headerRenderer,
			footerRenderer: this.footerRenderer
		};
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	protected updated(): void {
		this.dispatchEvent(new Event('column-definition-update'));
	}
}
