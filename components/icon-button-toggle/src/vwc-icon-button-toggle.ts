import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement, html, property, TemplateResult } from 'lit-element';
import { IconButtonToggle as MWCIconButtonToggle } from '@material/mwc-icon-button-toggle';
import { style as MWCIconButtonStyle } from '@material/mwc-icon-button/mwc-icon-button-css.js';
import { style as VWCIconButtonStyle } from '@vonage/vwc-icon-button/vwc-icon-button.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button-toggle': VWCIconButtonToggle;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCIconButtonToggle.styles = [
	styleCoupling,
	MWCIconButtonStyle,
	VWCIconButtonStyle,
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
}
