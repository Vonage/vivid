import 'blocking-elements';
import 'wicg-inert';

import {
	html, LitElement, TemplateResult, property,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { DocumentWithBlockingElements } from 'blocking-elements';

const blockingElements =
	(document as DocumentWithBlockingElements).$blockingElements;

export class VWCSideDrawerBase extends LitElement {
	/**
	 * @prop alternate - [Applies scheme alternate region](../../common/scheme/readme.md)
	 * accepts boolean value
	 * @public
	 * */
	@property({
		type: Boolean,
		reflect: true
	})
	alternate = false;

	/**
	 * @prop hasTopBar - adds top bar to the side drawer
	 * accepts boolean value
	 * @public
	 * */
	@property({
		type: Boolean,
		reflect: true
	})
	hasTopBar?: boolean;

	/**
	 * @prop type - can be modal, dismissible or empty
	 * accepts String value
	 * @public
	 * */
	@property({
		type: String,
		reflect: true
	})
	type = '';

	/**
	 * @prop absolute - the modal can be fixed or absolute
	 * accepts Boolean value
	 * @public
	 * */
	@property({
		type: Boolean,
		reflect: true
	})
	absolute = false;

	@property({
		type: Boolean,
		reflect: true
	})
	open = false;

	/**
	 * Opens the side drawer from the closed state.
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the side drawer from the open state.
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('transitionend', this.#onTransitionEnd);
		this.addEventListener('keydown', this.#onKeydown);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#releaseFocus();
		this.removeEventListener('transitionend', this.#onTransitionEnd);
		this.removeEventListener('keydown', this.#onKeydown);
	}

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
			>
				${topBar}

				<div class="vvd-side-drawer--content">
					<slot></slot>
				</div>
			</aside>

			${scrim}
		`;
	}

	private renderTopBar(): TemplateResult {
		return html`
			<div class="vvd-side-drawer--top-bar">
				<slot name="top-bar"></slot>
			</div>`;
	}

	private renderScrim(): TemplateResult {
		return html`
				<div
						class="vvd-side-drawer--scrim ${this.absolute ? 'vvd-side-drawer--absolute' : ''}"
						@click="${this.#handleScrimClick}"
						@keydown="${this.#handleScrimClick}"
				></div>`;
	}

	#handleScrimClick(): void {
		if (this.type === 'modal' && this.open) {
			this.hide();
		}
	}

	#onKeydown = ({ key }: KeyboardEvent): void => {
		if (this.type === 'modal' && this.open && key === 'Escape') {
			this.hide();
		}
	};

	#onTransitionEnd = (): void => {
		if (this.type === 'modal') {
			// when side drawer finishes open animation
			if (this.open) {
				this.#opened();
			} else {
				// when side drawer finishes hide animation
				this.#closed();
			}
		}
	};

	#opened(): void {
		this.#trapFocus();
		this.#notifyOpen();
	}

	#closed(): void {
		this.#releaseFocus();
		this.#notifyClose();
	}

	#createDispatchEvent(eventName: string) {
		const init: CustomEventInit = {
			bubbles: true,
			composed: true
		};
		const ev = new CustomEvent(eventName, init);
		this.dispatchEvent(ev);
	}

	#notifyClose(): void {
		this.#createDispatchEvent('closed');
	}

	#notifyOpen(): void {
		this.#createDispatchEvent('opened');
	}

	#trapFocus(): void {
		blockingElements.push(this);
		this.#createDispatchEvent('trapFocus');
	}

	#releaseFocus(): void {
		blockingElements.remove(this);
		this.#createDispatchEvent('releaseFocus');
	}
}
