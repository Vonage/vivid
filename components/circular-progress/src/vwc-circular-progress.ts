import '@vonage/vvd-core';
import { customElement, property } from 'lit-element';
import { CircularProgress as MWCCircularProgress } from '@material/mwc-circular-progress';
import { style as mwcCircularProgressStyle } from '@material/mwc-circular-progress/mwc-circular-progress-css.js';
import { style as vwcCircularProgressStyle } from './vwc-circular-progress.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { Connotation } from '@vonage/vvd-foundation/constants';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-circular-progress': VWCCircularProgress;
	}
}

type CircularProgressConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	>;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCircularProgress.styles = [styleCoupling, mwcCircularProgressStyle, vwcCircularProgressStyle];

@customElement('vwc-circular-progress')
export class VWCCircularProgress extends MWCCircularProgress {
	@property({ type: String, reflect: true })
	connotation?: CircularProgressConnotation | null;
}
