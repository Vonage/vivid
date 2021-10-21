// eslint-disable-next-line max-classes-per-file
import '@vonage/vvd-core';
import { customElement, property, query } from 'lit/decorators';
import { observer } from '@material/mwc-base/observer';
import { LinearProgressBase as MWCLinearProgressBase } from '@material/mwc-linear-progress/mwc-linear-progress-base.js';
import { style as vwcLinearProgressStyle } from './vwc-linear-progress.css.js';
import { styles as mwcLinearProgressStyles } from '@material/mwc-linear-progress/mwc-linear-progress.css.js';
import type { Connotation, ConnotationDecorative } from '@vonage/vvd-foundation/constants.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-linear-progress': VWCLinearProgress;
	}
}

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
export class VWCLinearProgress extends MWCLinearProgressBase {
	static override styles = [mwcLinearProgressStyles, vwcLinearProgressStyle];

	@query('.mdc-linear-progress') protected mdcLinearProgress!: HTMLElement;

	@property({ type: String, reflect: true })
	@observer(function (this: VWCLinearProgress, newVal: LinearProgressConnotation, oldVal: LinearProgressConnotation) {
		this.rootEl.classList.remove(`connotation-${oldVal}`);
		if (newVal) {
			this.rootEl.classList.add(`connotation-${newVal}`);
		}
	})
		connotation?: LinearProgressConnotation;

	protected override updated(changes: Map<string, boolean>): void {
		super.updated(changes);
		if (changes.has('progress')) {
			this.mdcLinearProgress.style.setProperty('--linear-progress-progress', this.progress.toString());
		}
	}
}
