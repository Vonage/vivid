import {
	html, LitElement, property, query
} from 'lit-element';
import type { TemplateResult } from 'lit-html';
import '@vonage/vwc-popup';


export class VWCTooltipBase extends LitElement {
	//@query('.popup') protected popup!: ;
	@query('.iconButton') protected iconButton!: HTMLElement;

	/**
	 * @prop content - the content of the tooltip
	 * accepts string
	 * @public
	 * */
	@property({ type: String, reflect: true })
		content?: string;

	/**
	 * @prop icon - can be info-line or help-line icon
	 * accepts string value
	 * @public
	 * */
	@property({ type: String, reflect: true })
		icon: 'info-line' | 'help-line' = 'help-line';

	/**
	 * @prop placement - the placement of the tooltip
	 * accepts auto, auto-start, auto-end, top, top-start, top-end, bottom, bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end
	 * @public
	 * */
	@property({ type: String, reflect: true })
		placement = 'auto';

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

	protected override updated(): void {
		// if(this.popup.open){
		// 	this.popup.anchor = this.iconButton;
		// 	this.popup.show();
		// }
		// else{
		// 	this.popup.hide();
		// }
	}

	private clickHandler() {
		// this.popup.anchor = this.iconButton;
		// this.open = true;
		// this.popup.show();
	}

	private clickCloseHandler() {
		//this.hide();
	}


	#renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="dismiss-button" icon="close-small-solid" shape="circled" dense
				@click="${this.clickCloseHandler}"></vwc-icon-button>`
			: 'nothing';
	}

	protected override render(): TemplateResult {
		return html`
				<vwc-icon-button icon=${this.icon} class="iconButton"  shape="circled" aria-describedby="tooltip" aria-haspopup="true" @click="${this.clickHandler}"></vwc-icon-button>
					<vwc-popup corner="bottom" arrow open alternate="true" exportparts="vvd-scheme-alternate" placement=${this.placement}>
						<div class="tooltip">
							<header part="vvd-scheme-alternate" class="tooltip-header">
								<div class="tooltip-title">${this.content}</div>
								${this.#renderDismissButton()}
							</header>
						</div>
					</vwc-popup>
			`;
	}
}
