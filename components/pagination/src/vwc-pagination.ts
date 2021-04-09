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
	selectedIndex = this.total - 1;

	connectedCallback() {
		super.connectedCallback();
		this.setupPointerListeners();
	}

	protected updated(changes: PropertyValues): void {
		//	validate and adjust total
		let effectiveTotal = this.total;
		if (typeof effectiveTotal !== 'number' || Number.isNaN(effectiveTotal) || effectiveTotal < 0) {
			effectiveTotal = 0;
			this.total = effectiveTotal;
		}

		//	validate and adjust selected index
		let effectiveSelectedIndex = this.selectedIndex;
		if (typeof effectiveSelectedIndex !== 'number' || Number.isNaN(effectiveSelectedIndex) || effectiveSelectedIndex < -1) {
			effectiveSelectedIndex = -1;
		}

		//	validate and adjust selected index relative to effective total
		if (effectiveTotal > 0 && effectiveSelectedIndex < 0) {
			effectiveSelectedIndex = 0;
		} else if (effectiveSelectedIndex >= effectiveTotal) {
			effectiveSelectedIndex = effectiveTotal - 1;
		}

		if (effectiveSelectedIndex !== this.selectedIndex) {
			this.selectedIndex = effectiveSelectedIndex;
		}

		if (changes.get('selectedIndex') !== undefined && this.selectedIndex !== changes.get('selectedIndex')) {
			this.notifyChange();
		}
	}

	protected render(): TemplateResult {
		return html`<div class="container all">
			${this.renderPrev()}
			<div class="container pages">
				${this.renderPages(this.total, this.selectedIndex)}
			</div>
			${this.renderNext()}
		</div>`;
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

	private renderPages(total: number, pivot: number): TemplateResult | string {
		if (total === 0) {
			return '';
		}
		return html`
			${this.renderPagesRange(0, pivot - 1)}
			${this.renderPage(pivot, true)}
			${this.renderPagesRange(pivot + 1, total - 1)}
		`;
	}

	private renderPagesRange(from: number, to: number): TemplateResult | TemplateResult[] | string {
		if (to < from || from > to) {
			return '';
		} else if (to - from < 3) {
			return new Array(to - from + 1)
				.fill(from)
				.map((f, i) => this.renderPage(f + i));
		} else {
			return html`
				${this.renderPage(from)}
				${this.renderEllipsis()}
				${this.renderPage(to)}
			`;
		}
	}

	private renderPage(index: number, isSelected = false): TemplateResult {
		return html`<span class="item page" tabindex="0" data-index="${index}" ?selected="${isSelected}">${index + 1}</span>`;
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

	private setupPointerListeners(): void {
		this.shadowRoot?.addEventListener('pointerup', (e) => {
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

	private notifyChange(): void {
		const changeEvent = new CustomEvent('change', {
			bubbles: true,
			composed: true,
			detail: {
				selectedIndex: this.selectedIndex,
				total: this.total
			}
		});
		this.dispatchEvent(changeEvent);
	}
}
