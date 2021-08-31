import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import {
	customElement, property, LitElement, CSSResult
} from 'lit-element';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
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

	protected getRenderClasses(): ClassInfo {
		return {
			'vwc-note--connotation-success': this.connotation == 'success',
			'vwc-note--connotation-alert': this.connotation == 'alert',
			'vwc-note--connotation-warning': this.connotation == 'warning',
			'vwc-note--connotation-info': this.connotation == 'info',
			'vwc-note--connotation-announcement': this.connotation == 'announcement',
		};
	}

	protected render(): TemplateResult {
		return html`
			<div class="vwc-note ${classMap(this.getRenderClasses())}">
				${this.icon ? this.renderIcon() : ''}
				<div class="note-text">
					${this.header ? this.renderHeader() : ''} ${this.renderMessage()}
				</div>
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
