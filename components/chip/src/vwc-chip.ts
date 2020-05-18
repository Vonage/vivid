import '@vonage/vvd-core';
import { Chip } from '@vonage/vwc-chip/mwc-chip/mwc-chip';
import { customElement } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
// Chip.styles = ...

@customElement('vwc-chip')
export class VWCChip extends Chip {}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-chip': VWCChip;
  }
}
