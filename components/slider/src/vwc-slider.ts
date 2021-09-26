import '@vonage/vvd-core';
import { debounced, handleAutofocus } from '@vonage/vvd-foundation/general-utils';
import { customElement } from 'lit-element';
import { Slider as MWCSlider } from '@material/mwc-slider';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css';
import { styles as mwcSliderStyles } from '@material/mwc-slider/mwc-slider.css.js';
import { style as vwcSliderStyle } from './vwc-slider.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-slider': VWCSlider;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSlider.styles = [styleCoupling, mwcSliderStyles, vwcSliderStyle];

/**
 * This component is an extension of [<mwc-slider>](https://github.com/material-components/material-components-web-components/tree/master/packages/slider)
 * @fires change
 * @fires input
 */
@customElement('vwc-slider')
export class VWCSlider extends MWCSlider {
	/* eslint-disable compat/compat */
	#resizeObserver = new ResizeObserver(() => this.layout());

	connectedCallback() {
		super.connectedCallback();
		this.#resizeObserver.observe(this);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.#resizeObserver.unobserve(this);
	}

	async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.pinMarkerText = this.value?.toLocaleString();
		handleAutofocus(this);
	}

	focus(): void {
		super.focus();
		this.formElement.focus();
	}

	@debounced()
	layout() {
		super.layout();
	}
}
