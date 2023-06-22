import {
	html, LitElement, property, query, TemplateResult
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map.js';
import { nothing } from 'lit-html';
import { arrow, autoUpdate, computePosition, flip, hide, inline, offset, Strategy } from '@floating-ui/dom';
import type { Placement, Padding } from '@floating-ui/dom';

export class VWCPopupBase extends LitElement {
	private get PADDING(): Padding { return 0; };
	private get DISTANCE(): number { return 12; };
	private get arrowPosition(): any { return { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }; }
	private cleanup?: () => void; // cleans the autoupdate

    @query('.popup-wrapper')
	private popupEl!: HTMLElement;
    @query('.popup-arrow')
    private arrowEl!: HTMLElement;
    private anchorEl: Element | null | undefined;

    private get middleware(): Array<any> {
    	const middleware = [flip(), hide(), inline()];
    	if (this.arrow) { middleware.push(arrow({ element: this.arrowEl, padding: this.PADDING }), offset(this.DISTANCE)); }
    	return middleware;
    }

    /**
     * @prop open - indicates whether the popup is open
     * accepts boolean value
     * @public
     * */
    @property({ type: Boolean, reflect: true })
    	open = false;

    /**
     * @prop anchor - ID reference to element in the popup’s owner document.
     * accepts string
     * @public
     * */
    @property({ type: String, reflect: true })
    	anchor = '';

    /**
     * @prop dismissible - adds close button to the popup
     * accepts boolean value
     * @public
     * */
    @property({ type: Boolean, reflect: true })
    	dismissible?: boolean;

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
     * Gets the anchor element by id
     */
    private getAnchorById(): HTMLElement | null {
    	return document.getElementById(this.anchor);
    };

    /**
    * Opens the popup
    * @public
    */
    show(): void {
    	if (this.anchorEl) { // only if anchor element exists
    		this.open = true;
    	}
    }

    /**
     * Closes the popup
     * @public
     */
    hide(): void {
    	this.open = false;
    }

    override disconnectedCallback(): void {
    	super.disconnectedCallback();
    	this.cleanup?.();
    }

    protected override updated(changes: Map<string, boolean>): void {
    	super.updated(changes);
    	if (changes.has('anchor')) {
    		this.anchorEl = this.getAnchorById();
    	}
    	if (this.anchorEl && this.popupEl) {
    		this.cleanup?.();
    		this.cleanup = autoUpdate(this.anchorEl, this.popupEl, () => this.updatePosition());
    	}
    	else {
    		this.cleanup?.();
    	}
    }

    /**
     * Updates popup position, if succeeded returns - true, if not - false
     * @public
     */
    async updatePosition() {
    	if (!this.open || !this.anchorEl) {
    		return;
    	}

    	const positionData = await computePosition(this.anchorEl, this.popupEl, {
    		placement: this.corner,
    		strategy: this.strategy,
    		middleware: this.middleware
    	});
    	this.assignPopupPosition(positionData);
    	if (this.arrow) { this.assignArrowPosition(positionData); }
    }

    private assignPopupPosition(data: any): void {
    	const { x: popupX, y: popupY } = data;
    	const { referenceHidden } = data.middlewareData.hide;
    	Object.assign(this.popupEl.style, {
    		left: `${popupX}px`,
    		top: `${popupY}px`,
    		visibility: referenceHidden ? 'hidden' : 'visible',
    	});
    }

    private assignArrowPosition(data: any): void {
    	const { x: arrowX, y: arrowY } = data.middlewareData.arrow;
    	const side: string = this.arrowPosition[data.placement.split('-')[0]];
    	Object.assign(this.arrowEl.style, {
    		left: `${arrowX}px`,
    		top: `${arrowY}px`,
    		[this.arrowPosition[side]]: '',
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
    	const alternate = this.alternate ? 'vvd-scheme-alternate' : '';
    	const aria = this.open ? 'false' : 'true';

    	return html`
                <vwc-elevation dp="2">
									<!-- 'popup-wrapper' is selected by the wrapping elevation, thus required for shadow styling -->
									<!-- the reason for not applying directly to its first-child 'popup' is to avoid scenario where popup is set to alternate scheme
												and affect the shadow style surfacing contrast which should still in default scheme context -->
									<div class="popup-wrapper ${this.strategy}">
                    <div class="popup ${classMap(this.getRenderClasses())}" aria-hidden=${aria} part=${alternate}>
                        <div class="popup-content" >
                            <slot></slot>
                            ${this.renderDismissButton()}
                        </div>
                        ${this.renderArrow()}
                    </div>
									</div>
                </vwc-elevation>

		`;
    }
}

