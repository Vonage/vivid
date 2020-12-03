import '@vonage/vvd-core';
import { customElement } from 'lit-element';
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
export class VWCTab extends MWCTab {}
