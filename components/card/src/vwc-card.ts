import { customElement, html, LitElement } from 'lit-element';
import { style } from './vwc-card.css';
import { property } from 'lit-element/lib/decorators';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-card': VWCCard;
	}
}

@customElement('vwc-card')
export class VWCCard extends LitElement {
	/**
	 * @internal
	 */
	static styles = style;

	@property({
		reflect: true,
		attribute: 'heading',
		type: String
	})
	heading = '';

	@property({
		reflect: true,
		attribute: 'header-icon',
		type: String
	})
	headerIcon: string | null = null;

	@property({
		reflect: true,
		attribute: 'badge-content',
		type: String
	})
	badgeContent: string | null = null;

	protected render(): unknown {
		return html`
			<div>
				<div class="vwc-card-media">
					<slot name="media"></slot>
				</div>
				<header>
					<slot name="header-icon">
						<vwc-icon type="${this.headerIcon}"></vwc-icon>
					</slot>
					${this.renderBadge()}
					<div class="vwc-card-header">
						${this.heading}
					</div>
				</header>
				<div class="vwc-card-content">
					<slot></slot>
				</div>
				<div class="vwc-card-actions">
					<slot name="actions">
					</slot>
				</div>
			</div>
		`;
	}

	private renderBadge() {
		return (!this.badgeContent) ? '' :
			html`<vwc-badge>${this.badgeContent}</vwc-badge>`;
	}
}
