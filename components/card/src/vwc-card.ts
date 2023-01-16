import {
	customElement, html, LitElement,
} from 'lit-element';
import { nothing } from 'lit-html';
import { style } from './vwc-card.css.js';
import { property } from 'lit-element/lib/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';
import '@vonage/vwc-elevation';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-card': VWCCard;
	}
}

const elevationSets = ['0' , '2', '4', '8', '12' , '16' , '24'];
export type IndicatorElevationSets = typeof elevationSets;

/**
 * @cssprop [--title-line-clamp] defines the number of lines presented before trim + ellipsis in the card title
 * @cssprop [--subtitle-line-clamp] defines the number of lines presented before trim + ellipsis in the card subtitle
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
		attribute: 'icon',
		type: String
	})
		icon: string | null = null;

	@property({
		reflect: true,
		attribute: 'text',
		type: String
	})
		text: string | undefined;

	@property({
		reflect: false,
		attribute: 'elevation',
		type: String
	})
		elevation: IndicatorElevationSets[number] = '4';

	private IconSlottedItems?: Node[];
	#shouldShowFooterSlot: boolean | undefined;

	private get headerContentExists(): boolean {
		return Boolean(this.heading || this.subtitle || this.icon || this.IconSlottedItems?.length);
	}

	private get headerClass(): string {
		return (this.headerContentExists) ? '' : 'no-content';
	}


	protected override render(): unknown {
		const footerClassMap = {
			'no-content': !(this.#shouldShowFooterSlot)
		};
		return html`
			<vwc-elevation .dp=${this.elevation}>
			<!-- there are 2 wrapper due to a safari bug failing 'filter: drop-shadow'
			from rendering shadow on an element with 'overflow: hidden' -->
				<div class="vwc-card">
					<div class="vwc-card-container">
						<div class="vwc-card-media">
							<slot name="media"></slot>
						</div>
						<slot name="main">
							<div class="vwc-card-content">
								<div class="vwc-card-wrapper">
									${this.renderHeader()}
									<slot name="meta"></slot>
								</div>
								<div class="vwc-card-text">
									${this.text ? this.text : nothing}
								</div>
							</div>
						</slot>
						<div class="vwc-card-footer ${classMap(footerClassMap)}">
							<slot name="footer" @slotchange="${this.footerSlotChanged}"></slot>
						</div>
					</div>
				</div>
			</vwc-elevation>
		`;
	}

	private renderHeader() {
		return html`
			<header class="vwc-card-header ${this.headerClass}">
				<slot name="graphic" @slotchange="${this.graphicSlotChanged}">
					${this.icon ? this.renderIcon() : ''}
				</slot>
				<div>
					<div class="vwc-card-title">${this.heading}</div>
					<div class="vwc-card-subtitle">${this.subtitle}</div>
				</div>
			</header>`;
	}

	private renderIcon() {
		return html`<vwc-icon class="icon" inline type="${this.icon}"></vwc-icon>`;
	}

	private graphicSlotChanged() {
		const headerElement = this.shadowRoot?.querySelector('header');
		const slot = headerElement?.querySelector('slot[name="graphic"]') as HTMLSlotElement;
		this.IconSlottedItems = slot.assignedNodes();
		if (this.headerContentExists) {
			headerElement?.classList.remove('no-content');
		} else {
			headerElement?.classList.add('no-content');
		}
	}

	private footerSlotChanged(): void {
		const slot = this.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
		this.#shouldShowFooterSlot = Boolean(slot.assignedNodes().length);
		this.requestUpdate();
	}
}
