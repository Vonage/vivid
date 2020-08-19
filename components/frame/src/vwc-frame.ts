import {
	customElement,
	html,
	LitElement,
	CSSResult,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-frame.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-frame': VWCFrame;
	}
}

/**
 * Vivid context providing component
 */
@customElement('vwc-frame')
export class VWCFrame extends LitElement {
	static get styles(): CSSResult[] {
		return [style];
	}

	render(): TemplateResult {
		return html`
			<slot></slot>
    `;
	}
}
