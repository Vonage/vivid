import 'blocking-elements';
import 'wicg-inert';
import {
	html, LitElement, TemplateResult, property, query
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { classMap } from 'lit-html/directives/class-map.js';
import type { DocumentWithBlockingElements } from 'blocking-elements';

const blockingElements =
	(document as DocumentWithBlockingElements).$blockingElements;

/**
 * @cssprop [side-drawer-background-color=Current theme's canvas (background) color] - Controls the background of the side drawer
 * @cssprop [side-drawer-color=Current theme's on-canvas (text) color] - Controls the color of the side drawer
 * @cssprop [side-drawer-inline-size=280px] - Controls the inline size of the side drawer
 * @cssprop [side-drawer-padding-top-bar=16px] - Controls the padding of the side drawer's top bar
 * @cssprop [side-drawer-padding-body=16px] - Controls the padding of the side drawer's body
 * @cssprop [side-drawer-z-index=6] - Controls the z-index of the side drawer
 * */
export class VWCSideDrawerBase extends LitElement {
	@query('.side-drawer') protected rootEl!: HTMLElement;

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
	 * @prop modal - sets the side drawer's type to modal
	 * accepts boolean value
	 * @public
	 * */
	@property({
		type: Boolean,
		reflect: true
	})
		modal = false;

	/**
	* @prop open - indicates whether the side drawer is open
	* accepts boolean value
	* */
	@property({
		type: Boolean,
		reflect: true
	})
		open = false;

	/**
	 * @prop side - sets the side of the side drawer
	 * accepts "start" | "end"
	 * @public
	 * */
	@property({
		type: String,
		reflect: true
	})
		position?: 'start' | 'end';

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

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#releaseFocusTrap();
	}

	protected override render(): TemplateResult {
		const topBar = this.hasTopBar ? this.renderTopBar() : '';
		const scrim = (this.modal && this.open) ? this.renderScrim() : '';
		const alternate = this.alternate ? 'vvd-scheme-alternate' : undefined;
		const end = this.position === 'end';

		const classes = {
			'side-drawer-alternate': this.alternate,
			'side-drawer-modal': this.modal,
			'side-drawer-open': this.open,
			'side-drawer-end': end,
		};

		return html`
			<aside part="${ifDefined(alternate)}" class="side-drawer ${classMap(classes)}"
				@transitionend=${this.#handleTransitionEnd} @keydown=${this.#handleKeydown}>

				${topBar}

				<div class="side-drawer-content">
					<slot></slot>
				</div>
			</aside>

			<div class="side-drawer-app-content">
				<slot name="app-content"></slot>
			</div>

			${scrim}
		`;
	}

	private renderTopBar(): TemplateResult {
		return html`
			<header class="side-drawer-top-bar">
				<slot name="top-bar"></slot>
			</header>`;
	}

	private renderScrim(): TemplateResult {
		return html`
			<div class="side-drawer-scrim" @click="${this.#handleScrimClick}" @keydown="${this.#handleScrimClick}"></div>`;
	}

	#handleScrimClick(): void {
		if (this.modal && this.open) {
			this.hide();
		}
	}

	#handleKeydown = ({ key }: KeyboardEvent): void => {
		if (this.open && key === 'Escape') {
			this.hide();
		}
	};

	#handleTransitionEnd = (): void => {
		// when side drawer finishes open animation
		if (this.open) {
			this.#opened();
		} else {
			// when side drawer finishes hide animation
			this.#closed();
		}
	};

	#opened(): void {
		if (this.modal) {
			this.#trapFocus();
		}
		this.#notifyOpen();
	}

	#closed(): void {
		if (this.modal) {
			this.#releaseFocusTrap();
		}
		this.#notifyClose();
	}

	#createAndDispatchEvent(eventName: string): void {
		const init: CustomEventInit = {
			bubbles: true,
			composed: true
		};
		const ev = new CustomEvent(eventName, init);
		this.dispatchEvent(ev);
	}

	#notifyClose(): void {
		this.#createAndDispatchEvent('closed');
	}

	#notifyOpen(): void {
		this.#createAndDispatchEvent('opened');
	}

	#trapFocus(): void {
		blockingElements.push(this.rootEl);
	}

	#releaseFocusTrap(): void {
		blockingElements.remove(this.rootEl);
	}
}
