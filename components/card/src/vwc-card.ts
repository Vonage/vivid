import {
	customElement, html, LitElement,
} from 'lit-element';
import { style } from './vwc-card.css.js';
import { property } from 'lit-element/lib/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import '@vonage/vwc-text';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-card': VWCCard;
	}
}

/**
 * @cssprop [--title-line-trim] defines the number of lines presented before trim + ellipsis in the card title
 * @cssprop [--subtitle-line-trim] defines the number of lines presented before trim + ellipsis in the card subtitle
 * */

@customElement('vwc-card')
export class VWCCard extends LitElement {
	/**
	 * @internal
	 */
	static override styles = style;

	@property({
		reflect: true,
		type: String
	})
		heading: string | undefined;

	@property({
		reflect: true,
		type: String
	})
		subtitle: string | undefined;

	@property({
		reflect: true,
		attribute: 'header-icon',
		type: String
	})
		headerIcon: string | null = null;

	@property({
		reflect: true,
		attribute: 'supporting-text',
		type: String
	})
		supportingText: string | undefined;

	private headerIconSlottedItems?: Node[];
	private shouldShowActionsSlot: boolean | undefined;

	private get headerContentExists(): boolean {
		return Boolean(this.heading || this.subtitle || this.headerIcon || this.headerIconSlottedItems?.length);
	}

	private get headerClass(): string {
		return (this.headerContentExists) ? '' : 'no-content';
	}

	protected override render(): unknown {
		const actionsClassMap = {
			'no-content': !(this.shouldShowActionsSlot)
		};
		return html`
			<div class="vwc-card">
				<div class="vwc-card-media">
					<slot name="media"></slot>
				</div>
				<div class="vwc-card-info">
					${this.renderHeader()}
					<div class="vwc-card-supportText">
							${this.supportingText ? this.supportingText : ''}
					</div>
					<div class="vwc-card-actions ${classMap(actionsClassMap)}">
							<slot name="actions" @slotchange="${this.actionsSlotChanged}"></slot>
					</div>
				</div>
			</div>
		`;
	}

	private renderHeader() {
		return html`
			<header class="${this.headerClass}">
				<div class="vwc-card-header">
					<slot name="graphics" @slotchange="${this.graphicsSlotChanged}">
						${this.headerIcon ? this.renderIcon() : ''}
					</slot>
					<vwc-text font-face="subtitle-2" tight class="vwc-card-title">${this.heading}</vwc-text>
				</div>
				<div class="vwc-card-subtitle">${this.subtitle}</div>
			</header>`;
	}

	private renderIcon() {
		return html`<vwc-icon class="header-icon" inline type="${this.headerIcon}"></vwc-icon>`;
	}

	private graphicsSlotChanged() {
		const headerElement = this.shadowRoot?.querySelector('header');
		const slot = headerElement?.querySelector('slot[name="graphics"]') as HTMLSlotElement;
		this.headerIconSlottedItems = slot.assignedNodes();
		if (this.headerContentExists) {
			headerElement?.classList.remove('no-content');
		} else {
			headerElement?.classList.add('no-content');
		}
	}

	private actionsSlotChanged(): void {
		const slot = this.shadowRoot?.querySelector('slot[name="actions"]') as HTMLSlotElement;
		this.shouldShowActionsSlot = Boolean(slot.assignedNodes().length);
		this.requestUpdate();
	}
}
