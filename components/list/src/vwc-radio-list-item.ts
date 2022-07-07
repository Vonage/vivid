import '@vonage/vwc-radio';

import { ifDefined } from 'lit-html/directives/if-defined.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, html } from 'lit-element';
import { RadioListItem as MWCRadioListItem } from '@material/mwc-list/mwc-radio-list-item.js';
import { styles as mwcListItemStyles } from '@material/mwc-list/mwc-list-item.css.js';
import { styles as mwcControlListItemStyles } from '@material/mwc-list/mwc-control-list-item.css.js';
import { style as vwcRadioListItemStyle } from './vwc-radio-list-item.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-radio-list-item': VWCRadioListItem;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCRadioListItem.styles = [
	styleCoupling,
	mwcListItemStyles,
	mwcControlListItemStyles,
	vwcRadioListItemStyle,
];

/**
 * This component is an extension of [<mwc-radio-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-radio-list-item')
export class VWCRadioListItem extends MWCRadioListItem {
	override render() {
		const radioClasses = {
			'mdc-deprecated-list-item__graphic': this.left,
			'mdc-deprecated-list-item__meta': !this.left,
		};

		const text = this.renderText();
		const graphic = this.graphic && this.graphic !== 'control' && !this.left ?
			this.renderGraphic() :
			html``;
		const meta = this.hasMeta && this.left ? this.renderMeta() : html``;
		const ripple = this.renderRipple();

		return html`
      ${ripple}
      ${graphic}
      ${this.left ? '' : text}
      <vwc-radio
          global
          class=${classMap(radioClasses)}
          tabindex=${this.tabindex}
          name=${ifDefined(this.group === null ? undefined : this.group)}
          .checked=${this.selected}
          ?disabled=${this.disabled}
          @checked=${this.onChange}>
      </vwc-radio>
      ${this.left ? text : ''}
      ${meta}`;
	}
}
