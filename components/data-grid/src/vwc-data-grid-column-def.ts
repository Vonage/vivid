import '@vonage/vvd-core';
import {
	VwcGridColumnAPI
} from './vwc-data-grid-api';

import {
	customElement,
	property,
	LitElement,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-column-def': VWCDataGridColumnDef;
	}
}

@customElement('vwc-column-def')
export class VWCDataGridColumnDef extends LitElement implements VwcGridColumnAPI {
	@property({ type: String, reflect: true })
	path = '';

	@property({ type: String, reflect: true })
	header = '';

	@property({ type: Boolean, reflect: true })
	frozen?: boolean | undefined;

	@property({ type: Boolean, reflect: true })
	sortable?: boolean | undefined;

	@property({ type: Boolean, reflect: true })
	resizable?: boolean | undefined;

	@property({ type: Boolean, reflect: true })
	autoWidth?: boolean | undefined;

	@property({ type: String, reflect: true })
	width?: string | undefined;

	@property({ type: Boolean, reflect: true })
	tree?: boolean | undefined;

	getColumnConfig(): VwcGridColumnAPI {
		const {
			path, header, frozen, sortable, resizable, autoWidth, width, tree
		} = this;
		return {
			path, header, frozen, sortable, resizable, autoWidth, width, tree
		};
	}

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	protected updated(): void {
		this.dispatchEvent(new Event('update'));
	}
}
