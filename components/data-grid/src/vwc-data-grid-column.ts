import '@vonage/vvd-core';
import {
	COLUMN_DEFINITION_COMPONENT,
	COLUMN_DEFINITION_UPDATE_EVENT,
	DataGridColumn
} from './vwc-data-grid-api';
import {
	customElement,
	property,
	LitElement,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		[COLUMN_DEFINITION_COMPONENT]: VWCDataGridColumn;
	}
}

@customElement(COLUMN_DEFINITION_COMPONENT)
export class VWCDataGridColumn extends LitElement implements DataGridColumn {
	@property({ type: String, reflect: true })
	path = '';

	@property({ type: String, reflect: true })
	header = '';

	@property({ type: Boolean, reflect: true })
	hidden = false;

	@property({ type: Boolean, reflect: true })
	frozen = false;

	@property({ type: Boolean, reflect: true })
	sortable = false;

	@property({ type: Boolean, reflect: true })
	resizable = false;

	@property({ type: Boolean, reflect: true, attribute: 'auto-width' })
	autoWidth = false;

	@property({ type: String, reflect: true })
	width: string | undefined;

	@property({ type: Boolean, reflect: true })
	tree = false;

	@property({ reflect: false, attribute: false })
	cellRenderer = undefined;

	@property({ reflect: false, attribute: false })
	headerRenderer = undefined;

	@property({ reflect: false, attribute: false })
	footerRenderer = undefined;

	getColumnConfig(): DataGridColumn {
		return {
			path: this.path,
			header: this.header,
			hidden: this.hidden,
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
		this.dispatchEvent(new Event(COLUMN_DEFINITION_UPDATE_EVENT, { bubbles: true }));
	}
}
