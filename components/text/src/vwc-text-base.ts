import '@vonage/vvd-core';
import type { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';
import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import type { ClassInfo } from 'lit-html/directives/class-map';
import type { Connotation } from '@vonage/vvd-foundation/constants';

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
	@property({ type: String, reflect: true, attribute: 'font-face' })
	fontFace?: VVDFontFace;

	@property({ type: String, reflect: true })
	connotation?: TextConnotation;

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`font-face-${this.fontFace}`]: !!this.fontFace,
		};
	}

	protected override render(): TemplateResult {
		return html`<slot class="vwc-text ${classMap(this.getRenderClasses())}"></slot>`;
	}
}
