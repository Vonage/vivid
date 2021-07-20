import '@vonage/vvd-core';
import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';
import {
	html, LitElement, property, TemplateResult
} from 'lit-element';


export class VWCTextBase extends LitElement {
	@property({ type: String, reflect: true, attribute: 'font-face' })
	fontFace?: VVDFontFace;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}