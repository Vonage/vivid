import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import { customElement, property, LitElement, CSSResult } from 'lit-element';
import { style as vwcNoteStyle } from './vwc-note.css';
import { Connotation } from '@vonage/vvd-foundation/constants';
import { html, TemplateResult } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-note': VWCNote;
	}
}

/**
 * `vwc-note` component is designated to layout connotated notification content
 *
 * `vwc-note` provides an attribute-way to manage the connotation, header and icon features
 * while any light DOM within it becomes a message body
 */
@customElement('vwc-note')
export class VWCNote extends LitElement {
	static get styles(): CSSResult[] {
		return [vwcNoteStyle];
	}

	@property({ type: String, reflect: true })
	connotation: Connotation = Connotation.Primary;

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: String, reflect: true })
	header = '';

	protected render(): TemplateResult {
		return html`
			<div class="note-vibe"></div>
			<div class="note-body">
				${this.icon ? this.renderIcon() : ''}
				<div class="note-text">
					${this.header ? this.renderHeader() : ''} ${this.renderMessage()}
				</div>
			</div>
		`;
	}

	private renderIcon(): TemplateResult {
		return html`<div class="note-icon">
			<vwc-icon type="${this.icon}"></vwc-icon>
		</div>`;
	}

	private renderHeader(): TemplateResult {
		return html`<div class="note-header">${this.header}</div>`;
	}

	private renderMessage(): TemplateResult {
		return html`<slot class="note-message"></slot>`;
	}
}
