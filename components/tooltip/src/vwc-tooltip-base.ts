import {
	html, LitElement, property, query
} from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { createPopper, Placement } from '@popperjs/core';

export class VWCTooltipBase extends LitElement {
	private popperInstance: any;
	@query('.tooltip') protected popper!: HTMLElement;

	/**
	 * @prop anchor - the anchor of the tooltip
	 * accepts HTMLElement
	 * @public
	 * */
	@property({ type: HTMLElement, reflect: true })
		anchor?: HTMLElement;

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
		placement: Placement = 'auto';

	/**
	 * @prop open - indicates whether the tooltip is open
	 * accepts boolean value
	 * */
	@property({ type: Boolean, reflect: true })
		open = false;

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

	protected override updated(): void {
		if (this.open) {
			this.show();
		}
		else{
			this.hide();
		}
	}

	/**
	 * Opens the tooltip
	 * @public
	 */
	show(): void {
		if(this.popper === null || this.popper === undefined){
			console.log('The .tooltip in not defined');
			this.open = false;
			return;
		}
		if (this.anchor === null || this.anchor === undefined) {
			console.log('The anchor in not defined');
			this.open = false;
			return;
		}
		if (this.popperInstance) {
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
		else {
			this.popperInstance = createPopper(this.anchor, this.popper, {
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

	#renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="dismiss-button" icon="close-small-solid" shape="circled" dense
	@click="${this.clickCloseHandler}"></vwc-icon-button>`
			: nothing;
	}

	protected override render(): TemplateResult {
		const isOpen = (this.popperInstance && this.open) ? true : false;

		const classes = {
			'open': isOpen,
		};

		return html`
				<div class="tooltip ${classMap(classes)}" role="tooltip" aria-hidden=${this.open ? 'false' : 'true'} part="vvd-scheme-alternate">
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
