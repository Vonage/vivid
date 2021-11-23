import {
	html, LitElement, property, query
} from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { createPopper, Placement } from '@popperjs/core';

export class VWCTooltipBase extends LitElement {
	private popperInstance: any;
	@query('.tooltip') protected popper!: HTMLElement;

	/**
	 * @prop content - the content of the tooltip
	 * accepts string
	 * @public
	 * */
	@property({ type: String, reflect: true })
		content?: string;

	/**
	 * @prop placement - the placement of the tooltip
	 * accepts auto, auto-start, auto-end, top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end
	 * @public
	 * */
	@property({ type: String, reflect: true })
		placement : Placement = 'auto';

	/**
	 * @prop open - indicates whether the tooltip is open
	 * accepts boolean value
	 * */
	@property({ type: Boolean, reflect: true })
		open?: boolean;

	/**
	 * @prop dismissible - adds close button to the tooltip
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		dismissible?: boolean;

	/**
	 * @prop distance - the distance in pixels from which to offset the tooltip away from its target.
	 * accepts number value
	 * @public
	 * */
	@property({ type: Number }) distance = 10;

	/**
	 * Opens the tooltip
	 * @public
	 */
	show(target: HTMLElement): void {
		if (!this.popperInstance) {
			this.popperInstance = createPopper(target, this.popper, {
				placement: this.placement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, this.distance],
						},
					},
				],
			});
		}
		this.open = true;
	}

	/**
	 * Closes the tooltip
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	private clickCloseHandler() {
		this.hide();
	}

	protected override updated(): void {
		if (!this.popperInstance) {
			return;
		}
		this.popperInstance.setOptions({
			placement: this.placement,
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, this.distance],
					},
				},
			],
		});
		this.popperInstance.update();
	}

	#renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="dismiss-button" icon="close-small-solid" shape="circled" dense @click="${this.clickCloseHandler}"></vwc-icon-button>`
			: nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			'open': !!this.open,
		};
	}

	protected override render(): TemplateResult {
		return html`
			<div class="tooltip ${classMap(this.getRenderClasses())} vvd-scheme-alternate" role="tooltip" aria-hidden=${this.open ? 'false' : 'true' }>
				<div class="tooltip-content">
					<span class="tooltip-text">${this.content}</span>
					<slot>
					</slot>
				</div>
				${this.#renderDismissButton()}
				<div class="tooltip-tail" id="arrow" data-popper-arrow></div>
			</div>`;
	}
}
