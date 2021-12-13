import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import {ClassInfo, classMap} from 'lit-html/directives/class-map.js';
import {nothing} from 'lit-html';
import '@vonage/vwc-icon-button';


export class VWCPopupBase extends LitElement {
	/**
	 * @prop open - indicates whether the popup is open
	 * accepts boolean value
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
	 * @prop tail - adds small triangle to indicate the trigger element
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		tail?: false;

	#renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="dismiss-button" icon="close-small-solid" shape="circled" dense></vwc-icon-button>`
			: nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			['popup-tail']: !!this.tail,
		};
	}

	protected override render(): TemplateResult {
		return html`
			<!-- TODO: role="?"-->
			<div aria-hidden=${this.open ? 'false' : 'true'} class="vwc-popup ${classMap(this.getRenderClasses())}">
				<slot></slot>
				${this.#renderDismissButton()}
			</div>
		`;
	}
}
