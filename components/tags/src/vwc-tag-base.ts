import '@material/mwc-ripple/mwc-ripple';
import { Ripple } from '@material/mwc-ripple/mwc-ripple';
import { RippleHandlers } from '@material/mwc-ripple/ripple-handlers';

import { Connotation, Shape, Layout } from '@vonage/vvd-foundation/constants';
import { classMap } from 'lit-html/directives/class-map';
import {
	 LitElement, html, property, TemplateResult, queryAsync, state, query, eventOptions
} from 'lit-element';


type TagConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	>;

type TagShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

type TagLayout = Extract<
	Layout, Layout.Outlined | Layout.Soft
>;
export class VWCTagBase extends LitElement {
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
	connotation?: TagConnotation;

	@property({ type: String, reflect: true })
	shape?: TagShape;

	@property({ type: String, reflect: true })
	layout?: TagLayout;

	@property({ type: Boolean, reflect: true })
	selectable = false;

  @state() protected shouldRenderRipple = false;

  protected rippleHandlers = new RippleHandlers(() => {
  	this.shouldRenderRipple = true;
  	return this.ripple;
  });

  focus(): void {
  	const buttonElement = this.buttonElement;
  	if (buttonElement) {
  		this.rippleHandlers.startFocus();
  		buttonElement.focus();
  	}
  }

  blur(): void {
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
  	return html`<vwc-icon class="vwc-tag__icon" .type="${type}"></vwc-icon>`;
  }

  protected renderTagSelectable(): TemplateResult {
  	const classes = {
  		'vwc-tag--selected': this.selected,
  	};

  	return html`<div
			id="button"
			type="button"
			class="vwc-tag vwc-tag-button ${classMap(classes)}"
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
			<span class="vwc-tag__checkmark">
				${this.renderIcon('check-circle-solid')}
			</span>
			<span class="text">
				${this.text}
			</span>
		</div>`;
  }

  render(): TemplateResult {
  	return this.selectable
  		? this.renderTagSelectable()
  		: html`<span class="vwc-tag">
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
