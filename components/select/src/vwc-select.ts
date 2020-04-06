import { Select as MwcSelect } from '@material/mwc-select/mwc-select';
// import { style } from '@material/mwc-select/mwc-select-css.js';
import { customElement } from 'lit-element';

// import { theme } from '@vivid/theme';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-select': Select;
  }
}

@customElement('vwc-select')
export class Select extends MwcSelect {
  // static get styles() {
  //   // return [super.styles /*, theme*/];
  //   return [style /*, theme*/];
  // }
  // constructor() {
  //   super();
  //   console.log(super.render);
  // }
}
