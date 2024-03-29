import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import { style as BannerStyle } from './vwc-banner.css.js';
import {
	customElement, html, LitElement, property
} from 'lit-element';
import type { PropertyValues } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { nothing, TemplateResult } from 'lit-html';
import { Connotation, Role, AriaLive } from '@vonage/vvd-foundation/constants.js';
import { ariaProperty} from '@material/mwc-base/aria-property.js';
import { accessibleBannerDirective } from './accessible-banner-directive.js';

/**
 * A value for the `role` ARIA attribute.
 */
type BannerRole = Role.Status |  Role.Alert;

/**
 * A value for the `aria-live` ARIA attribute.
 */
type BannerAriaLive = AriaLive.Polite | AriaLive.Assertive;


const ANIMATION_DURATION = 100;
const KEY_ESCAPE = 'Escape';

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

const createCustomEvent = function (eventName: string, props = {}): CustomEvent {
	return new CustomEvent(eventName, {
		bubbles: true,
		composed: true,
		cancelable: false,
		...props
	});
};

//const escapeHandlers:WeakMap<VWCBanner, (this:Window, ev:KeyboardEvent)=> any> = new WeakMap();

@customElement('vwc-banner')
export class VWCBanner extends LitElement {
	static override styles = [BannerStyle];

	@property({ type: String, reflect: true })
		message = '';

	@property({ type: Boolean, reflect: true })
		dismissible = false;

	@property({ type: String, reflect: true })
		connotation?: BannerConnotation;

	@property({ type: String, reflect: true })
		icon?: string;

	@property({ type: Boolean, reflect: true })
		open = false;

  @property({type: String, reflect: true, attribute: 'role'})
  	role: BannerRole = Role.Status;

	@ariaProperty
  @property({type: String, reflect: true, attribute: 'aria-live'})
	 	ariaLive: BannerAriaLive = AriaLive.Polite;

	private clickCloseHandler() {
		this.open = false;
	}

	#transitionTimer?: number;

	protected override firstUpdated() :void {
		// refactor to query decorator
		(this.shadowRoot?.querySelector('.banner') as HTMLElement).style.setProperty('--transition-delay', `${ANIMATION_DURATION}ms`);
	}

	override updated(changedProperties:PropertyValues) :void {
		if (changedProperties.has('open')) {
			clearTimeout(this.#transitionTimer);
			this.dispatchEvent(createCustomEvent(!this.open ? 'closing' : 'opening'));
			this.#transitionTimer = setTimeout(() => {
				this.dispatchEvent(createCustomEvent(this.open ? 'opened' : 'closed'));
			}, ANIMATION_DURATION);
		}
	}

	renderDismissButton() :TemplateResult | unknown {
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
			[`connotation-${this.connotation}`]: !!this.connotation,
			'banner-open': this.open
		};
	}

	protected renderIcon(type?: string): TemplateResult {
		if (!type) {
			const connotation = this.connotation || Connotation.Info;
			type = connotationIconMap.get(connotation);
		}

		return html`<vwc-icon class="icon" .type="${type}"></vwc-icon>`;
	}

	private handleKeyDown(e: KeyboardEvent): void {
		this.open = !(e.key === KEY_ESCAPE && this.dismissible);
	}

	protected override render(): TemplateResult {
		return html`
      <div class="banner ${classMap(this.getRenderClasses())}" tabindex="0" @keydown=${this.handleKeyDown}>
				<header class="header">
					<span class="user-content">
						${this.renderIcon(this.icon)}
						${accessibleBannerDirective(this.message, this.open, this.role, this.ariaLive)}
						<slot class="action-items" name="actionItems"></slot>
					</span>
					${this.renderDismissButton()}
				</header>
			</div>
		`;
	}
}
