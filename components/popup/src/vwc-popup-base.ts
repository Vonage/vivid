import {
	PropertyValues, html, LitElement, property, query, TemplateResult
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map.js';
import { nothing } from 'lit-html';
import { computePosition } from '@floating-ui/dom';

export class VWCPopupBase extends LitElement {
	@query('.popup') protected popup!: HTMLElement;

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
		dismissible?: false;

	/**
	 * @prop arrow - adds small triangle to indicate the trigger element
	 * accepts boolean value
	 * @public
	 * */
	@property({ type: Boolean, reflect: true })
		arrow?: false;

	override firstUpdated(changedProperties: PropertyValues): void {
		super.firstUpdated(changedProperties);
		if (changedProperties.has('open')) {
			if (this.open) {
				this.show();
			}
			else{
				this.hide();
			}
		}
	}

	/**
	 * Opens the popup
	 * @public
	 */
	show(): void {
		this.open = true;
		const positionSucceeded = this.#positionPopup();
		if (!positionSucceeded) {
			this.hide();
		}
	}

	/**
	 * Closes the popup
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	#positionPopup(): boolean {
		let positionSucceeded = false;
		if (this.anchor && this.popup) {
			// Then position the popup
			computePosition(this.anchor, this.popup).then(({ x, y }) => {
				Object.assign(this.popup.style, {
					left: `${x}px`,
					top: `${y}px`,
				});
			});
			positionSucceeded = true;
		}
		else {
			console.log('Please provide valid anchor and popup');
		}
		return positionSucceeded;
	}

	#renderDismissButton(): TemplateResult | unknown {
		return this.dismissible
			? html`<vwc-icon-button class="popup-dismissible" icon="close-small-solid" shape="circled" dense></vwc-icon-button>`
			: nothing;
	}

	protected getRenderClasses(): ClassInfo {
		return {
			['popup-arrow']: !!this.arrow,
			['popup-open']: !!this.open
		};
	}

	protected override render(): TemplateResult {
		return html`
			<!-- TODO: role="?"-->
			<div class="popup ${classMap(this.getRenderClasses())}" aria-hidden=${this.open ? 'false' : 'true'}>
				<slot></slot>
				${this.#renderDismissButton()}
			</div>
		`;
	}
}
