import '@vonage/vvd-core';
import '@vonage/vwc-surface';
import '@vonage/vwc-list';
import { MenuBase as MWCMenuBase } from '@material/mwc-menu/mwc-menu-base';
import { MDCMenuAdapter } from '@material/menu';
import { customElement, html } from 'lit-element';
import { styles as mwcMenuStyles } from '@material/mwc-menu/mwc-menu.css.js';
import { style as vwcMenuStyle } from './vwc-menu.css';
import { VWCList } from '@vonage/vwc-list';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-menu': VWCMenu;
	}
}

/**
 * This component is an extension of [<mwc-menu>](https://github.com/material-components/material-components-web-components/tree/master/packages/menu)
 */
@customElement('vwc-menu')
export class VWCMenu extends MWCMenuBase {
	static override styles = [mwcMenuStyles, vwcMenuStyle];

	get listElement(): VWCList | null {
		if (!this.listElement_) {
			this.listElement_ = this.renderRoot.querySelector('.vwc-menu-list');
			return this.listElement_;
		}
		return this.listElement_;
	}

	createAdapter(): MDCMenuAdapter {
		const baseAdapter = super.createAdapter();
		const baseCloseSurface = baseAdapter.closeSurface;
		baseAdapter.closeSurface = () => {
			if (!this.multi && !this.activatable) {
				baseCloseSurface();
			}
		};
		return baseAdapter;
	}

	render() {
		const itemRoles = this.innerRole === 'menu' ? 'menuitem' : 'option';
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
				<vwc-list
					rootTabbable
					.innerRole=${this.innerRole}
					.multi=${this.multi}
					class="vwc-menu-list mdc-deprecated-list"
					.itemRoles=${itemRoles}
					.wrapFocus=${this.wrapFocus}
					.activatable=${this.activatable}
					@action=${this.onAction}>
					<slot></slot>
				</vwc-list>
			</vwc-surface>
		`;
	}
}
