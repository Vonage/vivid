import '@vonage/vvd-core';
import {
	customElement,
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

}
