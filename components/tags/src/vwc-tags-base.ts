import {
	 LitElement, html, TemplateResult,
} from 'lit-element';
import { rovingIndex } from 'roving-ux';


export class VWCTagsBase extends LitElement {
	connectedCallback(): void {
		super.connectedCallback();
		rovingIndex({
			element: this, // required: the container to get roving index ux
			target: 'vwc-tag', // optional: a query selector for which children should be focusable
		});
	}

	render(): TemplateResult {
  	return html`<slot></slot>`;
	}
}
