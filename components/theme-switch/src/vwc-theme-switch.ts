import '@vonage/vvd-core';
import '@vonage/vwc-switch';
import {
	customElement,
	LitElement,
	property,
	html,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-theme-switch.css.js';
import {
	default as vvdScheme,
	SchemeOption,
} from '@vonage/vvd-scheme/vvd-scheme.js';
import { Subscription } from 'rxjs';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-theme-switch': VWCThemeSwitch;
	}
}

@customElement('vwc-theme-switch')
export class VWCThemeSwitch extends LitElement {
	static styles = style;
	@property({ reflect: true })
	scheme?: SchemeOption;

	subscription?: Subscription;

	connectedCallback(): void {
		super.connectedCallback();
		this.subscription = vvdScheme.valueChanges().subscribe({
			next: (scheme: SchemeOption) => {
				this.scheme = scheme;
			},
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.subscription?.unsubscribe();
	}

	private handleChange({ target }: InputEvent): void {
		vvdScheme.set((target as HTMLInputElement)?.checked ? 'light' : 'dark');
	}

	render(): TemplateResult {
		return html` <vwc-switch
			class="switch"
			connotation="primary"
			?checked="${this.scheme === 'light'}"
			@change=${this.handleChange}
		></vwc-switch>`;
	}
}
