import '@vonage/vvd-core';
import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';
import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { Connotation } from '@vonage/vvd-foundation/constants';

type TextConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Announcement
	| Connotation.Info
	| Connotation.Success
	| Connotation.Alert
	>;

export class VWCTextBase extends LitElement {
	@property({ type: String, reflect: true })
	fontFace?: VVDFontFace;

	@property({ type: String, reflect: true })
	connotation?: TextConnotation;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
