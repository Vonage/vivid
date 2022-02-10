import {
	html, LitElement, property, query, TemplateResult, PropertyValues
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map.js';
import { nothing } from 'lit-html';
import { computePosition, offset, shift, flip, arrow } from '@floating-ui/dom';
import type { Placement, Strategy, Padding } from '@floating-ui/core';

export class VWCPopupBase extends LitElement {
	private get PADDING(): Padding { return 0; };
	private get DISTANCE(): number { return 12; };

	private onResizeWindow = this.updatePosition.bind(this);
    @query('.popup-wrapper')
	private popupEl!: HTMLElement;
    @query('.popup-arrow')
    private arrowEl!: HTMLElement;

    private get middleware(): Array<any> {
    	return (
    		this.arrow ? [flip(), shift({ padding: this.PADDING }), arrow({ element: this.arrowEl, padding: this.PADDING }), offset(this.DISTANCE)]
    			: [flip(), shift({ padding: this.PADDING })]);
    };

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
     * @prop anchorEl - popup's anchor element
     * accepts Element
     * @private
     * */
    @property({ type: Element, reflect: true })
    private anchorEl: Element | null | undefined;

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

    // TODO: Make the observer work on positioning for the first time
    // new `IntersectionObserver` constructor
    private observer = new IntersectionObserver((entries) => {
    	for (const entry of entries) {
    		const bounds = entry.boundingClientRect;
    		console.log('anchor element bounds ', bounds);
    		requestAnimationFrame(() => this.updatePosition());
    	}
    });

    override connectedCallback(): void {
    	super.connectedCallback();
    	window.addEventListener('scroll', this.updatePosition);
    	window.addEventListener('resize', this.onResizeWindow);
    }

    override disconnectedCallback(): void {
    	super.disconnectedCallback();
    	window.removeEventListener('scroll', this.updatePosition);
    	window.removeEventListener('resize', this.onResizeWindow);
    	// Disconnect the observer to stop from running in the background
    	this.observer.disconnect();
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
    	super.firstUpdated(_changedProperties);
    	this.anchorEl = this.getAnchorById();
    	if(this.anchorEl) this.observer.observe(this.anchorEl);
    }

    protected override updated(changes: Map<string, boolean>): void {
    	super.updated(changes);
    	if (changes.has('anchor')) {
    		this.anchorEl = this.getAnchorById();
    	}
    	this.updatePosition();
    }

    /**
     * Updates popup position, if succeeded returns - true, if not - false
     * @public
     */
    async updatePosition() {
    	if (!this.open) {
    		return;
    	}
    	if (!this.anchorEl) {
    		this.hide();
    		console.error('Anchor is not defined');
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
    	Object.assign(this.popupEl.style, {
    		left: `${popupX}px`,
    		top: `${popupY}px`,
    	});
    }

    private assignArrowPosition(data: any): void {
    	const { x: arrowX, y: arrowY } = data.middlewareData.arrow;
    	const staticSide: any = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
    	const side: string = staticSide[data.placement.split('-')[0]];
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
    	const part = this.alternate ? 'vvd-scheme-alternate' : '';
    	const aria = this.open ? 'false' : 'true';

    	return html`
            <div class="popup-wrapper">
                <vwc-elevation dp="2">
                    <div class="popup ${classMap(this.getRenderClasses())}" aria-hidden=${aria} part=${part}>
                        <div class="popup-content">
                            <slot></slot>
                            ${this.renderDismissButton()}
                        </div>
                        ${this.renderArrow()}
                    </div>
                </vwc-elevation>
            </div>
		`;
    }
}
