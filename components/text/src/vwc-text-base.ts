import {
	html, LitElement, property, TemplateResult
} from 'lit-element';


export class VWCTextBase extends LitElement {
	@property({ type: String, reflect: true })
	fontFace?: string;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
