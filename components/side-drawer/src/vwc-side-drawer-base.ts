import 'blocking-elements';
import 'wicg-inert';

import {
	html, LitElement, TemplateResult, property,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { observer } from '@material/mwc-base/observer';
import { DocumentWithBlockingElements } from 'blocking-elements';

const blockingElements =
	(document as DocumentWithBlockingElements).$blockingElements;

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
	 * @prop type - can be modal, dismissible or empty
	 * accepts String value
	 * @public
	 * */
	@property({ type: String, reflect: true })
	type = '';

	/**
	 * @prop absolute - the modal can be fixed or absolute
	 * accepts Boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
	absolute = false;

	@property({ type: Boolean, reflect: true })
	@observer(function (
		this: VWCSideDrawerBase,
		isOpen: boolean,
		wasOpen: boolean
	) {
		if (isOpen) {
			this.show();
			// wasOpen helps with first render (when it is `undefined`) perf
		} else if (wasOpen !== undefined) {
			this.close();
		}
		this.openChanged(isOpen);
	})
	open = false;
	/**
	 * Invoked when the element open state is updated.
	 *
	 * Expressions inside this method will trigger upon open state change
	 *
	 * @param _isOpen Boolean of open state
	 */ openChanged(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_isOpen: boolean
		// eslint-disable-next-line @typescript-eslint/no-empty-function
	): void {}

	/**
	 * Opens the drawer from the closed state.
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the drawer from the open state.
	 */
	close(): void {
		this.open = false;
	}

	/**
	 * Side drawer finished open animation.
	 */
	#opened(): void {
		this.trapFocus();
		this.notifyOpen();
	}

	/**
	 * Side drawer finished close animation.
	 */
	#closed(): void {
		this.releaseFocus();
		this.notifyClose();
	}

	notifyClose(): void {
		const init: CustomEventInit = { bubbles: true, composed: true };
		const ev = new CustomEvent('closed', init);
		this.open = false;
		this.dispatchEvent(ev);
	}

	notifyOpen(): void {
		const init: CustomEventInit = { bubbles: true, composed: true };
		const ev = new CustomEvent('opened', init);
		this.open = true;
		this.dispatchEvent(ev);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.releaseFocus();
	}

	trapFocus(): void {
		blockingElements.push(this);
	}

	releaseFocus(): void {
		blockingElements.remove(this);
	}

	#handleScrimClick(): void {
		if (this.type === 'modal' && this.open) {
			this.close();
		}
	}

	#onKeydown({ key }: KeyboardEvent): void {
		console.log(this.type, this.open, key);
		if (this.type === 'modal' && this.open && key === 'Escape') {
			this.close();
		}
	}

	onTransitionEnd(): void {
		if (this.type === 'modal') {
			// when side drawer finishes open animation
			if (this.open) {
				this.#opened();
			} else {
				// when side drawer finishes close animation
				this.#closed();
			}
		}
	}

	private renderTopBar(): TemplateResult {
		return html`<div class="vvd-side-drawer--top-bar">
			<slot name="top-bar"></slot>
		</div>`;
	}

	private renderScrim(): TemplateResult {
		// eslint-disable-next-line lit-a11y/click-events-have-key-events
		return html`<div
			class="vvd-side-drawer--scrim ${this.absolute
		? 'vvd-side-drawer--absolute'
		: ''}"
			@click="${this.#handleScrimClick}"
		></div>`;
	}

	/**
	 * the html markup
	 * @internal
	 * */
	protected render(): TemplateResult {
		const dismissible = this.type === 'dismissible' || this.type === 'modal';
		const modal = this.type === 'modal';
		const topBar = this.hasTopBar ? this.renderTopBar() : '';
		const scrim = this.type === 'modal' && this.open ? this.renderScrim() : '';
		const alternate = this.alternate ? 'vvd-scheme-alternate' : undefined;
		const absolute = this.type === 'modal' && this.absolute;

		const classes = {
			'vvd-side-drawer--alternate': this.alternate,
			'vvd-side-drawer--dismissible': dismissible,
			'vvd-side-drawer--modal': modal,
			'vvd-side-drawer--open': this.open,
			'vvd-side-drawer--absolute': absolute,
		};

		return html`
			<aside
				part="${ifDefined(alternate)}"
				class="side-drawer ${classMap(classes)}"
				@keydown=${this.#onKeydown}
				@transitionend=${this.onTransitionEnd}
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
