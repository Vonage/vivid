import { customElement } from 'lit-element';
import { CircularProgress as MWCCircularProgress } from '@material/mwc-circular-progress';
import { style as mwcCircularProgressStyle } from '@material/mwc-circular-progress/mwc-circular-progress-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-circular-progress': VWCCircularProgress;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCircularProgress.styles = [styleCoupling, mwcCircularProgressStyle];

@customElement('vwc-circular-progress')
export class VWCCircularProgress extends MWCCircularProgress {}
