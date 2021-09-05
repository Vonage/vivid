// eslint-disable-next-line max-classes-per-file
import '@vonage/vvd-core';
import { customElement, property, query } from 'lit-element';
import { observer } from '@material/mwc-base/observer';
import { LinearProgress as MWCLinearProgress } from '@material/mwc-linear-progress';
import { style as vwcLinearProgressStyle } from './vwc-linear-progress.css';
import { styles as mwcLinearProgressStyles } from '@material/mwc-linear-progress/mwc-linear-progress.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import { Connotation, ConnotationDecorative } from '@vonage/vvd-foundation/constants';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-linear-progress': VWCLinearProgress;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCLinearProgress.styles = [
	styleCoupling,
	mwcLinearProgressStyles,
	vwcLinearProgressStyle,
];

type LinearProgressConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
>
	| Extract<
		ConnotationDecorative,
		| ConnotationDecorative.Pacific
	>;

@customElement('vwc-linear-progress')
export class VWCLinearProgress extends MWCLinearProgress {
	@query('.mdc-linear-progress') protected mdcLinearProgress!: HTMLElement;

	@property({ type: String, reflect: true })
	@observer(function (this: VWCLinearProgress, newVal: LinearProgressConnotation, oldVal: LinearProgressConnotation) {
		this.rootEl.classList.remove(`linear-progress--connotation-${oldVal}`);
		if (newVal) {
			this.rootEl.classList.add(`linear-progress--connotation-${newVal}`);
		}
	})
	connotation?: LinearProgressConnotation;

	protected updated(changes: Map<string, boolean>): void {
		super.updated(changes);
		if (changes.has('progress')) {
			this.mdcLinearProgress.style.setProperty('--linear-progress-progress', this.progress.toString());
		}
	}
}
