import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@material/mwc-ripple';
import { Ripple } from '@material/mwc-ripple';
import {
	customElement, property, LitElement, CSSResult, PropertyValues
} from 'lit-element';
import { style } from './vwc-pagination.css';
import { html, TemplateResult } from 'lit-element';

export const COMPONENT_NAME = 'vwc-pagination';
export const PREV_DISABLED_ATTR_NAME = 'prev-disabled';
export const NEXT_DISABLED_ATTR_NAME = 'next-disabled';

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
		this.reflectControlsState();
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
			this.reflectControlsState();
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
			<span class="item prev" ?disabled="${this.prevDisabled}" @pointerup="${this.goPrev}">
				<slot name="prev-control">
				<span class="control"
					@pointerdown="${this.handleRippleActivateControl}"
					@pointerup="${this.handleRippleDeactivateControl}"
				>
					<mwc-ripple class="ripple"></mwc-ripple>
					<vwc-icon class="icon" type="chevron-left-line" size="small"></vwc-icon>
					</span>
				</slot>
			</span>
		`;
	}

	private renderNext(): TemplateResult {
		return html`
			<span
			 	class="item next" ?disabled="${this.nextDisabled}" @pointerup="${this.goNext}">
				<slot name="next-control">
					<span class="control"
						@pointerdown="${this.handleRippleActivateControl}"
						@pointerup="${this.handleRippleDeactivateControl}"
					>
						<mwc-ripple class="ripple"></mwc-ripple>
						<vwc-icon class="icon" type="chevron-right-line" size="small"></vwc-icon>
					</span>
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
		return html`<span
			class="item page"
			data-index="${index}"
			?selected="${isSelected}"
			@pointerdown="${this.handleRippleActivatePage}"
			@pointerup="${this.handleRippleDeactivatePage}"
		>
			<mwc-ripple class="ripple"></mwc-ripple>
			${index + 1}
		</span>`;
	}

	private renderEllipsis(): TemplateResult {
		return html`<span class="item ellipsis">...</span>`;
	}

	private goPrev(): void {
		if (!this.prevDisabled) {
			this.selectedIndex -= 1;
		}
	}

	private goNext(): void {
		if (!this.nextDisabled) {
			this.selectedIndex += 1;
		}
	}

	private goTo(index: number): void {
		this.selectedIndex = Math.max(0, Math.min(this.total - 1, index));
	}

	private setupPointerListeners(): void {
		this.shadowRoot?.addEventListener('pointerup', (e) => {
			const target = e.target as HTMLElement;
			if (target.dataset.index) {
				this.goTo(parseInt(target.dataset.index));
			}
		});
	}

	private reflectControlsState() {
		if (this.prevDisabled) {
			this.setAttribute(PREV_DISABLED_ATTR_NAME, '');
		} else {
			this.removeAttribute(PREV_DISABLED_ATTR_NAME);
		}
		if (this.nextDisabled) {
			this.setAttribute(NEXT_DISABLED_ATTR_NAME, '');
		} else {
			this.removeAttribute(NEXT_DISABLED_ATTR_NAME);
		}
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

	private handleRippleActivatePage(e: PointerEvent) {
		const ripple = (e.target as HTMLElement).querySelector('.ripple') as Ripple;
		if (!ripple) {
			return;
		}

		const onUp = (pe: PointerEvent) => {
			window.removeEventListener('pointerup', onUp);
			this.handleRippleDeactivatePage(pe);
		};
		window.addEventListener('pointerup', onUp);
		ripple.startPress(e);
	}
	private handleRippleDeactivatePage(e: PointerEvent) {
		const ripple = (e.target as HTMLElement).querySelector('.ripple') as Ripple;
		if (ripple) {
			ripple.endPress();
		}
	}

	private handleRippleActivateControl(e: PointerEvent) {
		const ripple = (e.target as HTMLElement)
			.closest('.item:not([disabled])')
			?.querySelector('.ripple') as Ripple;

		if (ripple) {
			const onUp = (pe: PointerEvent) => {
				window.removeEventListener('pointerup', onUp);
				this.handleRippleDeactivateControl(pe);
			};
			window.addEventListener('pointerup', onUp);
			ripple.startPress(e);
		}
	}
	private handleRippleDeactivateControl(e: PointerEvent) {
		const ripple = (e.target as HTMLElement)
			.closest('.item:not([disabled])')
			?.querySelector('.ripple') as Ripple;

		if (ripple) {
			ripple.endPress();
		}
	}

	private get prevDisabled(): boolean {
		return this.selectedIndex < 1;
	}

	private get nextDisabled(): boolean {
		return this.selectedIndex > this.total - 2;
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
