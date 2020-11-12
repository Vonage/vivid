import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Slider as MWCSlider } from '@material/mwc-slider';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import { style as mwcSliderStyle } from '@material/mwc-slider/mwc-slider-css.js';
import { style as vwcSliderStyle } from './vwc-slider.css';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-slider': VWCSlider;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSlider.styles = [styleCoupling, mwcSliderStyle, vwcSliderStyle];

/**
 * This component is an extension of [<mwc-slider>](https://github.com/material-components/material-components-web-components/tree/master/packages/slider)
 * @fires change
 * @fires input
 */
@customElement('vwc-slider')
export class VWCSlider extends MWCSlider {
	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.pinMarkerText = this.value?.toLocaleString();
		handleAutofocus(this);
	}

	focus(): void {
		super.focus();
		this.formElement.focus();
	}
}
