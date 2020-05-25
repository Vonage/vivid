import '@vonage/vvd-core';
import { customElement } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': VWCButton;
  }
}

@customElement('vwc-button')
export class VWCButton extends MWCButton {}
