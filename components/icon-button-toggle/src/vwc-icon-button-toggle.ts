import '@vonage/vvd-core';
import { VWCIconButton } from '@vonage/vwc-icon-button';
import { customElement, html, property, TemplateResult } from 'lit-element';
import { IconButtonToggle as MWCIconButtonToggle } from '@material/mwc-icon-button-toggle';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-icon-button-toggle': VWCIconButtonToggle;
	}
}

MWCIconButtonToggle.styles = VWCIconButton.styles;

/**
 * This component is an extension of [<mwc-icon-button-toggle>](https://github.com/material-components/material-components-web-components/tree/master/packages/icon-button-toggle)
 */
@customElement('vwc-icon-button-toggle')
export class VWCIconButtonToggle extends MWCIconButtonToggle {
	@property({ type: Boolean, reflect: true })
	dense? = false;

	@property({ type: Boolean, reflect: true })
	enlarged? = false;

	protected updated(changes: Map<string, boolean>): void {
		if (changes.has('dense')) {
			if (this.dense && this.enlarged) {
				this.enlarged = undefined;
			}
		}

		if (changes.has('enlarged')) {
			if (this.enlarged && this.dense) {
				this.dense = undefined;
			}
		}
	}

	protected renderIcon(type: string): TemplateResult {
		return html`<vwc-icon class="icon" size="small" type="${type}"></vwc-icon>`;
	}
}
