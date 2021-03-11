// eslint-disable-next-line max-classes-per-file
import '@vonage/vvd-core';
import { customElement, property, query } from 'lit-element';
import { LinearProgress as MWCLinearProgress } from '@material/mwc-linear-progress';
import { style as vwcLinearProgressStyle } from './vwc-linear-progress.css';
import { style as mwcLinearProgressStyle } from '@material/mwc-linear-progress/mwc-linear-progress-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { Connotation, Decoration } from '@vonage/vvd-foundation/constants';
import { interceptCoexistence } from '@vonage/vvd-foundation/decorators';

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

type LinearProgressConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	>;

type LinearProgressDecoration = Extract<Decoration, Decoration.Primary>;
@customElement('vwc-linear-progress')
@interceptCoexistence('decoration', 'connotation')
export class VWCLinearProgress extends MWCLinearProgress {
  @query('.mdc-linear-progress') protected mdcLinearProgress!: HTMLElement;

	@property({ type: String, reflect: true })
	connotation?: LinearProgressConnotation | null;

	@property({ type: String, reflect: true })
	decoration?: LinearProgressDecoration | null

	protected updated(changes: Map<string, boolean>): void {
		super.updated(changes);
		if (changes.has('progress')) {
			this.mdcLinearProgress.style.setProperty('--linear-progress-progress', this.progress.toString());
		}
	}
}
