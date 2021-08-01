import {
	html, LitElement, TemplateResult, property,
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

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
	alternate?: boolean;

	/**
	 * @prop hasHeader - adds header to the side drawer
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
	hasHeader?: boolean;

	get alternateValue(): string | undefined {
		return this.alternate ? 'vvd-scheme-alternate' : undefined;
	}

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		return html`
			<aside part="${ifDefined(this.alternateValue)}">
				<div class="side-drawer" part="${ifDefined(this.alternateValue)}">
					${this.hasHeader ? html`<slot name="header"></slot>` : nothing}
					<vwc-list
						innerRole="navigation"
						innerAriaLabel="Primary navigation"
						itemRoles="link"
					>
						<slot name="navigation"></slot>
					</vwc-list>
				</div>
			</aside>
		`;
	}
}
