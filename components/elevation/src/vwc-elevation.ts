import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-elevation.css';
import { property } from 'lit-element/lib/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-elevation': VWCElevation;
	}
}

@customElement('vwc-elevation')
export class VWCElevation extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	@property({ type: Number })
	dp = 2;

	@property({
		type: String,
		attribute: 'background-color'
	})
	backgroundColor: string | null = null;

	@property({
		type: String,
		attribute: 'border-radius'
	})
	borderRadius: string | null = null;

	protected render(): unknown {
		const classList = {
			[`vwc-elevation-dp-${this.dp}`]: true
		};

		const styles = {
			'background-color': this.backgroundColor ? this.backgroundColor : '',
			'border-radius': this.borderRadius ? this.borderRadius : ''
		};

		return html`
			<div id="vwc-elevation-wrapper" style="${styleMap(styles)}" class="${classMap(classList)}">
				<slot></slot>
			</div>
		`;
	}
}
