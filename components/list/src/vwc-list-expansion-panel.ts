import {
	customElement,
	html,
	LitElement,
	property,
	TemplateResult,
} from 'lit-element';
import { style } from './vwc-list-expansion-panel.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-list-expansion-panel': VWCListExpansionPanel;
	}
}

/**
 * This component support expand-collapse list
 */
@customElement('vwc-list-expansion-panel')
export class VWCListExpansionPanel extends LitElement {
	static styles = style;

	@property({ type: Boolean, reflect: true }) open = false;

	@property({ type: Boolean }) quick = false;

	close(): void {
		this.open = false;
	}

	show(): void {
		this.open = true;
	}

	render(): TemplateResult {
		return html`<div class="expansion-panel"><slot></slot></div>`;
	}
}
