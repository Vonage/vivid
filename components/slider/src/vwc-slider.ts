import '@vonage/vvd-core';
import { debounced, handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
import { customElement } from 'lit-element';
import { Slider as MWCSlider } from '@material/mwc-slider';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { styles as mwcSliderStyles } from '@material/mwc-slider/mwc-slider.css.js';
import { style as vwcSliderStyle } from './vwc-slider.css.js';

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

	override connectedCallback() {
		super.connectedCallback();
		this.#resizeObserver.observe(this);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#resizeObserver.unobserve(this);
	}

	override async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		this.pinMarkerText = this.value?.toLocaleString();
		handleAutofocus(this);
	}

	override focus(): void {
		super.focus();
		this.formElement.focus();
	}

	@debounced()
	override layout() {
		super.layout();
	}
}
