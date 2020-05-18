import '@vonage/vvd-core';
import { ChipSet } from '@vonage/vwc-chip/mwc-chip/mwc-chip-set';
import { customElement } from 'lit-element';

// if customization is need, it must be done in the mwc
// component scope as some components integrate other
// mwc components
// Chip.styles = ...

@customElement('vwc-chip-set')
export class VWCChipSet extends ChipSet {}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-chip-set': VWCChipSet;
  }
}
