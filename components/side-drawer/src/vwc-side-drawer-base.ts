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
	 * @prop hasTopBar - adds top bar to the side drawer
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
	hasTopBar?: boolean;

	/**
	 * @prop modal
	 * accepts boolean value
	 * @public
	 * */
	 @property({ type: Boolean, reflect: true })
	 modal?: boolean;

	 private renderTopBar(): TemplateResult {
	 	return html`<div class="vvd-side-drawer--top-bar">
			<slot name="top-bar"></slot>
		</div>`;
	 }

	 /**
	 * @prop modal
	 * accepts boolean value
	 * @public
	 * */
	 protected renderSideDrawer(): TemplateResult {
	 	const classes = {
	 		'vvd-side-drawer--alternate': this.alternate,
	 		//'vvd-side-drawer--modal': this.modal, // !@rinaok use with modal
	 	};
	 	return html`
			<aside
				part="${ifDefined(
		(this.alternate && 'vvd-scheme-alternate') || undefined
	)}"
				class="side-drawer ${classMap(classes)}"
			>
				${this.hasTopBar ? this.renderTopBar() : nothing}

				<div class="vvd-side-drawer--content">
					<slot></slot>
				</div>
			</aside>
		`;
	 }

	 // ${this.modal ? html`<vwc-surface>${this.renderAside()}</vwc-surface>` : this.renderAside()}

	 /**
	 * the html markup
	 * @internal
	 * */
	 protected render(): TemplateResult {
	 	return html`
			<vwc-surface fixed x="0" y="0" class="mdc-menu mdc-menu-surface">
				${this.renderSideDrawer()}
			</vwc-surface>
		`;
	 }
}
