import {
	html, LitElement, property, TemplateResult
} from 'lit-element';


type FontFace = 'body-1'
	| 'body-1-bold'
	| 'body-1-code'
	| 'body-1-link'
	| 'body-2'
	| 'body-2-bold'
	| 'body-2-code'
	| 'body-2-link'
	| 'button'
	| 'button-dense'
	| 'button-enlarge'
	| 'caption'
	| 'caption-bold'
	| 'caption-code'
	| 'caption-link'
	| 'headline-1'
	| 'headline-2'
	| 'subtitle-1'
	| 'subtitle-2'
	| 'title-1'
	| 'title-2';

export class VWCTextBase extends LitElement {
	@property({ type: String, reflect: true, attribute: 'font-face' })
	fontFace?: FontFace;

	protected render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
