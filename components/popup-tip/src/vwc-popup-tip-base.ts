import {
	html, LitElement, property, query
} from 'lit-element';
import type { TemplateResult } from 'lit-html';
import type { VWCTooltip } from '../../tooltip/vwc-tooltip.js';

export class VWCPopupTipBase extends LitElement {
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
	 * accepts top, bottom, right, left
	 * @public
	 * */
	@property({ type: String, reflect: true })
		placement: | 'auto'
		| 'auto-start'
		| 'auto-end'
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'left'
		| 'left-start'
		| 'left-end' = 'auto';

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

	private clickHandler() {
		if(this.tooltip.open) {
			this.tooltip.hide();
		}
		else{
			this.tooltip.show(this.iconButton);
		}
	}

	protected override render(): TemplateResult {
		return html`
			<div class="popup-tip" aria-describedby="tooltip">
				<vwc-icon-button class="iconButton" icon="info-line" shape="circled" @click="${this.clickHandler}"></vwc-icon-button>
				<vwc-tooltip class="tooltip" content=${this.content} dismissible=${this.dismissible} placement=${this.placement}></vwc-tooltip>					
			</div>`;
	}
}
