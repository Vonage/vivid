import '@vonage/vvd-core';
import '@vonage/vwc-switch';
import {
	customElement,
	LitElement,
	property,
	html,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-theme-switch.css';
import {
	default as vvdScheme,
	PredefinedScheme,
	SchemeOption,
	SelectedDetail,
} from '@vonage/vvd-scheme/vvd-scheme.js';

const VVD_SCHEME_SELECT = 'vvd-scheme-select';

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

	connectedCallback(): void {
		super.connectedCallback();
		vvdScheme.eventBus.addEventListener(
			VVD_SCHEME_SELECT,
			this.updateScheme as EventListener
		);
		this.scheme = vvdScheme.getSelectedSchemeOption();
		this.scheme ??= vvdScheme.getSelectedScheme();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		vvdScheme.eventBus.removeEventListener(
			VVD_SCHEME_SELECT,
			this.updateScheme as EventListener
		);
	}

	private updateScheme(event: CustomEvent<SelectedDetail>): void {
		(event.target as VWCThemeSwitch).scheme = event.detail.scheme;
	}

	private handleChange({ target }: InputEvent): void {
		vvdScheme.set(
			(target as HTMLInputElement)?.checked
				? PredefinedScheme.LIGHT
				: PredefinedScheme.DARK
		);
	}

	render(): TemplateResult {
		return html` <vwc-switch
			class="switch"
			connotation="primary"
			?checked="${this.scheme === PredefinedScheme.LIGHT}"
			@change=${this.handleChange}
		></vwc-switch>`;
	}
}
