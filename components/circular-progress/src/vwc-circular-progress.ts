import '@vonage/vvd-core';
import { customElement, property, query } from 'lit/decorators';
import { observer } from '@material/mwc-base/observer';
import { CircularProgress as MWCCircularProgress } from '@material/mwc-circular-progress';
import { styles as mwcCircularProgressStyles } from '@material/mwc-circular-progress/mwc-circular-progress.css.js';
import { style as vwcCircularProgressStyle } from './vwc-circular-progress.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import type { Connotation } from '@vonage/vvd-foundation/constants.js';

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
MWCCircularProgress.styles = [styleCoupling, mwcCircularProgressStyles, vwcCircularProgressStyle];

@customElement('vwc-circular-progress')
export class VWCCircularProgress extends MWCCircularProgress {
	@query('.mdc-circular-progress') protected rootEl!: HTMLElement;

	@property({ type: String, reflect: true })
	@observer(function (this: VWCCircularProgress, newVal: CircularProgressConnotation, oldVal: CircularProgressConnotation) {
		this.rootEl.classList.remove(`connotation-${oldVal}`);
		if (newVal) {
			this.rootEl.classList.add(`connotation-${newVal}`);
		}
	})
		connotation?: CircularProgressConnotation;
}
