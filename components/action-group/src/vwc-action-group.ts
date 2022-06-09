import '@vonage/vvd-core';
import { customElement } from 'lit-element';

import { VWCActionGroupBase } from './vwc-action-group-base.js';
import { style } from './vwc-action-group.css.js';

/**
 * Represents an action-group custom element.
 */

@customElement('vwc-action-group')
export class VWCActionGroup extends VWCActionGroupBase {
	static override styles = style;
}

declare global {
    interface HTMLElementTagNameMap {
        'vwc-action-group': VWCActionGroup;
    }
}
