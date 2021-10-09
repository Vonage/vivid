import '@vonage/vvd-core';
import {	html,	TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VWCAccordionBase } from './vwc-accordion-base.js';
import { style } from './vwc-accordion.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-accordion': VWCAccordion;
	}
}

@customElement('vwc-accordion')
export class VWCAccordion extends VWCAccordionBase {
	static override styles = style;

	protected override render(): TemplateResult {
		return html`
			<div class="accordion">
				<slot></slot>
			</div>
		`;
	}
}
