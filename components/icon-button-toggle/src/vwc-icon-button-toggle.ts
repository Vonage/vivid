import '@vonage/vvd-core';
import {
	customElement, property, PropertyValues,
} from 'lit-element';
import { VWCIconButton } from '@vonage/vwc-icon-button';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button-toggle': VWCIconButtonToggle;
	}
}


/**
 * This component is an extension of [<mwc-icon-button-toggle>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button-toggle)
 */
@customElement('vwc-icon-button-toggle')
export class VWCIconButtonToggle extends VWCIconButton {
	@property({
		type: Boolean,
		reflect: true
	})
	on = false;

	protected get isOn() {
		return this.hasAttribute('on');
	}

	protected get currentIcon() {
		return (this.isOn ? this.getAttribute('onicon') : this.getAttribute('officon')) || '';
	}

	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);

		this.addEventListener('click', () => {
			this.toggleAttribute('on');
			this.dispatchEvent(new CustomEvent('icon-button-toggle-change', { detail: { isOn: this.isOn } }));
		});

		this.setAttribute('icon', this.currentIcon);
	}

	protected updated(changes: Map<string, boolean>) {
		if (changes.has('on')) {
			this.setAttribute('icon', this.currentIcon);
		}
		super.updated(changes);
	}
}
