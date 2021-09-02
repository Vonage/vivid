import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import { style as BannerStyle } from './vwc-banner.css';
import {
	customElement, html, LitElement, property, PropertyValues
} from 'lit-element';
import { nothing } from 'lit-html';
import { Connotation } from '@vonage/vvd-foundation/constants';

const ANIMATION_DURATION = 100;
const KEY_ESCAPE = 'Escape';

type BannerConnotation =
	Connotation.Info |
	Connotation.Announcement |
	Connotation.Success |
	Connotation.Warning |
	Connotation.Alert;

declare global {
	interface HTMLElementTagNameMap {
		'vwc-banner': VWCBanner;
	}
}

const connotationToIconType = function (connotation:BannerConnotation):string {
	return ({
		[Connotation.Info]: 'info-solid',
		[Connotation.Announcement]: 'megaphone-solid',
		[Connotation.Success]: 'check-circle-solid',
		[Connotation.Warning]: 'warning-solid',
		[Connotation.Alert]: 'error-solid'
	})[connotation];
};

const createCustomEvent = function (eventName:string, props = {}):CustomEvent {
	return new CustomEvent(eventName, {
		bubbles: true,
		composed: true,
		cancelable: false,
		...props
	});
};

const escapeHandlers:WeakMap<VWCBanner, (this:Window, ev:KeyboardEvent)=> any> = new WeakMap();

@customElement('vwc-banner')
export class VWCBanner extends LitElement {
	static styles = [BannerStyle];

	@property({ type: String, reflect: true })
	message = '';

	@property({ type: Boolean, reflect: true })
	dismissible?:boolean;

	@property({ type: String, reflect: true })
	connotation:BannerConnotation = Connotation.Info;

	@property({ type: String, reflect: true })
	icon?:string;

	@property({ type: Boolean, reflect: true })
	open = false;

	private clickCloseHandler() {
		this.open = false;
	}

	#transitionTimer?:number;

	protected firstUpdated() {
		(this.shadowRoot?.querySelector('.container') as HTMLElement).style.setProperty('--transition-delay', `${ANIMATION_DURATION}ms`);
	}

	connectedCallback() {
		super.connectedCallback();
		const handler = ((ev:KeyboardEvent) => ((ev.key === KEY_ESCAPE) && (this.open = false)));
		escapeHandlers.set(this, handler);
		window?.addEventListener('keydown', handler);
	}
	disconnectedCallback() {
		window?.removeEventListener('keydown', escapeHandlers.get(this) as ()=>any);
		super.disconnectedCallback();
	}

	updated(changedProperties:PropertyValues) {
		if (changedProperties.has('open')) {
			clearTimeout(this.#transitionTimer);
			this.dispatchEvent(createCustomEvent(!this.open ? 'closing' : 'opening'));
			this.#transitionTimer = setTimeout(() => {
				this.dispatchEvent(createCustomEvent(this.open ? 'opened' : 'closed'));
			}, ANIMATION_DURATION);
		}
	}

	renderDismissButton() {
		return this.dismissible
			? html`<vwc-icon-button
								class="dismiss-button"
								icon="close-line"
								@click="${this.clickCloseHandler}"
								dense></vwc-icon-button>`
			: nothing;
	}

	render() {
		return html`
			<div class="container">
				<header class="header">
					<span class="user-content">
						<vwc-icon class="icon" type="${this.icon ?? connotationToIconType(this.connotation)}"></vwc-icon>
						<div role="alert" class="message">${this.message}</div>
						<slot class="action-items" name="actionItems"></slot>
					</span>
					${this.renderDismissButton()}
				</header>
			</div>
		`;
	}
}
