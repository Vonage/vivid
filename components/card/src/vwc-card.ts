import {
	customElement, html, LitElement,
} from 'lit-element';
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

	private headerIconSlottedItems?: Node[];

	private get headerContentExists(): boolean {
		return Boolean(this.heading || this.badgeContent || this.headerIcon || this.headerIconSlottedItems?.length);
	}

	protected render(): unknown {
		return html`
			<div class="vwc-card">
				<div class="vwc-card-media">
					<slot name="media"></slot>
				</div>
				<div class="vwc-card-info">
					${this.renderHeader()}
					<div class="vwc-card-content">
						<slot></slot>
					</div>
					<div class="vwc-card-actions">
						<slot name="actions">
						</slot>
					</div>
				</div>
			</div>
		`;
	}

	private renderHeader() {
		return html`
			<header class="${this.headerClass}">
				<div class="vwc-card-header">
					<slot name="header-icon" @slotchange="${this.headerIconSlotChanged}">
						<vwc-icon type="${this.headerIcon}"></vwc-icon>
					</slot>
					<div class="vwc-card-header-text">
						${this.heading}
					</div>
				</div>
				${this.renderBadge()}
			</header>`;
	}

	private get headerClass(): string {
		return (this.headerContentExists) ? '' : 'no-header-content';
	}

	private renderBadge() {
		return (!this.badgeContent) ? '' :
			html`
				<vwc-badge shape="pill">${this.badgeContent}</vwc-badge>`;
	}

	private headerIconSlotChanged() {
		const headerElement = this.shadowRoot?.querySelector('header');
		const slot = headerElement?.querySelector('slot[name="header-icon"]') as HTMLSlotElement;
		this.headerIconSlottedItems = slot.assignedNodes();
		if (this.headerContentExists) {
			headerElement?.classList.remove('no-header-content');
		} else {
			headerElement?.classList.add('no-header-content');
		}
	}
}
