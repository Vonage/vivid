import {
	html, LitElement, property
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import type { Connotation, Layout } from '@vonage/vvd-foundation/constants.js';
import '@vonage/vwc-button';
import { nothing, TemplateResult } from 'lit-html';

// import { Instance as PopperInstance, createPopper } from '@popperjs/core/dist/esm';

export class VWCTooltipBase extends LitElement {

	@property({ type: String, reflect: true })
		connotation?: Connotation;

	@property({ type: String, reflect: true })
		layout?: Layout;

	@property({ type: String, reflect: true })
		tooltipText?: string;

	@property({ type: String, reflect: true })
		tooltipTitle?: string;

	@property({ type: String, reflect: true })
		position?: string;

	@property({ type: Boolean, reflect: true })
		open = false;

	@property({ type: Boolean, reflect: true })
		dense = false;

	@property({ type: Boolean, reflect: true })
		dismissible?: boolean;

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

	private clickCloseHandler() {
		this.open = false;
	}

	renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="dismiss-button" icon="close-small-solid" @click="${this.clickCloseHandler}" dense part="vvd-scheme-alternate"></vwc-icon-button>`
			: nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout,
			'open': this.open,
			//TODO: merge them into one :)
			'dense': (this.dense),
			'normal': !(this.dense),
		};
	}

	protected override render(): TemplateResult {
		return html`
			<div class="tooltip ${classMap(this.getRenderClasses())}">
				<span class="tooltip-content">
					<span class="tooltip-title">${this.tooltipTitle}</span>
					<span class="tooltip-text">${this.tooltipText}</span>
					<slot>
						${this.position}
					</slot>
				</span>
				${this.renderDismissButton()}
			</div>`;
	}
}
