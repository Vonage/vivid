import {
	html, LitElement, property, query
} from 'lit-element';
import type { TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import type { VWCTooltip } from '../../tooltip/vwc-tooltip.js';

export class VWCTipBase extends LitElement {
	@query('.tooltip') protected tooltip!: VWCTooltip;
	@query('.iconButton') protected iconButton!: HTMLElement;

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
		placement = 'auto';

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
	@property({ type: Number, reflect: true })
		distance = 10;

	/**
	* @prop open - indicates whether the tip is open
	* accepts boolean value
	* */
	@property({ type: Boolean, reflect: true })
		open = false;

	/**
	 * @prop icon - can be info-line or help-line icon
	 * accepts string value
	 * @public
	 * */
	@property({ type: String, reflect: true })
		icon: 'info-line' | 'help-line' = 'help-line';

	protected override updated(): void {
		this.tooltip.anchor = this.iconButton;
		this.tooltip.open = this.open;
	}

	private clickHandler() {
		if (this.tooltip.open) {
			this.open = false;
			this.tooltip.hide();
		}
		else {
			this.tooltip.anchor = this.iconButton;
			this.open = true;
			this.tooltip.show();
		}
	}

	protected override render(): TemplateResult {
		const isOpen = this.open ? true : false;
		const classes = {
			'open': isOpen,
		};

		return html`
			<div class="tip">
				<vwc-icon-button class="iconButton" icon=${this.icon} shape="circled" aria-describedby="tooltip"
					@click="${this.clickHandler}"></vwc-icon-button>
				<vwc-tooltip id="tooltip" class="tooltip ${classMap(classes)}" content=${this.content} dismissible=${this.dismissible}
					exportparts="vvd-scheme-alternate" placement=${this.placement}></vwc-tooltip>
			</div>`;
	}
}
