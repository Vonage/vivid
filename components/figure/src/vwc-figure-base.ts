import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	LitElement, html, TemplateResult, property
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export class VWCFigureBase extends LitElement {
		@property({ type: String, reflect: true })
	icon?: string;


		protected renderIcon(): TemplateResult {
			return html`<vwc-icon	type="${ifDefined(this.icon)}"></vwc-icon>`;
		}
		protected render(): TemplateResult {
			return html`<figure>
				<slot name="figure">
					${this.icon ? this.renderIcon() : nothing}
				</slot>
				<figcaption><cite>Edsger Dijkstra:</cite></figcaption>
				<blockquote>If debugging is the process of removing software bugs,
				then programming must be the process of putting them in.</blockquote>
			</figure>`;
		}
}
