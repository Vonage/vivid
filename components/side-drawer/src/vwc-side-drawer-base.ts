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
			</div>
			<slot name="appContent"></slot>
			<vwc-button unelevated @click="${this.handleClick}">Toggle</vwc-button>
			`;
	}

	protected handleClick():void {
		const sideDrawer = this.shadowRoot?.querySelector('.side-drawer');
		if (sideDrawer) {
			sideDrawer.classList.contains('close') ? sideDrawer.classList.remove('close') : sideDrawer.classList.add('close');
		}
	}
}
