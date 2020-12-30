import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { LinearProgress as MWCLinearProgress } from '@material/mwc-linear-progress';
import { style as vwcLinearProgressStyle } from './vwc-linear-progress.css';
import { style as mwcLinearProgressStyle } from '@material/mwc-linear-progress/mwc-linear-progress-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-linear-progress': VWCLinearProgress;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCLinearProgress.styles = [
	styleCoupling,
	mwcLinearProgressStyle,
	vwcLinearProgressStyle,
];

@customElement('vwc-linear-progress')
export class VWCLinearProgress extends MWCLinearProgress {}
