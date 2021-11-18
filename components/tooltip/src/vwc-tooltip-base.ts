import {
	html, LitElement, property, query
} from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { createPopper } from '@popperjs/core';

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
	 * accepts top, bottom, right, left
	 * @public
	 * */
	@property({ type: String, reflect: true })
		placement: | 'top'
		| 'right'
		| 'bottom'
		| 'left' = 'top';

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

	/**
	 * @prop skidding - the distance in pixels from which to offset the tooltip along its target.
	 * accepts number value
	 * @public
	 * */
	@property({ type: Number }) skidding = 0;

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
							offset: [this.skidding, this.distance],
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
		this.popperInstance.setOptions({
			placement: this.placement,
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [this.skidding, this.distance],
					},
				},
			],
		});
		this.popperInstance.update();
	}

	renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="dismiss-button" icon="close-small-solid" @click="${this.clickCloseHandler}" dense
	part="vvd-scheme-alternate"></vwc-icon-button>`
			: nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			'open': !!this.open,
		};
	}

	protected override render(): TemplateResult {
		return html`
			<div class="tooltip ${classMap(this.getRenderClasses())}" role="tooltip">
				<span class="tooltip-content">
					<span class="tooltip-text">${this.content}</span>
					<slot>
					</slot>
				</span>
				${this.renderDismissButton()}
				<div id="arrow" data-popper-arrow></div>
			</div>`;
	}
}
