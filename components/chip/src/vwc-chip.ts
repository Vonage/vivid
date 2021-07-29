import '@vonage/vvd-core';
import '@vonage/vwd-icon';
import {
	customElement, LitElement, html, property, TemplateResult
} from 'lit-element';
import { style } from './vwc-chip.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

@customElement('vwc-chip')
export class VWCChip extends LitElement {
	static styles = style;
	@property({ type: String, reflect: true })
	text?: boolean;

	@property({ type: String, reflect: true })
	icon?: boolean;

	render():TemplateResult {
		return html`<div>
			<vwc-icon type='${this.icon}'></vwc-icon>
			${this.text}
		</div>`;
	}
}
