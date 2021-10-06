import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@material/mwc-ripple';

import {
	customElement, property, html, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import type { ClassInfo } from 'lit-html/directives/class-map';
import { IconButton as MWCIconButton } from '@material/mwc-icon-button';
import { style as vwcButtonStyle } from './vwc-icon-button.css.js';
import { styles as mwcIconButtonStyles } from '@material/mwc-icon-button/mwc-icon-button.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import type { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants';
import { handleMultipleDenseProps } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button': VWCIconButton;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCIconButton.styles = [styleCoupling, mwcIconButtonStyles, vwcButtonStyle];

type IconButtonLayout = Extract<
	Layout,
	Layout.Filled | Layout.Outlined | Layout.Ghost
>;

type IconButtonShape = Extract<Shape, Shape.Rounded | Shape.Circled>;

type IconButtonConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Info
	| Connotation.Announcement
>;

/**
 * This component is an extension of [<mwc-icon-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button)
 */
@customElement('vwc-icon-button')
export class VWCIconButton extends MWCIconButton {
	@property({ type: String, reflect: true })
	layout?: IconButtonLayout;

	@property({ type: String, reflect: true })
	connotation?: IconButtonConnotation;

	@property({ type: String, reflect: true })
	shape?: IconButtonShape;

	@property({ type: Boolean, reflect: true })
	dense = false;

	@property({ type: Boolean, reflect: true })
	enlarged = false;

	protected updated(changes: Map<string, boolean>): void {
		handleMultipleDenseProps(this, changes);
	}

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
			[`layout-${this.layout}`]: !!this.layout
		};
	}

	protected render(): TemplateResult {
		return html`<button
			class="mdc-icon-button ${classMap(this.getRenderClasses())}"
			aria-label="${this.ariaLabel || this.icon}"
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
			${this.renderIcon()}
			<span>
				<slot></slot>
			</span>
		</button>`;
	}

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon	type="${this.icon}"></vwc-icon>`;
	}

	renderRipple(): TemplateResult | '' {
		return this.shouldRenderRipple
			? html` <mwc-ripple .disabled="${this.disabled}"></mwc-ripple>`
			: '';
	}
}
