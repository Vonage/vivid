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

const VVD_SCHEME_SELECT = 'vvd-scheme-select',
	EVENT_LISTENER_KEY = Symbol('scheme.select.listener');

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

	private [EVENT_LISTENER_KEY]: (e: CustomEvent<SelectedDetail>) => void;

	constructor() {
		super();
		this[EVENT_LISTENER_KEY] = VWCThemeSwitch.updateScheme.bind(this);
	}

	connectedCallback(): void {
		super.connectedCallback();
		vvdScheme.eventBus.addEventListener(
			VVD_SCHEME_SELECT,
			this[EVENT_LISTENER_KEY] as EventListener
		);
		this.scheme = vvdScheme.getSelectedSchemeOption();
		this.scheme ??= vvdScheme.getSelectedScheme();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		vvdScheme.eventBus.removeEventListener(
			VVD_SCHEME_SELECT,
			this[EVENT_LISTENER_KEY] as EventListener
		);
	}

	private static updateScheme({
		detail: { scheme },
	}: CustomEvent<SelectedDetail>): void {
		const self = (this as unknown) as VWCThemeSwitch;
		if (scheme !== self.scheme) {
			self.scheme = scheme;
		}
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
