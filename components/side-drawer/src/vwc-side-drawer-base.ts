import {
	html, LitElement, TemplateResult, property,
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';

/**
 * @slot header - The content of the header.
 * @slot navigation - For vwc-list-item, vwc-list-expansion-panel, paragraph etc.
 *
 * @summary This is MyElement
 *
 */
export class VWCSideDrawerBase extends LitElement {
	/**
	 * @prop alternate - [Applies scheme alternate region](../../common/scheme/readme.md)
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
	alternate = false;

	/**
	 * @prop hasHeader - adds header to the side drawer
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
	hasHeader?: boolean;


	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		const classes = {
			'vvd-side-drawer--alternate': this.alternate,
			// 'vvd-side-drawer--modal': this.modal, // !@rinaok use with modal
		};
		return html`
			<aside
				part="${ifDefined((this.alternate && 'vvd-scheme-alternate') || undefined)}"
				class="side-drawer ${classMap(classes)}"
			>
				${this.hasHeader ? html`<slot name="header"></slot>` : nothing}
				<vwc-list
					innerRole="navigation"
					innerAriaLabel="Primary navigation"
					itemRoles="link"
				>
					<slot name="navigation"></slot>
				</vwc-list>
			</aside>
		`;
	}
}
