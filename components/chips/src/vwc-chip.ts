import { customElement, html } from 'lit-element';
import { Chip as MWCChip } from '@material/mwc-chips/mwc-chip';
import { style as vwcChipStyle } from './vwc-chip.css';
import { style as mwcChipStyle } from '@material/mwc-chips/mwc-chip.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import '@vonage/vwc-icon';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { nothing, TemplateResult } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-chip': VWCChip;
  }
}

/**
 * This component is an extension of [<mwc-chip>](https://github.com/material-components/material-components-web-components/tree/master/packages/chips)
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCChip.styles = [styleCoupling, mwcChipStyle, vwcChipStyle];

@customElement('vwc-chip')
export class VWCChip extends MWCChip {
  // TODO: discuss prop names
  // @property({ type: String }) size = '';
  // @property({ type: Boolean }) outlined = false;
  // @property({ type: Boolean }) pill = false;
  // @property({ type: String }) theme = '';
  // @property({ type: Boolean }) transparent = false;
  // updated(): void {
  // 	const classes = [
  // 		this.outlined ? 'vwc-chip--outlined' : '',
  // 		this.pill ? 'vwc-chip--pill' : '',
  // 		this.size ? `vwc-chip--${this.size}` : '',
  // 		this.theme ? `vwc-chip--${this.theme}` : '',
  // 		this.transparent ? 'vwc-chip--transparent' : '',
  // 	];
  // 	const customClasses = Array.from(this.classList).filter(
  // 		(e) => !e.includes('vwc-chip')
  // 	);
  // 	const filteredClasses = classes.filter((e) => e !== '');
  // 	/* eslint-disable wc/no-self-class */
  // 	this.className = '';
  // 	/* eslint-disable wc/no-self-class */
  // 	this.classList.add(...customClasses, ...filteredClasses);
  // }
  renderThumbnail(): TemplateResult {
    if (this.icon) {
      return html`<vwc-icon
        size="small"
        type="${this.icon}"
        class="leading"
      ></vwc-icon>`;
    } else if (this.childElementCount > 0) {
      return html` <span class="mdc-chip__icon mdc-chip__icon--leading">
        <slot name="thumbnail"></slot>
      </span>`;
    } else {
      return html``;
    }
  }

  renderRemoveIcon(): TemplateResult {
    const classes = {
      'mdc-chip__trailing-action': this.removeIconFocusable,
      [this.removeIconClass]: true,
    };

    const icon = html`${this.removable
      ? html` <i
          class="mdc-chip__icon mdc-chip__icon--trailing ${classMap(classes)}"
          tabindex="-1"
          role=${ifDefined(this.removeIconFocusable ? 'button' : undefined)}
          aria-hidden=${ifDefined(
            this.removeIconFocusable ? undefined : 'true'
          )}
          @click=${this.clickHandler}
          @keydown=${this.clickHandler}
          ><vwc-icon size="small" class="trailing" type="cross-circle-negative"
        /></i>`
      : nothing}`;

    if (this.removeIconFocusable) {
      return html`<span role="gridcell">${icon}</span>`;
    } else {
      return icon;
    }
  }

  clickHandler(): void {
    this.mdcFoundation.handleTrailingActionInteraction();
  }
}
