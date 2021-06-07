import '@vonage/vvd-core';
import {
	customElement,
	html,
	property,
	LitElement,
	TemplateResult,
	PropertyValues,
} from 'lit-element';
import { style } from './vwc-theme.css';
import { Scheme } from './vwc-theme-types';
import { getPreferedColorScheme } from './vwc-theme-utils';

export const COMPONENT_NAME = 'vwc-theme';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCTheme;
	}
}

/**
 * `vwc-theme` component is designated to wrap html scope in an ui-contrasting region
 */
@customElement('vwc-theme')
export class VWCTheme extends LitElement {
	static styles = [style];

	@property({	type: String,	reflect: true })
	scheme?: Scheme = getPreferedColorScheme();

	updated(changes: PropertyValues): void {
		super.updated(changes);
		console.log(this.scheme);
		console.log(changes.get('scheme'));
		if (changes.has('scheme')) {
			this.notifyChange();
		}
	}

	protected notifyChange(): void {
		const ev = new Event('change', { bubbles: true });
		this.dispatchEvent(ev);
	}

	protected render(): TemplateResult {
		return html`
		<div class="container">
				<slot></slot>
			</div>
			`;
	}
}
