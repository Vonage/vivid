import {
	customElement,
	property,
	html,
	LitElement,
	CSSResult,
	TemplateResult,
} from 'lit-element';
import { style as vwcLoadingVeilStyle } from './vwc-loading-veil.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-loading-veil': VWCLoadingVeil;
	}
}

const DEFAULT_DELAY = 360;
const DEFAULT_TIMEOUT = 12000;
let defaultContentCSSPromise: Promise<{ style: CSSResult }> | null = null;

@customElement('vwc-loading-veil')
export class VWCLoadingVeil extends LitElement {
	static styles = [vwcLoadingVeilStyle];

	private awaitees: Promise<unknown>[] = [];

	@property({ type: Number, reflect: true })
	private delay = DEFAULT_DELAY;

	@property({ type: Number, reflect: true })
	private timeout = DEFAULT_TIMEOUT;

	connectedCallback(): void {
		super.connectedCallback();
		if (!this.childElementCount) {
			this.installDefaultContent();
		}

		/* eslint-disable wc/no-self-class */
		setTimeout(() => this.classList.add('entertain'), this.delay);
		setTimeout(() => this.remove(), this.timeout);
	}

	remove(): void {
		this.addEventListener('transitionend', () => super.remove());
		this.style.opacity = '0';
	}

	protected render(): TemplateResult {
		return html`<slot><div class="default-veil-content"></div></slot>`;
	}

	addAwaited(awaitees: Promise<unknown>[]): void {
		if (!Array.isArray(awaitees) || !awaitees.length) {
			console.error(`'awaitees' MUST be a non-empty array; got '${awaitees}'`);
			return;
		}
		this.awaitees.push(...awaitees);
	}

	private async installDefaultContent(): Promise<void> {
		if (!defaultContentCSSPromise) {
			defaultContentCSSPromise = import('./vwc-loading-veil-default.css');
		}
		const cssText = (await defaultContentCSSPromise).style.cssText;
		const se = document.createElement('style');
		se.innerHTML = cssText;
		this.shadowRoot?.appendChild(se);
	}
}
