import {
	customElement,
	html,
	TemplateResult
} from 'lit-element';
import { VWCExpansionPanelListBase } from './vwc-expansion-panel-list-base.js';
import { style } from './vwc-expansion-panel-list.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-expansion-panel-list': VWCExpansionPanelList;
	}
}

@customElement('vwc-expansion-panel-list')
export class VWCExpansionPanelList extends VWCExpansionPanelListBase {
	static styles = style;

	protected render(): TemplateResult {
		return html`
			<div class="expansion-panel-list">
				<slot></slot>
			</div>
		`;
	}
}
