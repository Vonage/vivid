import { SelectBase as MwcSelectBase } from '@material/mwc-select/mwc-select-base';
import { style } from '@material/mwc-select/mwc-select-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-select': Select;
  }
}

@customElement('vwc-select')
export class Select extends MwcSelectBase {
  static get styles() {
    // return [super.styles /*, theme*/];
    return [style /*, theme*/];
  }
  constructor() {
    super();
    console.log(super.render);
  }
}
