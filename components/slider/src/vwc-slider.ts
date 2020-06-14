import { customElement } from 'lit-element';
import { Slider as MWCSlider } from '@material/mwc-slider';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as mwcSliderStyle } from '@material/mwc-slider/mwc-slider-css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-slider': VWCSlider;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSlider.styles = [styleCoupling, mwcSliderStyle];

/**
 * This component is an extension of [<mwc-slider>](https://github.com/material-components/material-components-web-components/tree/master/packages/slider)
 */
@customElement('vwc-slider')
export class VWCSlider extends MWCSlider {}
