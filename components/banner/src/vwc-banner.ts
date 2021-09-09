import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import { style as BannerStyle } from './vwc-banner.css';
import {
	customElement, html, LitElement, property, PropertyValues
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
import { nothing, TemplateResult } from 'lit-html';
import { Connotation } from '@vonage/vvd-foundation/constants.js';

const ANIMATION_DURATION = 100;

const connotationIconMap = new Map([
	[Connotation.Info, 'info-solid'],
	[Connotation.Announcement, 'megaphone-solid'],
	[Connotation.Success, 'check-circle-solid'],
	[Connotation.Warning, 'warning-solid'],
	[Connotation.Alert, 'error-solid']
]);

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

const createCustomEvent = function (eventName:string, props = {}):CustomEvent {
	return new CustomEvent(eventName, {
		bubbles: true,
		composed: true,
		cancelable: false,
		...props
	});
};

@customElement('vwc-banner')
export class VWCBanner extends LitElement {
	static styles = [BannerStyle];

	@property({ type: String, reflect: true })
	message = '';

	@property({ type: Boolean, reflect: true })
	dismissible?:boolean;

	@property({ type: String, reflect: true })
	connotation?: BannerConnotation;

	@property({ type: String, reflect: true })
	icon?:string;

	@property({ type: Boolean, reflect: true })
	open = false;

	private clickCloseHandler() {
		this.open = false;
	}

	#transitionTimer?:number;

	protected firstUpdated() {
		// refactor to query decorator
		(this.shadowRoot?.querySelector('.banner') as HTMLElement).style.setProperty('--transition-delay', `${ANIMATION_DURATION}ms`);
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

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation
		};
	}

	protected renderIcon(type?: string): TemplateResult {
		if (!type) {
			const connotation = this.connotation || Connotation.Info;
			// logical assignment not yet supported in all browsers
			// type ||= connotationIconMap.get(connotation);
			type = connotationIconMap.get(connotation);
		}

		return html`<vwc-icon class="icon" .type="${type}"></vwc-icon>`;
	}

	protected render(): TemplateResult {
		return html`
			<div class="banner ${classMap(this.getRenderClasses())}">
				<header class="header">
					<span class="user-content">
						${this.renderIcon(this.icon)}
						<div role="alert" class="message">${this.message}</div>
						<slot class="action-items" name="actionItems"></slot>
					</span>
					${this.renderDismissButton()}
				</header>
			</div>
		`;
	}
}
