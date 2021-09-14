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

/**
 * @cssprop [side-drawer-background-color=The current theme's canvas (background) color] - Controls the background of the side drawer
 * @cssprop [side-drawer-max-inline-size=280px] - Controls the maximum inline size of the side drawer
 * @cssprop [side-drawer-min-inline-size=280px] - Controls the minimum inline size of the side drawer
 * @cssprop [side-drawer-padding-top-bar=16px] - Controls the padding of the side drawer's top bar
 * @cssprop [side-drawer-padding-body=16px] - Controls the padding of the side drawer's body
 * @cssprop [side-drawer-z-index=6] - Controls the z-index of the side drawer
 * */
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
	 * @prop type - sets the type of the side drawer's layout
	 * accepts "modal" | "dismissible"
	 * @public
	 * */
	@property({
		type: String,
		reflect: true
	})
	type?: 'modal' | 'dismissible';

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

	connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('transitionend', this.#handleTransitionEnd);
		document.addEventListener('keydown', this.#handleKeydown);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#releaseFocus();
		this.removeEventListener('transitionend', this.#handleTransitionEnd);
		document.removeEventListener('keydown', this.#handleKeydown);
	}

	protected render(): TemplateResult {
		const dismissible = this.type === 'dismissible';
		const modal = this.type === 'modal';
		const topBar = this.hasTopBar ? this.renderTopBar() : '';
		const scrim = (this.type === 'modal' && this.open) ? this.renderScrim() : '';
		const alternate = this.alternate ? 'vvd-scheme-alternate' : undefined;

		const classes = {
			'side-drawer--alternate': this.alternate,
			'side-drawer--dismissible': dismissible,
			'side-drawer--modal': modal,
			'side-drawer--open': this.open,
		};

		const aside = html`<aside
							part="${ifDefined(alternate)}"
							class="side-drawer ${classMap(classes)}">
							${topBar}

							<div class="side-drawer--content">
								<slot></slot>
							</div>
						</aside>`;

		return html`
			${dismissible ? this.renderDismissible(aside) : aside}
			${scrim}
			<slot name="app-content"></slot>
		`;
	}

	private renderDismissible(template: TemplateResult): TemplateResult {
		const classes = {
			'aside-container--open': this.open,
		};

		return html`
			<div class="aside-container ${classMap(classes)}">
				${template}
			</div>`;
	}

	private renderTopBar(): TemplateResult {
		return html`
			<div class="side-drawer--top-bar">
				<slot name="top-bar"></slot>
			</div>`;
	}

	private renderScrim(): TemplateResult {
		return html`
			<div
				class="side-drawer--scrim"
				@click="${this.#handleScrimClick}"
				@keydown="${this.#handleScrimClick}"
			></div>`;
	}

	#handleScrimClick(): void {
		if (this.type === 'modal' && this.open) {
			this.hide();
		}
	}

	#handleKeydown = ({ key }: KeyboardEvent): void => {
		if ((this.type === 'modal' || this.type === 'dismissible') && this.open && key === 'Escape') {
			this.hide();
		}
	};

	#handleTransitionEnd = (): void => {
		if (this.type === 'modal' || this.type === 'dismissible') {
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
		if (this.type === 'modal') {
			this.#trapFocus();
		}
		this.#notifyOpen();
	}

	#closed(): void {
		if (this.type === 'modal') {
			this.#releaseFocus();
		}
		this.#notifyClose();
	}

	#createDispatchEvent(eventName: string): void {
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
