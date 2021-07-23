import {
	LitElement, html, TemplateResult, property
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export class VWCHeroBase extends LitElement {
	@property({ type: String, reflect: true })
	icon?: string;

	@property({ type: String, reflect: true })
	heading?: string;

	@property({ type: String, reflect: true })
	subheading?: string;

	protected renderIcon(): TemplateResult {
		return html`<vwc-icon class="illustration"	type="${ifDefined(this.icon)}"></vwc-icon>`;
	}

	protected renderHeading(): TemplateResult {
		return html`<h3>${this.heading}</h3>`;
	}

	protected renderSubheading(): TemplateResult {
		return html`<p>${this.subheading}</p>`;
	}

	protected render(): TemplateResult {
		return html`<section>
			${this.icon ? this.renderIcon() : nothing}
			${this.heading ? this.renderHeading() : nothing}
			${this.subheading ? this.renderSubheading() : nothing}
		</section>`;
	}
}
