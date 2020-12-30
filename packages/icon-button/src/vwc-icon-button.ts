import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement, property } from 'lit-element';
import { IconButton as MWCIconButton } from '@material/mwc-icon-button';
import { style as vwcButtonStyle } from './vwc-icon-button.css';
import { style as mwcIconButtonStyle } from '@material/mwc-icon-button/mwc-icon-button-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { html, TemplateResult } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button': VWCIconButton;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCIconButton.styles = [styleCoupling, mwcIconButtonStyle, vwcButtonStyle];

/**
 * This component is an extension of [<mwc-icon-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button)
 */
@customElement('vwc-icon-button')
export class VWCIconButton extends MWCIconButton {
	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = false;
			}
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.removeAttribute('dense');
				this.dense = false;
			}
		}
	}

	protected render(): TemplateResult {
		return html`<button
			class="mdc-icon-button"
			aria-label="${this.label || this.icon}"
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
			${this.renderRipple()} ${this.renderIcon()}
			<span class="default-slot-container">
				<slot></slot>
			</span>
		</button>`;
	}

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon
			class="icon"
			size="small"
			type="${this.icon}"
		></vwc-icon>`;
	}
}
