import '@vonage/vvd-core';
import {
	customElement, property, html, TemplateResult
} from 'lit-element';
import { Fab as MWCFab } from '@material/mwc-fab';
import { style as mwcFabStyle } from '@material/mwc-fab/mwc-fab-css.js';
import { style as vwcFabStyle } from './vwc-fab.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import '@vonage/vwc-icon';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-fab': VWCFab;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCFab.styles = [mwcFabStyle, vwcFabStyle, styleCoupling];

const connotations = ['regular', 'cta'] as const;
export type FabConnotation = typeof connotations;

/**
 * This component is an extension of [<mwc-fab>](https://github.com/material-components/material-components-web-components/tree/master/packages/fab)
 */
@customElement('vwc-fab')
export class VWCFab extends MWCFab {
	@property({ type: String, reflect: true })
	connotation?: FabConnotation[number];

	protected renderIcon(): TemplateResult {
		return html`${this.icon
			? html`<vwc-icon
					class="vvd-icon"
					type="${this.icon}"
					size="${this.mini ? 'small' : 'medium'}"
			  ></vwc-icon>`
			: ''}`;
	}
}
