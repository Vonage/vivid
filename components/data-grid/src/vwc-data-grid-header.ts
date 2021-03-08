import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { DataGridHeader } from './vwc-data-grid-api';
import { style as vwcDataGridHeaderStyle } from './vwc-data-grid-header.css';
import {
	html,
	customElement,
	property,
	LitElement,
	PropertyValues,
	TemplateResult,
} from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-data-grid-header': VWCDataGridHeader;
	}
}

/**
 * `vwc-data-grid-header` component is designated to render VWC specific header for the data grids, supporting
 * - simple text header
 * - sortable header
 *
 * @element vwc-data-grid-header
 */
@customElement('vwc-data-grid-header')
export class VWCDataGridHeader extends LitElement implements DataGridHeader {
	static styles = [vwcDataGridHeaderStyle];

	@property({ type: Boolean, reflect: true })
	sortable?: boolean = false;

	@property({ type: String, reflect: true })
	direction?: string = undefined;

	@property({ type: String, reflect: true })
	path?: string = undefined;

	protected updated(changes: PropertyValues): void {
		if (changes.has('sortable')) {
			if (this.sortable) {
				this.addEventListener('click', this.onClick);
			} else {
				this.removeEventListener('click', this.onClick);
			}
		}
		if (changes.has('sortable') || changes.has('direction') || changes.has('path')) {
			this.requestSort();
		}
	}

	protected render(): TemplateResult {
		return html`
			${this.renderSortControls()}
			<slot></slot>
		`;
	}

	private renderSortControls(): TemplateResult | string {
		if (!this.sortable) {
			return '';
		}
		return html`<span class="sort-controls">
			<vwc-icon class="sort-control" type="up-full"></vwc-icon>
			<vwc-icon class="sort-control" type="down-full"></vwc-icon>
		</span>`;
	}

	private onClick(e: MouseEvent) {
		const self = e.target as VWCDataGridHeader;
		if (self.sortable) {
			e.preventDefault();
			self.onSortableClick();
		}
	}

	private onSortableClick() {
		if (this.direction === undefined) {
			this.direction = 'asc';
		} else if (this.direction === 'asc') {
			this.direction = 'desc';
		} else {
			this.direction = undefined;
		}
	}

	private requestSort(): void {
		if (this.sortable && this.path) {
			this.dispatchEvent(new CustomEvent('sorter-changed', { bubbles: true, composed: true }));
		}
	}
}
