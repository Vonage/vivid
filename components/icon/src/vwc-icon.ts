import { customElement } from 'lit-element';
import { Icon as MWCIcon } from '@material/mwc-icon';
//import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as mwcIconStyle } from '@material/mwc-icon/mwc-icon-host-css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon': VWCIcon;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCIcon.styles = [mwcIconStyle];

/**
 * This component is an extension of [<mwc-icon>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon)
 */
@customElement('vwc-icon')
export class VWCIcon extends MWCIcon {}
