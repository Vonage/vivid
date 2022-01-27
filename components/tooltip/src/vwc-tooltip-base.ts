import {
	html, LitElement, property
} from 'lit-element';
import type { TemplateResult } from 'lit-html';
import type { Placement } from '@floating-ui/core';

export class VWCTooltipBase extends LitElement {

	/**
	 * @prop content - the content of the tooltip
	 * accepts string
	 * @public
	 * */
	@property({ type: String, reflect: true })
		text = '';

	/**
	 * @prop corner - the placement of the tooltip
	 * accepts top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end
	 * @public
	 * */
	@property({ type: String, reflect: true })
		corner?: Placement;

	/**
	 * @prop open - indicates whether the tip is open
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
	 * @prop anchor - ID reference to element in the popup’s owner document.
	 * accepts string
	 * @public
	 * */
	@property({ type: String })
		anchor = '';

	/**
	 * Opens the popup
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the popup
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	protected override render(): TemplateResult {
		return html`
					<vwc-popup .corner=${this.corner} .dismissible=${this.dismissible} .open=${this.open} .anchor=${this.anchor} arrow alternate="true" exportparts="vvd-scheme-alternate">
						<div class="tooltip">
							<header part="vvd-scheme-alternate" class="tooltip-header">
								<div class="tooltip-title">${this.text}</div>
							</header>
						</div>
					</vwc-popup>
			`;
	}
}