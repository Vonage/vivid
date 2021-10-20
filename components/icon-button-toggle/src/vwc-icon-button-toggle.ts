import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@material/mwc-ripple';
import {
	html, customElement, property, TemplateResult, CSSResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { nothing } from 'lit-html';
import { IconButtonToggleBase } from '@material/mwc-icon-button-toggle/mwc-icon-button-toggle-base.js';
import { styles as MWCIconButtonStyles } from '@material/mwc-icon-button/mwc-icon-button.css.js';
import { style as VWCIconButtonStyle } from '@vonage/vwc-icon-button/vwc-icon-button.css.js';
import { handleMultipleDenseProps } from '@vonage/vvd-foundation/general-utils.js';
import type { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button-toggle': VWCIconButtonToggle;
	}
}

type IconButtonToggleLayout = Extract<
	Layout,
	Layout.Filled | Layout.Outlined | Layout.Ghost
>;

type IconButtonToggleShape = Extract<Shape, Shape.Rounded | Shape.Circled>;

type IconButtonToggleConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Info
	| Connotation.Announcement
>;

/**
 * This component is an extension of [<mwc-icon-button-toggle>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button-toggle)
 */
@customElement('vwc-icon-button-toggle')
export class VWCIconButtonToggle extends IconButtonToggleBase {
	static override styles: CSSResult[] = [MWCIconButtonStyles, VWCIconButtonStyle];

	@property({ type: String, reflect: true })
		layout?: IconButtonToggleLayout;

	@property({ type: String, reflect: true })
		connotation?: IconButtonToggleConnotation;

	@property({ type: String, reflect: true })
		shape?: IconButtonToggleShape;

	@property({ type: Boolean, reflect: true })
		dense = false;

	@property({ type: Boolean, reflect: true })
		enlarged = false;

	protected override updated(changes: Map<string, boolean>): void {
		handleMultipleDenseProps(this, changes);
	}
	protected override renderRipple(): TemplateResult | string {
		return this.shouldRenderRipple ? html`
            <mwc-ripple
                .disabled="${this.disabled}">
            </mwc-ripple>` :
			'';
	}

	protected getRenderClasses(): ClassInfo {
		return {
			'mdc-icon-button--on': this.on,
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout
		};
	}

	protected override render(): TemplateResult {
		const hasToggledAriaLabel =
			this.ariaLabelOn !== undefined && this.ariaLabelOff !== undefined;
		const ariaPressedValue = hasToggledAriaLabel ? undefined : this.on;
		// eslint-disable-next-line no-nested-ternary
		const ariaLabelValue = hasToggledAriaLabel ?
			(this.on ? this.ariaLabelOn : this.ariaLabelOff) :
			this.ariaLabel;
		return html`<button
          class="mdc-icon-button ${classMap(this.getRenderClasses())}"
          aria-pressed="${ifDefined(ariaPressedValue)}"
          aria-label="${ifDefined(ariaLabelValue)}"
          @click="${this.handleClick}"
          ?disabled="${this.disabled}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleMouseDown}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleTouchStart}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}"
        >${this.renderRipple()}
        <span class="mdc-icon-button__icon">
					<slot name="offIcon">
						${this.renderIcon(this.offIcon)}
					</slot
        ></span>
        <span class="mdc-icon-button__icon mdc-icon-button__icon--on">
					<slot name="onIcon">
						${this.renderIcon(this.onIcon)}
					</slot>
				</span>
      </button>`;
	}

	protected renderIcon(icon: string): TemplateResult | typeof nothing {
		return icon
			? html`<vwc-icon	type="${icon}"></vwc-icon>`
			: nothing;
	}
}
