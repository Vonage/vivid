import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, LitElement, html, property, TemplateResult
} from 'lit-element';
import { nothing } from 'lit-html';
import { style } from './vwc-chip.css';
import { Connotation, Shape } from '@vonage/vvd-foundation/constants';
import { classMap } from 'lit-html/directives/class-map';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-chip': VWCChip;
	}
}

type ChipConnotation = Extract<
	Connotation,
	| Connotation.Primary
	| Connotation.CTA
	>;

type ChipShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

@customElement('vwc-chip')
export class VWCChip extends LitElement {
	static styles = style;
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
	layout?: string;

	@property({ type: Boolean, reflect: true })
	filter = false;

	protected renderIcon(type?: string, isTrailingIcon = false): TemplateResult | typeof nothing {
		const classes = {
			'icon--leading': !isTrailingIcon,
			'icon--trailing': isTrailingIcon
		};

		return html`<vwc-icon class="icon ${classMap(classes)}" .type="${type}"></vwc-icon>`;
	}

	protected renderChipFilter(): TemplateResult {
		const classes = {
			'vwc-chip--selected': this.selected,
		};

		return html`<button
			@click="${() => this.selected = !this.selected}"
			class="vwc-chip ${classMap(classes)}">
			<span class="vwc-chip__checkmark">
				${this.renderIcon('check-circle-solid')}
			</span>
			${this.text}
		</button>`;
	}

	render(): TemplateResult {
		return this.filter
			? this.renderChipFilter()
			: html`<span class="vwc-chip">
			${this.text}
		</span>`;
	}
}
