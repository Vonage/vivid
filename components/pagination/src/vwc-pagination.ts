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

	connectedCallback() {
		super.connectedCallback();
		this.shadowRoot?.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			const targetItem = target.closest('.item') as HTMLElement;
			if (!targetItem) {
				return;
			}
			if (targetItem.classList.contains('prev')) {
				this.goPrev();
			} else if (targetItem.classList.contains('next')) {
				this.goNext();
			} else if (targetItem.dataset.index) {
				this.goTo(parseInt(targetItem.dataset.index));
			}
		});
	}

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

		if (this.selectedIndex !== effectiveSelectedIndex || (changes.get('selectedIndex') !== undefined && this.selectedIndex !== changes.get('selectedIndex'))) {
			this.selectedIndex = effectiveSelectedIndex;
			this.dispatchEvent(new CustomEvent('change', {
				bubbles: true,
				composed: true,
				detail: {
					selectedIndex: effectiveSelectedIndex,
					total: this.total
				}
			}));
		}
	}

	protected render(): TemplateResult {
		return html`
			${this.renderPrev()}
			${this.renderPages()}
			${this.renderNext()}
		`;
	}

	private renderPrev(): TemplateResult {
		return html`
			<span class="prev item" tabindex="0">
				<slot name="prev-control">
					<vwc-icon type="chevron-left-line" size="small"></vwc-icon>
				</slot>
			</span>
		`;
	}

	private renderNext(): TemplateResult {
		return html`
			<span class="item next" tabindex="0">
				<slot name="next-control">
					<vwc-icon type="chevron-right-line" size="small"></vwc-icon>
				</slot>
			</span>
		`;
	}

	private renderPages(): TemplateResult {
		return html`
			${this.renderPage(0)}
			${this.renderEllipsis()}
			${this.renderPage(9)}
		`;
	}

	private renderPage(index: number): TemplateResult {
		return html`<span class="item page" tabindex="0" data-index="${index}">${index + 1}</span>`;
	}

	private renderEllipsis(): TemplateResult {
		return html`<span class="item ellipsis">...</span>`;
	}

	private goPrev(): void {
		this.selectedIndex -= 1;
	}

	private goNext(): void {
		this.selectedIndex += 1;
	}

	private goTo(index: number): void {
		this.selectedIndex = index;
	}
}
