import {
	html, LitElement, property, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import type { Connotation, Layout } from '@vonage/vvd-foundation/constants.js';

// import { Instance as PopperInstance, createPopper } from '@popperjs/core/dist/esm';

export class VWCTooltipBase extends LitElement {

	@property({ type: String, reflect: true })
		connotation?: Connotation;

	@property({ type: String, reflect: true })
		layout?: Layout;

	@property({ type: String, reflect: true })
		text?: string;

	@property({ type: String, reflect: true })
		position?: string;

	@property({ type: Boolean, reflect: true })
		open = false;

	/**
	 * Opens the tooltip
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the tooltip
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout,
			['open']: this.open,
		};
	}

	protected override render(): TemplateResult {
		return html`
			<span class="tooltip ${classMap(this.getRenderClasses())}">
				<slot>
					${this.text}
					${this.position}
				</slot>
			</span>`;
	}
}
