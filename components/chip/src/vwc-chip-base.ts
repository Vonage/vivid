import '@material/mwc-ripple/mwc-ripple';
import { Ripple } from '@material/mwc-ripple/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';

import { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants';
import { classMap } from 'lit-html/directives/class-map';
import {
	 LitElement, html, property, TemplateResult, queryAsync, state, query, eventOptions
} from 'lit-element';


type ChipConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	>;

type ChipShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

type ChipLayout = Extract<
	Layout, Layout.Outlined_Duotone | Layout.Soft
>;
export class VWCChipBase extends LitElement {
  @queryAsync('mwc-ripple') ripple!: Promise<Ripple|null>;

	@query('#button') buttonElement!: HTMLElement;

	@property({ type: String, reflect: true })
	text?: string;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	dense?: boolean;

	@property({ type: Boolean, reflect: true })
	enlarged?: boolean;

	@property({ type: String, reflect: true })
	connotation?: ChipConnotation;

	@property({ type: String, reflect: true })
	shape?: ChipShape;

	@property({ type: String, reflect: true })
	layout?: ChipLayout;

	@property({ type: Boolean, reflect: true })
	filter = false;

  @state() protected shouldRenderRipple = false;

  protected rippleHandlers = new RippleHandlers(() => {
  	this.shouldRenderRipple = true;
  	return this.ripple;
  });

  focus() {
  	const buttonElement = this.buttonElement;
  	if (buttonElement) {
  		this.rippleHandlers.startFocus();
  		buttonElement.focus();
  	}
  }

  blur() {
  	const buttonElement = this.buttonElement;
  	if (buttonElement) {
  		this.rippleHandlers.endFocus();
  		buttonElement.blur();
  	}
  }

  // protected firstUpdated(): void {
  // 	if (this.selected) {
  // 		this.handleRippleActivate();
  // 	}
  // }

  protected renderRipple(): TemplateResult | string {
  	return this.shouldRenderRipple ?
  		html`<mwc-ripple class="ripple"></mwc-ripple>` : '';
  }

  protected renderIcon(type?: string): TemplateResult {
  	return html`<vwc-icon class="vwc-chip__icon" .type="${type}"></vwc-icon>`;
  }

  protected renderChipFilter(): TemplateResult {
  	const classes = {
  		'vwc-chip--selected': this.selected,
  	};

  	return html`<div
			id="button"
			type="button"
			class="vwc-chip vwc-chip-button ${classMap(classes)}"
			role="option"
			aria-selected="${this.selected}"
			tabindex="-1"
			@focus="${this.handleRippleFocus}"
			@blur="${this.handleRippleBlur}"
			@mousedown="${this.handleRippleActivate}"
			@mouseenter="${this.handleRippleMouseEnter}"
			@mouseleave="${this.handleRippleMouseLeave}"
			@touchstart="${this.handleRippleActivate}"
			@touchend="${this.handleRippleDeactivate}"
			@touchcancel="${this.handleRippleDeactivate}"
			@click="${() => this.selected = !this.selected}"
			@keydown="${this.handleKeydown}">
			${this.renderRipple()}
			<span class="vwc-chip__checkmark">
				${this.renderIcon('check-circle-solid')}
			</span>
			<span class="text">
				${this.text}
			</span>
		</div>`;
  }

  render(): TemplateResult {
  	return this.filter
  		? this.renderChipFilter()
  		: html`<span class="vwc-chip">
			${this.text}
		</span>`;
  }

  handleKeydown({ key }: KeyboardEvent): void {
  	if (key === ' '/* spacebar */) {
  		this.selected = !this.selected;
  	}
  }

	@eventOptions({ passive: true })
  protected handleRippleActivate(evt?: Event): void {
  	const onUp = () => {
  		window.removeEventListener('mouseup', onUp);

  		this.handleRippleDeactivate();
  	};

  	window.addEventListener('mouseup', onUp);
  	this.rippleHandlers.startPress(evt);
  }

	protected handleRippleDeactivate(): void {
  	this.rippleHandlers.endPress();
	}

	protected handleRippleMouseEnter(): void {
  	this.rippleHandlers.startHover();
	}

	protected handleRippleMouseLeave(): void {
  	this.rippleHandlers.endHover();
	}

	protected handleRippleFocus(): void {
  	this.rippleHandlers.startFocus();
	}

	protected handleRippleBlur(): void {
  	this.rippleHandlers.endFocus();
	}
}
