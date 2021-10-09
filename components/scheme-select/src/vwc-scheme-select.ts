import '@vonage/vvd-core';
import '@vonage/vwc-button';
import { html, TemplateResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import vvdScheme, {
	AutoScheme,
	PredefinedScheme,
	SchemeOption,
} from '@vonage/vvd-scheme';

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
