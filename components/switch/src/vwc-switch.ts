import '@vonage/vvd-core';
import { html, TemplateResult } from 'lit';
import { customElement,	property } from 'lit/decorators';
import type { ClassInfo } from 'lit/directives/class-map.js';
import { Switch as MWCSwitch } from '@material/mwc-switch';
import { style as vwcSwitchStyle } from './vwc-switch.css.js';
import { styles as mwcSwitchStyles } from '@material/mwc-switch/styles.css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/mdc-vvd-coupling.css.js';
import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';
import type { Connotation } from '@vonage/vvd-foundation/constants.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-switch': VWCSwitch;
	}
}

type SwitchConnotation = Extract<
	Connotation,
	Connotation.Primary | Connotation.CTA | Connotation.Success | Connotation.Alert
>;

/**
 * This component is an extension of [<mwc-switch>](https://github.com/material-components/material-components-web-components/tree/master/packages/switch)
 */
@customElement('vwc-switch')
export class VWCSwitch extends MWCSwitch {
	static override styles = [styleCoupling, mwcSwitchStyles, vwcSwitchStyle];
	@property({ type: String, reflect: true })
		connotation?: SwitchConnotation;

	@property({ type: Boolean, reflect: true })
		enlarged = false;

	protected override getRenderClasses(): ClassInfo {
		return {
			...super.getRenderClasses(),
			[`connotation-${this.connotation}`]: !!this.connotation,
		};
	}

	override async firstUpdated(): Promise<void> {
		await super.firstUpdated();
		handleAutofocus(this);
	}

	// TODO: check if ripple can be disabled by property
	protected override renderRipple(): TemplateResult {
		return html``;
	}
}
