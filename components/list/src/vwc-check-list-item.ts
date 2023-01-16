import '@vonage/vwc-checkbox';

import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, html } from 'lit-element';
import { CheckListItem as MWCCheckListItem } from '@material/mwc-list/mwc-check-list-item.js';
import { styles as mwcListItemStyles } from '@material/mwc-list/mwc-list-item.css.js';
import { styles as mwcControlListItemStyles } from '@material/mwc-list/mwc-control-list-item.css.js';
import { style as vwcCheckListItemStyle } from './vwc-check-list-item.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-check-list-item': VWCCheckListItem;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCCheckListItem.styles = [
	styleCoupling,
	mwcListItemStyles,
	mwcControlListItemStyles,
	vwcCheckListItemStyle,
];

/**
 * This component is an extension of [<mwc-check-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)
 */
@customElement('vwc-check-list-item')
export class VWCCheckListItem extends MWCCheckListItem {
	  override render() {
		const checkboxClasses = {
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
      <span class=${classMap(checkboxClasses)}>
        <vwc-checkbox
            reducedTouchTarget
            tabindex=${this.tabindex}
            .checked=${this.selected}
            ?disabled=${this.disabled}
            @change=${this.onChange}>
        </vwc-checkbox>
      </span>
      ${this.left ? text : ''}
      ${meta}`;
	}
}
