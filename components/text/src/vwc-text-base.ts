import '@vonage/vvd-core';
import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';
import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
import { Connotation } from '@vonage/vvd-foundation/constants';
import { renderPropertyToClass as renderClassFromProperty } from '@vonage/vvd-foundation/decorators';

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

	protected getRenderClassesFontFace(): ClassInfo {
		return this.fontFace ? { [`vwc-text--font-face-${this.fontFace}`]: true }	: {};
	}

	protected getRenderClassesConnotation(): ClassInfo {
		return this.connotation ? { [`vwc-text--connotation-${this.connotation}`]: true }	: {};
	}

	@renderClassFromProperty('this.connotation')
	protected getRenderClasses(): ClassInfo {
		return {
			...this.getRenderClassesFontFace(),
			...this.getRenderClassesConnotation(),
		};
	}

	protected render(): TemplateResult {
		return html`<slot class="vwc-text ${classMap(this.getRenderClasses())}"></slot>`;
	}
}
