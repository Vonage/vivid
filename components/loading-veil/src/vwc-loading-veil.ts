import {
	customElement,
	property,
	LitElement,
	TemplateResult,
} from 'lit-element';
import { style as vwcLoadingVeilStyle } from './vwc-loading-veil.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-loading-veil': VWCLoadingVeil;
	}
}

@customElement('vwc-loading-veil')
export class VWCLoadingVeil extends LitElement {
	static styles = [vwcLoadingVeilStyle];

	#timeoutHandle = 0;
	#awaitees: Promise<unknown>[];

	@property({ reflect: true })
	private timeout = 12000;

	connectedCallback(): void {
		super.connectedCallback();
		this.#timeoutHandle = (setTimeout(
			this.remove,
			this.timeout
		) as unknown) as number;
	}

	disconnectedCallback(): void {
		clearTimeout(this.#timeoutHandle);
	}

	protected render(): TemplateResult | string {
		return `
			<slot>
				default animation
			</slot>
		`;
	}

	addAwaited(awaitees: Promise<unknown>[]): void {
		if (!Array.isArray(awaitees) || !awaitees.length) {
			console.error(`'awaitees' MUST be a non-empty array; got '${awaitees}'`);
			return;
		}
		this.#awaitees.push(...awaitees);
	}
}
