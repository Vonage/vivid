import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, property, LitElement, CSSResult
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { style as vwcNoteStyle } from './vwc-note.css';
import { Connotation } from '@vonage/vvd-foundation/constants';
import { html, TemplateResult } from 'lit-element';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-note': VWCNote;
	}
}
type NoteConnotation = Extract<
	Connotation,
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Info
	| Connotation.Announcement
>;

/**
 * `vwc-note` component is designated to layout connotated notification content
 *
 * `vwc-note` exposes APIs to set the connotation, header and icon features
 * any light DOM within `vwc-note` becomes a body of the message.
 */
@customElement('vwc-note')
export class VWCNote extends LitElement {
	static get styles(): CSSResult[] {
		return [vwcNoteStyle];
	}

	@property({ type: String, reflect: true })
	connotation?: NoteConnotation;

	@property({ type: String, reflect: true })
	icon?: string;

	@property({ type: String, reflect: true })
	header?: string;

	protected render(): TemplateResult {
		return html`
			${this.icon ? this.renderIcon() : ''}
			<div class="note-text">
				${this.header ? this.renderHeader() : ''} ${this.renderMessage()}
			</div>
		`;
	}

	private renderIcon(): TemplateResult {
		return html`<vwc-icon class="note-icon" type="${ifDefined(this.icon)}" part="icon"></vwc-icon>`;
	}

	private renderHeader(): TemplateResult {
		return html`<div class="note-header">${this.header}</div>`;
	}

	private renderMessage(): TemplateResult {
		return html`<slot class="note-message"></slot>`;
	}
}
