import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, property, LitElement, CSSResult, PropertyValues
} from 'lit-element';
import { style } from './vwc-pagination.css';
import { html, TemplateResult } from 'lit-element';

export const COMPONENT_NAME = 'vwc-pagination';
const TOTAL_KEY = 'total';
const SELECTED_INDEX_KEY = 'selectedIndex';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCPagination;
	}
}

/**
 * `vwc-pagination` component is designated to reflect and 'manage' state of the paged content views
 *
 * `vwc-pagination` exposes APIs to set the `total` of pages and `selected` page
 */
@customElement('vwc-pagination')
export class VWCPagination extends LitElement {
	static get styles(): CSSResult[] {
		return [style];
	}

	@property({ type: Number, reflect: true })
	[TOTAL_KEY] = 0;

	@property({ type: Number, reflect: true, attribute: 'selected-index' })
	[SELECTED_INDEX_KEY] = -1;

	protected updated(changes: PropertyValues): void {
		let effectiveTotal = this[TOTAL_KEY];
		if (typeof effectiveTotal !== 'number' || Number.isNaN(effectiveTotal) || effectiveTotal < 0) {
			effectiveTotal = 0;
		}
		if (this[TOTAL_KEY] !== effectiveTotal) {
			this[TOTAL_KEY] = effectiveTotal;
		}

		let effectiveSelectedIndex = this[SELECTED_INDEX_KEY];
		console.log(effectiveSelectedIndex);
		if (typeof effectiveSelectedIndex !== 'number' || Number.isNaN(effectiveSelectedIndex) || effectiveSelectedIndex < 0) {
			effectiveSelectedIndex = 0;
		}
		if (effectiveSelectedIndex >= effectiveTotal) {
			effectiveSelectedIndex = effectiveTotal - 1;
		}
		if (this[SELECTED_INDEX_KEY] !== effectiveSelectedIndex) {
			this[SELECTED_INDEX_KEY] = effectiveSelectedIndex;
		}

		super.updated(changes);
	}

	protected render(): TemplateResult {
		return html`
			${this.renderPrev()}
			${this.renderNext()}
		`;
	}

	private renderPrev(): TemplateResult {
		return html``;
	}

	private renderNext(): TemplateResult {
		return html``;
	}
}
