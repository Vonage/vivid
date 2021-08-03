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
	@property({ type: Boolean, reflect: true })
	open = false;

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
	 	const topBar = this.hasTopBar
	 		? this.renderTopBar()
	 		: nothing;

	 	const alternate = this.alternate
	 		? 'vvd-scheme-alternate'
	 		: undefined;

	 	const classes = {
	 		'vvd-side-drawer--alternate': this.alternate,
	 		// 'vvd-side-drawer--modal': this.modal, // !@rinaok use with modal
	 	};

	 	return html`
			<aside
				part="${ifDefined(alternate)}"
				class="side-drawer ${classMap(classes)}"
			>
				${topBar}

				<div class="vvd-side-drawer--content">
					<slot></slot>
				</div>
			</aside>
		`;
	 }

	 private renderModalDrawer(drawer: TemplateResult) {
	 	return html`
			<vwc-surface
				class="vwc-surface"
				absolute
				x="0"
				y="0"
				quick
				?open=${this.open}
			>
				${drawer}
			</vwc-surface>`;
	 }
	 // ${this.modal ? html`<vwc-surface>${this.renderAside()}</vwc-surface>` : this.renderAside()}

	 /**
	 * the html markup
	 * @internal
	 * */
	 protected render(): TemplateResult {
	 	const drawer = this.renderSideDrawer();
	 	return this.modal
	 		? this.renderModalDrawer(drawer)
	 		: drawer;
	 }
}
