import { customElement } from 'lit-element';
import { Slider as MWCSlider } from '@material/mwc-slider';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-slider': VWCSlider;
	}
}

@customElement('vwc-slider')
export class VWCSlider extends MWCSlider {}
