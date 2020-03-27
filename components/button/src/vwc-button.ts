import { Button as MwcButton } from '@material/mwc-button';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

@customElement('vwc-button')
// @ts-ignore: Unreachable code error
export class Button extends MwcButton {
  static get styles() {
    return [super.styles /*, theme*/];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vwc-button': Button;
  }
}
