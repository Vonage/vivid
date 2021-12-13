import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map.js';
import { nothing } from 'lit-html';

export class VWCPopupBase extends LitElement {
	/**
	 * @prop open - indicates whether the popup is open
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		open = false;

	/**
	 * @prop dismissible - adds close button to the popup
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		dismissible?: false;

	/**
	 * @prop hasTail - adds small triangle to indicate the trigger element
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		hasTail?: false;

	/**
	 * Opens the tooltip
	 * @public
	 */
	 show(): void {
		this.open = true;
	 }

	/**
	 * Closes the tooltip
	 * @public
	 */
	 hide(): void {
		this.open = false;
	}

	#renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="popup-dismissible" icon="close-small-solid" shape="circled" dense></vwc-icon-button>`
			: nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			['popup-tail']: !!this.hasTail,
			['popup-open']: !!this.open
		};
	}

	protected override render(): TemplateResult {
		return html`
			<!-- TODO: role="?"-->
			<div class="popup ${classMap(this.getRenderClasses())}" aria-hidden=${this.open ? 'false' : 'true' }>
				<slot></slot>
				${this.#renderDismissButton()}
			</div>
		`;
	}
}
