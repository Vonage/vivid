import '@vonage/vvd-core';
import { customElement } from 'lit/decorators';
import { SliderBase as MWCSliderBase } from '@material/mwc-slider/slider-base';
import { styles as mwcSliderStyles } from '@material/mwc-slider/mwc-slider.css.js';
import { style as vwcSliderStyle } from './vwc-slider.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-slider': VWCSlider;
	}
}

/**
 * This component is an extension of [<mwc-slider>](https://github.com/material-components/material-components-web-components/tree/master/packages/slider)
 * @fires change
 * @fires input
 */
@customElement('vwc-slider')
export class VWCSlider extends MWCSliderBase {
	static override styles = [mwcSliderStyles, vwcSliderStyle];

	override focus(): void {
		super.focus();
		this.formElement.focus();
	}
}
