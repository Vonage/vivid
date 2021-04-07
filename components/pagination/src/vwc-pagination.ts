import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, property, LitElement, CSSResult, PropertyValues
} from 'lit-element';
import { style } from './vwc-pagination.css';
import { html, TemplateResult } from 'lit-element';

export const COMPONENT_NAME = 'vwc-pagination';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCPagination;
	}
}

/**
 * `vwc-pagination` component is designated to reflect and 'manage' state of the paged content views
 *
 * `vwc-pagination` exposes APIs to set the `total` of pages and `selectedIndex`
 */
@customElement('vwc-pagination')
export class VWCPagination extends LitElement {
	static get styles(): CSSResult[] {
		return [style];
	}

	@property({ type: Number, reflect: true })
	total = 0;

	@property({ type: Number, reflect: true, attribute: 'selected-index' })
	selectedIndex = -1;

	protected updated(changes: PropertyValues): void {
		let effectiveTotal = this.total;
		if (typeof effectiveTotal !== 'number' || Number.isNaN(effectiveTotal) || effectiveTotal < 0) {
			effectiveTotal = 0;
		}
		if (this.total !== effectiveTotal) {
			this.total = effectiveTotal;
		}

		let effectiveSelectedIndex = this.selectedIndex;
		if (typeof effectiveSelectedIndex !== 'number' || Number.isNaN(effectiveSelectedIndex) || effectiveSelectedIndex < 0) {
			effectiveSelectedIndex = 0;
		}
		if (effectiveSelectedIndex >= effectiveTotal) {
			effectiveSelectedIndex = effectiveTotal - 1;
		}
		if (this.selectedIndex !== effectiveSelectedIndex) {
			this.selectedIndex = effectiveSelectedIndex;
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
		return html`
			<span>
				<slot name="prev-control">
					<vwc-icon type="left"></vwc-icon>
				</slot>
			</span>
		`;
	}

	private renderNext(): TemplateResult {
		return html`
			<span>
				<slot name="next-control">
					<vwc-icon type="right"></vwc-icon>
				</slot>
			</span>
		`;
	}
}
