import '@vonage/vvd-core';
import '@vonage/vwc-surface';
import { VWCMenu } from '@vonage/vwc-menu';
import { html } from 'lit';
import { customElement } from 'lit/decorators';
import { style as vwcDropdownStyle } from './vwc-dropdown.css.js';

export const COMPONENT_NAME = 'vwc-dropdown';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCDropdown;
	}
}

/**
 * This component is an extension of [<vwc-menu>](https://github.com/Vonage/vivid/tree/master/components/menu)
 */
@customElement('vwc-dropdown')
export class VWCDropdown extends VWCMenu {
	static override styles = [vwcDropdownStyle];

	constructor() {
		super();
		this.multi = true;
	}

	override render() {
		return html`
			<vwc-surface
					?hidden=${!this.open}
					.anchor=${this.anchor}
					.open=${this.open}
					.quick=${this.quick}
					.corner=${this.corner}
					.x=${this.x}
					.y=${this.y}
					.absolute=${this.absolute}
					.fixed=${this.fixed}
					.fullwidth=${this.fullwidth}
					.menuCorner=${this.menuCorner}
					?stayOpenOnBodyClick=${this.stayOpenOnBodyClick}
					class="mdc-menu mdc-menu-surface"
					@closed=${this.onClosed}
					@opened=${this.onOpened}
					@keydown=${this.onKeydown}>
				<div class="dropdown-content">
					<div class="section header">
						<slot name="header"></slot>
					</div>
					<div class="section body">
						<slot></slot>
					</div>
					<div class="section actions">
						<slot name="actions"></slot>
					</div>
				</div>
			</vwc-surface>
		`;
	}
}
