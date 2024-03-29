import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, property, html, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { Tab as MWCTab } from '@material/mwc-tab';
import { style as vwcTabStyle } from './vwc-tab.css.js';
import { styles as mwcTabStyles } from '@material/mwc-tab/mwc-tab.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-tab': VWCTab;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCTab.styles = [styleCoupling, mwcTabStyles, vwcTabStyle];

@customElement('vwc-tab')
export class VWCTab extends MWCTab {
	@property({ type: Boolean, reflect: true })
		disabled = false;

	@property({ type: Boolean, reflect: true })
		block = false;

	@property({ type: Boolean, reflect: true })
		trailingIcon = false;

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon type="${this.icon}"></vwc-icon>`;
	}

	// ! copy & paste code from original mwc tab
	// ! to replace icon handling
	override render(): TemplateResult {
		const classes = {
			'mdc-tab--min-width': this.minWidth,
			'mdc-tab--stacked': this.stacked,
		};
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
				<span class="leading-icon">
					<slot name="icon">
						${(this.hasImageIcon || this.icon) && !this.trailingIcon
		? this.renderIcon()
		: ''}
					</slot>
				</span>
				${labelTemplate}
				<span class="trailing-icon">
					<slot name="trailingIcon">
						${(this.hasImageIcon || this.icon) && this.trailingIcon
		? this.renderIcon()
		: ''}
					</slot>
				</span>
				${this.isMinWidthIndicator ? this.renderIndicator() : ''}
			</span>
			${this.isMinWidthIndicator ? '' : this.renderIndicator()}
			${this.renderRipple()}
		</button>`;
	}

	protected _handleClick(): void {
		this.handleRippleFocus();
		this.mdcFoundation.handleClick();
	}

	protected _handleBlur(): void {
		this.handleRippleBlur();
	}
}
