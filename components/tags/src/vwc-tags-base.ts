import {
	 LitElement, html, TemplateResult,
} from 'lit-element';


export class VWCTagsBase extends LitElement {
	connectedCallback(): void {
		super.connectedCallback();
	}

	render(): TemplateResult {
  	return html`<slot></slot>`;
	}
}
