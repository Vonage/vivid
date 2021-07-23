import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement } from 'lit-element';
import { VWCHeroBase } from './vwc-hero-base.js';
import { style } from './vwc-hero.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-hero': VWCHero;
	}
}

@customElement('vwc-hero')
export class VWCHero extends VWCHeroBase {
	/**
	 * @internal
	 */
	static styles = style;
}
