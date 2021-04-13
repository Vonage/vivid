import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@material/mwc-ripple';
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
			<span class="prev item" ?disabled="${this.selectedIndex < 1}" @pointerup="${this.goPrev}">
				<slot name="prev-control">
					<vwc-icon class="icon" type="chevron-left-line" size="small"></vwc-icon>
				</slot>
			</span>
		`;
	}

	private renderNext(): TemplateResult {
		return html`
			<span class="item next" ?disabled="${this.selectedIndex > this.total - 2}" @pointerup="${this.goNext}">
				<slot name="next-control">
					<vwc-icon class="icon" type="chevron-right-line" size="small"></vwc-icon>
				</slot>
			</span>
		`;
	}

	private renderPages(total: number, pivot: number): TemplateResult | string {
		if (total <= 0) {
			return '';
		}
		const pagesMap = VWCPagination.buildPagesMap(total, pivot);
		let actualIndex = 0;
		return html`
			${pagesMap.map((page) => {
		if (page === 0 || page === 1) {
			return this.renderPage(actualIndex++, page === 1);
		} else {
			actualIndex += page;
			return this.renderEllipsis();
		}
	})}
		`;
	}

	private renderPage(index: number, isSelected = false): TemplateResult {
		return html`<span class="item page" data-index="${index}" ?selected="${isSelected}">
			<mwc-ripple></mwc-ripple>
			${index + 1}
		</span>`;
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
			if (target.dataset.index) {
				this.goTo(parseInt(target.dataset.index));
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

	private static buildPagesMap(total: number, pivot: number, minBeforeEllipse = 7): number[] {
		const result = new Array(total).fill(0);
		result[pivot] = 1;

		if (pivot >= total / 2) {
			const removed = VWCPagination.reduceRange(0, pivot - 1, result.length - minBeforeEllipse + 1, result) - 1;
			VWCPagination.reduceRange(pivot + 1 - removed, total - 1 - removed, result.length - minBeforeEllipse + 1, result);
		} else {
			VWCPagination.reduceRange(pivot + 1, total - 1, result.length - minBeforeEllipse + 1, result);
			VWCPagination.reduceRange(0, pivot - 1, result.length - minBeforeEllipse + 1, result);
		}

		return result;
	}

	private static reduceRange(from: number, to: number, maxToRemove: number, data: number[]): number {
		if (maxToRemove < 2 || to - from < 3) {
			return 0;
		}
		const numToReplace = Math.min(maxToRemove, (to - from - 1));
		const lean = from === 0 ? Math.floor : Math.ceil;

		data.splice(
			from + lean((to - from - numToReplace + 1) / 2),
			numToReplace,
			numToReplace
		);

		return numToReplace;
	}
}
