import '@vonage/vvd-core';
import {
	customElement, html, property, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { IconButtonToggle as MWCIconButtonToggle } from '@material/mwc-icon-button-toggle';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import { style as vwcButtonStyle } from '@vonage/vwc-icon-button/vwc-icon-button.css';
import { style as mwcIconButtonStyle } from '@material/mwc-icon-button/mwc-icon-button-css.js';
import { style as vwcIconButtonToggleStyle } from './vwc-icon-button-toggle.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button-toggle': VWCIconButtonToggle;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCIconButtonToggle.styles = [
	styleCoupling,
	mwcIconButtonStyle,
	vwcIconButtonToggleStyle,
	vwcButtonStyle,
];

/**
 * This component is an extension of [<mwc-icon-button-toggle>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button-toggle)
 */
@customElement('vwc-icon-button-toggle')
export class VWCIconButtonToggle extends MWCIconButtonToggle {
	@property({ type: Boolean, reflect: true })
	dense?= false;

	@property({ type: Boolean, reflect: true })
	enlarged?= false;

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = undefined;
			}
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.dense = undefined;
			}
		}
	}

	protected renderIcon(type: string): TemplateResult {
		return html`<vwc-icon type="${type}"></vwc-icon>`;
	}

	// ! copy & paste code from original mwc icon button toggle
	// ! to replace icon handling
	protected render(): TemplateResult {
		/** @classMap */
		const classes = {
			'mdc-icon-button--on': this.on,
		};
		const hasToggledAriaLabel =
				this.ariaLabelOn !== undefined && this.ariaLabelOff !== undefined;
		const ariaPressedValue = hasToggledAriaLabel ? undefined : this.on;
		// @tveinfeld 👇
		// eslint-disable-next-line no-nested-ternary
		const ariaLabelValue = hasToggledAriaLabel ?
			(this.on ? this.ariaLabelOn : this.ariaLabelOff) :
			this.ariaLabel;
		return html`<button
          class="mdc-icon-button ${classMap(classes)}"
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
        <span class="mdc-icon-button__icon"
          ><slot name="offIcon">
						${this.renderIcon(this.offIcon)}
						</slot
        ></span>
        <span class="mdc-icon-button__icon mdc-icon-button__icon--on"
          ><slot name="onIcon"
            >
						${this.renderIcon(this.onIcon)}
						</slot
        ></span>
      </button>`;
	}
}
