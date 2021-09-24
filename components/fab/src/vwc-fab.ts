import '@vonage/vvd-core';
import {
	customElement, property, html, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Fab as MWCFab } from '@material/mwc-fab';
import { styles as mwcFabStyles } from '@material/mwc-fab/mwc-fab.css.js';
import { style as vwcFabStyle } from './vwc-fab.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import '@vonage/vwc-icon';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-fab': VWCFab;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCFab.styles = [mwcFabStyles, vwcFabStyle, styleCoupling];

const connotations = ['regular', 'cta'] as const;
export type FabConnotation = typeof connotations;

/**
 * This component is an extension of [<mwc-fab>](https://github.com/material-components/material-components-web-components/tree/master/packages/fab)
 */
@customElement('vwc-fab')
export class VWCFab extends MWCFab {
	@property({ type: String, reflect: true })
	connotation?: FabConnotation[number];
	//! note material-components/material-web#2496

	protected override render(): TemplateResult {
		const hasTouchTarget = this.mini && !this.reducedTouchTarget;
		/** @classMap */
		const classes = {
			'mdc-fab--mini': this.mini,
			'mdc-fab--touch': hasTouchTarget,
			'mdc-fab--exited': this.exited,
			'mdc-fab--extended': this.extended,
			'icon-end': this.showIconAtEnd,
		};

		const ariaLabel = this.label ? this.label : this.icon;

		/*
     * Some internal styling is sensitive to whitespace in this template, take
     * care when modifying it.
     */
		return html`<button
          class="mdc-fab ${classMap(classes)}"
          ?disabled="${this.disabled}"
          aria-label="${ariaLabel}"
          @mouseenter=${this.handleRippleMouseEnter}
          @mouseleave=${this.handleRippleMouseLeave}
          @focus=${this.handleRippleFocus}
          @blur=${this.handleRippleBlur}
          @mousedown=${this.handleRippleActivate}
          @touchstart=${this.handleRippleStartPress}
          @touchend=${this.handleRippleDeactivate}
          @touchcancel=${this.handleRippleDeactivate}><!--
        -->${this.renderBeforeRipple()}<!--
        -->${this.renderRipple()}<!--
        -->${this.showIconAtEnd ? this.renderLabel() : ''}<!--
        --><span class="material-icons mdc-fab__icon"><!--
          --><slot name="icon">${this.renderIcon()}</slot><!--
       --></span><!--
        -->${!this.showIconAtEnd ? this.renderLabel() : ''}<!--
        -->${this.renderTouchTarget()}<!--
      --></button>`;
	}

	protected renderIcon(): TemplateResult {
		return html`${this.icon
			? html`<vwc-icon
					type="${this.icon}"
					size="${this.mini ? 'small' : 'medium'}"
			  ></vwc-icon>`
			: ''}`;
	}
}
