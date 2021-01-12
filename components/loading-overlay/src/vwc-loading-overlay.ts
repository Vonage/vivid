import { CSSResult } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-loading-overlay': VWCLoadingOverlay;
	}
}

const DEFAULT_DELAY = 360;
const DEFAULT_TIMEOUT = 12000;

/**
 * `vwc-loaading-overlay` is a UX improvement purposed component, to temporarily viel over a not-yet ready content
 * It allows to present to the user a fast feedback on action while not yet presenting the content while the relevant resources are still being loaded.
 *
 * @element vwc-loading-overlay
 *
 * @param {number} [delay=360] - number of millis to wait before show 'entertaining' content; attribute only; used only once upon element attachment to DOM
 * @param {number} [timeout=12000] - number of millis of maximum time the overlay is shown; attribute only; used only once upon element attachment to DOM
 *
 * @fires dismissed - notifies when the overlay is completely removed from the DOM
 */
export class VWCLoadingOverlay extends HTMLElement {
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

				.default-overlay-content,
				::slotted(*) {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			</style>
			<slot><div class="default-overlay-content"></div></slot>
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
	 * adds one or more awaited promises; overlay will be removed when ALL of the promises are settled (or timed out)
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
customElements.define('vwc-loading-overlay', VWCLoadingOverlay);

//	private commons
//
let defaultContentCSSPromise: Promise<{ style: CSSResult }> | null = null;
async function installDefaultContentStyling(
	shadowRoot: ShadowRoot
): Promise<void> {
	if (!defaultContentCSSPromise) {
		defaultContentCSSPromise = import('./vwc-loading-overlay-default.css');
	}
	const cssText = (await defaultContentCSSPromise).style.cssText;
	const se = document.createElement('style');
	se.innerHTML = cssText;
	shadowRoot.appendChild(se);
}
