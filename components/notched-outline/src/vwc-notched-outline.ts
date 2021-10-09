import { customElement } from 'lit/decorators';
import { NotchedOutline as MWCNotchedOutline } from '@material/mwc-notched-outline';
import { styles as mwcNotchedOutlineStyles } from '@material/mwc-notched-outline/mwc-notched-outline.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-notched-outline': VWCNotchedOutline;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCNotchedOutline.styles = [mwcNotchedOutlineStyles];

/**
 * This component is an extension of [<mwc-notched-outline>](https://github.com/material-components/material-components-web-components/tree/master/packages/notched-outline)
 * This component is NOT meant to be used itself, but serves as an adjustment/definition for the usage of it in other components
 */
@customElement('vwc-notched-outline')
export class VWCNotchedOutline extends MWCNotchedOutline {}
