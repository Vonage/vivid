import '@vonage/vvd-core';
import { Button as MwcButton } from '@material/mwc-button/mwc-button';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': VwcButton;
  }
}

export class VwcButton extends MwcButton { }
