import '@vonage/vvd-core';
import '@vonage/vwc-button';
import {
	customElement, html, LitElement, TemplateResult
} from 'lit-element';
import vvdScheme, {
	AutoScheme,
	PredefinedScheme,
} from '@vonage/vvd-scheme';
import type { SchemeOption } from '@vonage/vvd-scheme';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-scheme-select': VWCSchemeSelect;
	}
}

@customElement('vwc-scheme-select')
export class VWCSchemeSelect extends LitElement {
	schemes: SchemeOption[] = [
		AutoScheme.SYNC_WITH_OS_SETTINGS,
		PredefinedScheme.LIGHT,
		PredefinedScheme.DARK,
	];

	override render(): TemplateResult {
		return html`
			${this.schemes.map(
		scheme => html`
						<vwc-button
							dense
							unelevated
							layout="filled"
							connotation="cta"
							class="${scheme}"
							@click="${() => vvdScheme.set(scheme)}"
						>
							${scheme}
						</vwc-button>
					`
	)}
		`;
	}
}
