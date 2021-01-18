import '@vonage/vvd-core';
import { customElement, property, html, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Tab as MWCTab } from '@material/mwc-tab';
import { style as vwcTabStyle } from './vwc-tab.css';
import { style as mwcTabStyle } from '@material/mwc-tab/mwc-tab-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tab': VWCTab;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTab.styles = [styleCoupling, mwcTabStyle, vwcTabStyle];

@customElement('vwc-tab')
export class VWCTab extends MWCTab {
	@property({ type: Boolean, reflect: true })
	disabled = false;

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon
			class="vvd-icon"
			size="small"
			type="${this.icon}"
		></vwc-icon>`;
	}

	render() {
		const classes = {
			'mdc-tab--min-width': this.minWidth,
			'mdc-tab--stacked': this.stacked,
		};
		let iconTemplate = html``;
		if (this.hasImageIcon || this.icon) {
			// NOTE: MUST be on same line as spaces will cause vert alignment issues
			// in IE
			iconTemplate = this.renderIcon();
			// <span class="mdc-tab__icon material-icons"><slot name="icon">${this.icon}</slot></span>
		}
		let labelTemplate = html``;
		if (this.label) {
			labelTemplate = html`<span class="mdc-tab__text-label">${this.label}</span>`;
		}
		return html`<button
			@click="${this._handleClick}"
			class="mdc-tab ${classMap(classes)}"
			role="tab"
			aria-selected="false"
			tabindex="-1"
			@focus="${this.focus}"
			@blur="${this._handleBlur}"
			@mousedown="${this.handleRippleMouseDown}"
			@mouseenter="${this.handleRippleMouseEnter}"
			@mouseleave="${this.handleRippleMouseLeave}"
			@touchstart="${this.handleRippleTouchStart}"
			@touchend="${this.handleRippleDeactivate}"
			@touchcancel="${this.handleRippleDeactivate}"
		>
			<span class="mdc-tab__content">
				${iconTemplate} ${labelTemplate}
				${this.isMinWidthIndicator ? this.renderIndicator() : ''}
			</span>
			${this.isMinWidthIndicator ? '' : this.renderIndicator()}
			${this.renderRipple()}
		</button>`;
	}

	_handleClick() {
		this.handleRippleFocus();
		this.mdcFoundation.handleClick();
	}

	_handleBlur() {
		this.handleRippleBlur();
	}
}
