import {
	html, LitElement, TemplateResult, property
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export class VWCSideDrawerBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	alternate?: boolean;

	get alternateValue():string | undefined {
		return this.alternate ? 'vvd-scheme-alternate' : undefined;
	}

	protected render(): TemplateResult {
		return html`
			<div class="side-drawer" part="${ifDefined(this.alternateValue)}">
				<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
					<slot name="navigation"></slot>
				</vwc-list>
			</div>`;
	}
}
