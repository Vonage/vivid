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

const DEFAULT_TIMEOUT = 12000;
let defaultContentCSSPromise: Promise<{ style: CSSResult }> | null = null;

@customElement('vwc-loading-veil')
export class VWCLoadingVeil extends LitElement {
	static styles = [vwcLoadingVeilStyle];

	private useDefaultContent = false;
	private timeoutHandle = 0;
	private awaitees: Promise<unknown>[] = [];

	@property({
		type: Number,
		reflect: true,
		converter: (v) => {
			if (!v || isNaN(parseInt(v)) || parseInt(v) < 1) {
				console.warn(
					`timeout MUST be a positive number greater than 0; got '${v}'; falling back to default ${DEFAULT_TIMEOUT}`
				);
				return DEFAULT_TIMEOUT;
			} else {
				return parseInt(v);
			}
		},
	})
	private timeout = DEFAULT_TIMEOUT;

	connectedCallback() {
		super.connectedCallback();
		if (!this.childElementCount) {
			this.useDefaultContent = true;
			this.importDefaultContent();
		}
		this.timeoutHandle = (setTimeout(
			() => this.remove(),
			this.timeout
		) as unknown) as number;
	}

	disconnectedCallback(): void {
		clearTimeout(this.timeoutHandle);
	}

	protected render(): TemplateResult {
		return html`
			<slot></slot>
			${this.renderDefaultContent()}
		`;
	}

	addAwaited(awaitees: Promise<unknown>[]): void {
		if (!Array.isArray(awaitees) || !awaitees.length) {
			console.error(`'awaitees' MUST be a non-empty array; got '${awaitees}'`);
			return;
		}
		this.awaitees.push(...awaitees);
	}

	private renderDefaultContent(): TemplateResult | string {
		return this.useDefaultContent
			? html`<div class="default-veil-content"></div>`
			: '';
	}

	private async importDefaultContent(): Promise<void> {
		if (!defaultContentCSSPromise) {
			defaultContentCSSPromise = import('./vwc-loading-veil-default.css');
		}
		const cssText = (await defaultContentCSSPromise).style.cssText;
		const se = document.createElement('style');
		se.innerHTML = cssText;
		this.shadowRoot?.appendChild(se);
	}
}
