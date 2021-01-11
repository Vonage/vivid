import { CSSResult } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-loading-veil': VWCLoadingVeil;
	}
}

const DEFAULT_DELAY = 360;
const DEFAULT_TIMEOUT = 12000;

/**
 * `vwc-loading-veil` is a UX improvement purposed component
 * It allows to present to the user a fast feedback on action while not yet presenting the content while the relevant resources are still being loaded.
 */
export class VWCLoadingVeil extends HTMLElement {
	private awaiteesCount = 0;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' }).innerHTML = `
			<style>
				:host {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: var(--vvd-color-base, #fff);
					pointer-events: none;
					z-index: 999999;
					transition: opacity 160ms;
				}

				:host(:not(.entertain)) > * {
					display: none;
				}

				.default-veil-content,
				::slotted(*) {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			</style>
			<slot><div class="default-veil-content"></div></slot>
		`;
	}

	connectedCallback(): void {
		const delayAttr = parseInt(this.getAttribute('delay') as string);
		const delay = isNaN(delayAttr) ? DEFAULT_DELAY : delayAttr;
		const timeoutAttr = parseInt(this.getAttribute('timeout') as string);
		const timeout = isNaN(timeoutAttr) ? DEFAULT_TIMEOUT : timeoutAttr;

		/* eslint-disable wc/no-self-class */
		setTimeout(() => this.classList.add('entertain'), delay);
		setTimeout(() => this.remove(), timeout);

		if (!this.childElementCount) {
			installDefaultContentStyling(this.shadowRoot as ShadowRoot);
		}
	}

	disconnectedCallback(): void {
		this.dispatchEvent(
			new CustomEvent('dismissed', { bubbles: true, composed: true })
		);
	}

	remove(): void {
		this.addEventListener('transitionend', () => super.remove());
		this.style.opacity = '0';
	}

	/**
	 * adds one or more awaited promises; veil will be removed when ALL of the promises are settled (or timed out)
	 * - awaiting is for 'settled' state, regardless of resolved or rejected
	 *
	 * @param {Promise<unknown>[] | Promise<unknown>} awaitees - one or more promises to wait for
	 */
	waitFor(awaitees: Promise<unknown>[] | Promise<unknown>): void {
		for (const awaitee of Array.isArray(awaitees) ? awaitees : [awaitees]) {
			this.awaiteesCount++;
			awaitee.finally(() => this.awaiteeDone());
		}
	}

	private awaiteeDone(): void {
		if (--this.awaiteesCount === 0) {
			this.remove();
		}
	}
}
customElements.define('vwc-loading-veil', VWCLoadingVeil);

//	private commons
//
let defaultContentCSSPromise: Promise<{ style: CSSResult }> | null = null;
async function installDefaultContentStyling(
	shadowRoot: ShadowRoot
): Promise<void> {
	if (!defaultContentCSSPromise) {
		defaultContentCSSPromise = import('./vwc-loading-veil-default.css');
	}
	const cssText = (await defaultContentCSSPromise).style.cssText;
	const se = document.createElement('style');
	se.innerHTML = cssText;
	shadowRoot.appendChild(se);
}
