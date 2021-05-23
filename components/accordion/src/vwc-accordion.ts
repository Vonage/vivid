import '@vonage/vvd-core';
import {
	customElement,
	html,
	TemplateResult
} from 'lit-element';
import { VWCAccordionBase } from './vwc-accordion-base.js';
import { style } from './vwc-accordion.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-accordion': VWCAccordion;
	}
}

@customElement('vwc-accordion')
export class VWCAccordion extends VWCAccordionBase {
	static styles = style;

	protected render(): TemplateResult {
		return html`
			<div class="accordion">
				<slot></slot>
			</div>
		`;
	}
}
