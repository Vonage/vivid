import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement, property, LitElement, CSSResult } from 'lit-element';
import { style as vwcNoteStyle } from './vwc-note.css';
import { Connotation } from '@vonage/vvd-foundation/constants';
import { html, TemplateResult } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-note': VWCNote;
	}
}

@customElement('vwc-note')
export class VWCNote extends LitElement {
	static get styles(): CSSResult[] {
		return [vwcNoteStyle];
	}

	@property({ type: String, reflect: true })
	connotation?: Connotation;

	protected render(): TemplateResult {
		return html``;
	}
}
