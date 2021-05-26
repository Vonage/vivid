import '@vonage/vvd-core';
import {
	customElement,
	html,
	TemplateResult,
} from 'lit-element';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { style as vwcSurfaceStyle } from './vwc-surface.css';

export const COMPONENT_NAME = 'vwc-surface';
export const OPENING_EVENT = 'opening';
export const OPENED_EVENT = 'opened';
export const CLOSING_EVENT = 'closing';
export const CLOSED_EVENT = 'closed';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCSurface;
	}
}

/**
 * `vwc-surface` component is designated to show a surfaced content, similarly but not limited to menu-like use cases
 */
@customElement('vwc-surface')
export class VWCSurface extends MenuBase {
	static styles = [vwcSurfaceStyle];

	render(): TemplateResult {
		return html`
			<mwc-menu-surface
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
				<slot></slot>
			</mwc-menu-surface>
		`;
	}
}
