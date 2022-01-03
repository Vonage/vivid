import '@vonage/vvd-core';
import {
	customElement, property, html, TemplateResult
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Switch as MWCSwitch } from '@material/mwc-switch';
import { style as vwcSwitchStyle } from './vwc-switch.css.js';
import { styles as mwcSwitchStyles } from '@material/mwc-switch/mwc-switch.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
import type { Connotation } from '@vonage/vvd-foundation/constants.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-switch': VWCSwitch;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSwitch.styles = [styleCoupling, mwcSwitchStyles, vwcSwitchStyle];

/**
 * 'Connotation.Success' is  *deprecated*  and will be removed in vivid-3. Use any of the other connotation
 */
type SwitchConnotation = Extract<
	Connotation,
	Connotation.Primary | Connotation.CTA | Connotation.Success | Connotation.Alert
>;

/**
 * This component is an extension of [<mwc-switch>](https://github.com/material-components/material-components-web-components/tree/master/packages/switch)
 */
@customElement('vwc-switch')
export class VWCSwitch extends MWCSwitch {
	@property({ type: String, reflect: true })
		connotation?: SwitchConnotation;

	@property({ type: Boolean, reflect: true })
		enlarged = false;

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
		};
	}

	protected override render(): TemplateResult {
		return html`
      <div class="mdc-switch ${classMap(this.getRenderClasses())}">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          ${this.renderRipple()}
          <div class="mdc-switch__thumb">
            <input
              type="checkbox"
              id="basic-switch"
              class="mdc-switch__native-control"
              role="switch"
              aria-label="${ifDefined(this.ariaLabel)}"
							aria-checked="${this.checked}"
              aria-labelledby="${ifDefined(this.ariaLabelledBy)}"
              @change="${this.changeHandler}"
              @focus="${this.handleRippleFocus}"
              @blur="${this.handleRippleBlur}"
              @mousedown="${this.handleRippleMouseDown}"
              @mouseenter="${this.handleRippleMouseEnter}"
              @mouseleave="${this.handleRippleMouseLeave}"
              @touchstart="${this.handleRippleTouchStart}"
              @touchend="${this.handleRippleDeactivate}"
              @touchcancel="${this.handleRippleDeactivate}">
          </div>
        </div>
      </div>`;
	}

	override async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	protected override renderRipple(): TemplateResult {
		return html``;
	}
}
