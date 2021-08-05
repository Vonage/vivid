import {
	html, LitElement, TemplateResult, property,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { observer } from '@material/mwc-base/observer';

/**
 * @slot header - The content of the header.
 * @slot navigation - For vwc-list-item, vwc-list-expansion-panel, paragraph etc.
 *
 * @summary This is MyElement
 *
 */
export class VWCSideDrawerBase extends LitElement {
	@property({ type: Boolean, reflect: true })
	@observer(function (
		this: VWCSideDrawerBase,
		isOpen: boolean,
		wasOpen: boolean
	) {
		if (isOpen) {
			this.open();
			// wasOpen helps with first render (when it is `undefined`) perf
		} else if (wasOpen !== undefined) {
			this.close();
		}

		this.openChanged(isOpen);
	})
	open = true;

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

	// TODO still focus and trap focus on modal open
	/**
	 * @prop modal
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: String, reflect: true })
	type = '';

	#handleScrimClick(): void {
		this.#close();
	}

	disconnectedCallback() {
		document.removeEventListener('keydown', this.#onKeydown);
	}

	#open(): void {
		this.open = true;
		// TODO add notifyClose (dispatch event) // add @fires jsdoc
		document.addEventListener('keydown', this.#onKeydown);
	}

	#close(): void {
		this.open = false;
		// TODO add notifyClose (dispatch event) // add @fires jsdoc
		document.removeEventListener('keydown', this.#onKeydown);
	}

	private renderTopBar(): TemplateResult {
		return html`<div class="vvd-side-drawer--top-bar">
			<slot name="top-bar"></slot>
		</div>`;
	}

	private renderScrim(): TemplateResult {
		// eslint-disable-next-line lit-a11y/click-events-have-key-events
		return html`<div class="vvd-side-drawer--scrim" @click="${this.#handleScrimClick}"></div>`;
	}

	#onKeydown({ key }: KeyboardEvent): void {
		console.log(this.type, this.open, key);
		if (this.type === 'modal' && this.open && key === 'Escape') {
			this.#close();
		}
	}


	/**
	 * the html markup
	 * @internal
	 * */
	 protected render(): TemplateResult {
	 	const dismissible = this.type === 'dismissible' || this.type === 'modal';
	 	const modal = this.type === 'modal';
	 	const topBar = this.hasTopBar	? this.renderTopBar()	: '';
	 	const scrim = (this.type === 'modal' && this.open) ? this.renderScrim() : '';
	 	const alternate = this.alternate ? 'vvd-scheme-alternate'	: undefined;

	 	const classes = {
	 		'vvd-side-drawer--alternate': this.alternate,
	 		'vvd-side-drawer--dismissible': dismissible,
	 		'vvd-side-drawer--modal': modal,
			'vvd-side-drawer--open': this.open
	 	};

	 	return html`
			<aside
				part="${ifDefined(alternate)}"
				class="side-drawer ${classMap(classes)}"
				@keydown=${this.#onKeydown}
			>
				${topBar}

				<div class="vvd-side-drawer--content">
					<slot></slot>
				</div>
			</aside>

			${scrim}
		`;
	 }
}
