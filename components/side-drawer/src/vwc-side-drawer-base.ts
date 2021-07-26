import {
	html, LitElement, TemplateResult, property
} from 'lit-element';

import { nothing } from 'lit-html';
export class VWCSideDrawerBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	alternate?: boolean;

	protected render(): TemplateResult {
		return html`
			<div class="side-drawer" part=${this.alternate ? 'vvd-scheme-alternate' ? nothing }>
				<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
					<slot name="navigation"></slot>
				</vwc-list>
			</div>`;
	}
}
