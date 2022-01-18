import {
	PropertyValues, html, LitElement, property, query, TemplateResult
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map.js';
import { nothing } from 'lit-html';
import { computePosition, offset, shift, flip, arrow } from '@floating-ui/dom';
import type { Placement, Strategy, Padding } from '@floating-ui/core';

export class VWCPopupBase extends LitElement {
	@query('.popup') protected popupEl!: HTMLElement;
	@query('.popup-arrow') protected arrowEl!: HTMLElement;
	protected padding: Padding = 6;

	/**
	 * @prop open - indicates whether the popup is open
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		open = false;

	/**
	 * @prop anchor - the anchor of the popup
	 * accepts Element
	 * @public
	 * */
	@property({ type: Element, reflect: true })
		anchor!: Element;

	/**
	 * @prop dismissible - adds close button to the popup
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		dismissible?: boolean;

	/**
	 * @prop distance - distance offset
	 * accepts number
	 * @public
	 * */
	@property({ type: Number, reflect: true })
		distance = 10;

	/**
	 * @prop corner - the placement of the popup
	 * accepts  | 'top'
				| 'top-start'
				| 'top-end'
				| 'right'
				| 'right-start'
				| 'right-end'
				| 'bottom'
				| 'bottom-start'
				| 'bottom-end'
				| 'left'
				| 'left-start'
				| 'left-end';
	 * @public
	 * */
	@property({ type: String, reflect: true })
		corner: Placement = 'left';

	/**
	 * @prop strategy - the position of the popup
	 * accepts 'absolute' | 'fixed';
	* @public
	* */
	@property({ type: String, reflect: true })
		strategy: Strategy = 'fixed';

	/**
	 * @prop arrow - adds small triangle to indicate the trigger element
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		arrow?: boolean;

	/**
	 * @prop alternate - set the color-scheme to dark
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		alternate?: boolean;

	/**
	* Opens the popup
	* @public
	*/
	show(): void {
		this.open = true;
		this.updatePosition();
	}

	/**
	 * Closes the popup
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		document.addEventListener('scroll', this.updatePosition);
		document.addEventListener('resize', this.updatePosition);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		document.removeEventListener('scroll', this.updatePosition);
		document.removeEventListener('resize', this.updatePosition);
	}

	protected override firstUpdated(changedProperties: PropertyValues): void {
		super.firstUpdated(changedProperties);
		this.open === true ? this.show() : this.hide();
	}

	protected override updated(changes: Map<string, boolean>): void {
		super.updated(changes);
		this.open === true ? this.show() : this.hide();
	}

	/**
	 * Updates popup position, if succeeded returns - true, if not - false
	 * @public
	 */
	async updatePosition() {
		if (!this.open) {
			return;
		}
		if(!this.anchor){
			this.open = false;
			return;
		}

		const middleware = [flip(), shift({ padding: this.padding }), offset(this.distance)];
		this.arrow ? middleware.push(arrow({ element: this.arrowEl, padding: this.padding })) : nothing;
		try {
			const positionData = await computePosition(this.anchor, this.popupEl, {
				placement: this.corner,
				strategy: this.strategy,
				middleware: middleware
			});
			this.assignPopupPosition(positionData);
		}
		catch (e) {
			this.open = false;
			console.log('popup error: ' + e);
		}
	}

	private assignPopupPosition(data: any): void {
		const { x: popupX, y: popupY } = data;
		Object.assign(this.popupEl.style, {
			left: `${popupX}px`,
			top: `${popupY}px`,
		});

		if (this.arrow) {
			this.assignArrowPosition(data.placement, data.middlewareData.arrow);
		}
	}

	private assignArrowPosition(placementData: any, arrowData: any): void {
		const { x: arrowX, y: arrowY } = arrowData;
		const staticSide: any = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
		const side: string = staticSide[placementData.split('-')[0]];
		Object.assign(this.arrowEl.style, {
			left: arrowX != null ? `${arrowX}px` : '',
			top: arrowY != null ? `${arrowY}px` : '',
			right: '',
			bottom: '',
			[side]: '-4px',
		});
	}

	private handleDismissClick(): void {
		this.hide();
	}

	private renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button @click=${this.handleDismissClick} class="popup-dismissible-button" icon="close-small-solid"
	shape="circled" dense></vwc-icon-button>`
			: nothing;
	}

	private renderArrow(): TemplateResult | unknown {
		return this.arrow ? html`<div class="popup-arrow"></div>` : nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			['popup-open']: !!this.open,
			['popup-dismissible']: !!this.dismissible
		};
	}

	protected override render(): TemplateResult {
		return html`
			<vwc-elevation dp="2">
				<div class="popup ${classMap(this.getRenderClasses())}" aria-hidden=${this.open ? 'false' : 'true'}
					part=${this.alternate ? 'vvd-scheme-alternate' : '' }>
					<slot></slot>
					${this.renderDismissButton()}
					${this.renderArrow()}
				</div>
			</vwc-elevation>
		`;
	}
}
