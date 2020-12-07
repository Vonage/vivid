import '@vonage/vvd-core';
import { customElement, html, property, TemplateResult } from 'lit-element';
import { IconButtonToggle as MWCIconButtonToggle } from '@material/mwc-icon-button-toggle';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as vwcButtonStyle } from '@vonage/vwc-icon-button/vwc-icon-button.css';
import { style as mwcIconButtonStyle } from '@material/mwc-icon-button/mwc-icon-button-css.js';

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
	vwcButtonStyle,
];

/**
 * This component is an extension of [<mwc-icon-button-toggle>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button-toggle)
 */
@customElement('vwc-icon-button-toggle')
export class VWCIconButtonToggle extends MWCIconButtonToggle {
	@property({ type: Boolean, reflect: true })
	dense? = false;

	@property({ type: Boolean, reflect: true })
	enlarged? = false;

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
		return html`<vwc-icon class="icon" size="small" type="${type}"></vwc-icon>`;
	}

	// ! copy & paste code from original mwc icon button toggle
	// ! to replace icon handling
	protected render(): TemplateResult {
		return html` <button
			class="mdc-icon-button"
			@click="${this.handleClick}"
			aria-label="${this.label}"
			?disabled="${this.disabled}"
			@focus="${this.handleRippleFocus}"
			@blur="${this.handleRippleBlur}"
			@mousedown="${this.handleRippleMouseDown}"
			@mouseenter="${this.handleRippleMouseEnter}"
			@mouseleave="${this.handleRippleMouseLeave}"
			@touchstart="${this.handleRippleTouchStart}"
			@touchend="${this.handleRippleDeactivate}"
			@touchcancel="${this.handleRippleDeactivate}"
		>
			${this.renderRipple()}
			<span class="mdc-icon-button__icon">
				<slot name="offIcon"> ${this.renderIcon(this.offIcon)} </slot>
			</span>
			<span class="mdc-icon-button__icon mdc-icon-button__icon--on">
				<slot name="onIcon"> ${this.renderIcon(this.onIcon)} </slot>
			</span>
		</button>`;
	}
}
