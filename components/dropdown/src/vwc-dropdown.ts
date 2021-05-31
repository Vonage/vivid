import '@vonage/vvd-core';
import '@vonage/vwc-surface';
import '@material/mwc-list';
import { VWCMenu } from '@vonage/vwc-menu';
import { customElement, html } from 'lit-element';
import { style as vwcDropdownStyle } from './vwc-dropdown.css';

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
	static styles = [vwcDropdownStyle];

	constructor() {
		super();
		this.multi = true;
	}

	render() {
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
				<div class="dropdown-container">
					<slot name="header"></slot>
					<slot></slot>
					<slot name="footer"></slot>
				</div>
			</vwc-surface>
		`;
	}
}
