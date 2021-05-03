import '@vonage/vvd-core';
import '@vonage/vwc-icon-button';
import { Connotation, Position } from '@vonage/vvd-foundation/constants';
import {
	customElement,
	html,
	property,
	TemplateResult,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { SnackbarBase as MWCSnackbarBase } from '@material/mwc-snackbar/mwc-snackbar-base';
import { style as vwcSnackbarStyle } from './vwc-snackbar.css';
import { style as mwcSnackbarStyle } from '@material/mwc-snackbar/mwc-snackbar-css';

export const COMPONENT_NAME = 'vwc-snackbar';
export const OPENING_EVENT = 'opening';
export const OPENED_EVENT = 'opened';
export const CLOSING_EVENT = 'closing';
export const CLOSED_EVENT = 'closed';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCSnackbar;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSnackbarBase.styles = [mwcSnackbarStyle, vwcSnackbarStyle];

type NoteConnotation = Extract<
	Connotation,
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Info
	| Connotation.Announcement
>;

type PositionPair = `${Position.Top | Position.Bottom}-${Position.Start | Position.Center | Position.End}`;

const DEFAULT_POSITION: PositionPair = `${Position.Bottom}-${Position.Center}` as PositionPair;

const POSITION_VALIDATOR = new RegExp(`^(${Position.Top}|${Position.Bottom})-(${Position.Start}|${Position.Center}|${Position.End})$`);

/**
 * `vwc-snackbar` component is designated to show a short-time-living, non-intrusive user notification
 *
 * `vwc-snackbar` is an extension of [<mwc-snackbar>](https://github.com/material-components/material-components-web-components/tree/master/packages/snackbar)
 */
@customElement('vwc-snackbar')
export class VWCSnackbar extends MWCSnackbarBase {
	@property({ type: Boolean, reflect: true })
	legacy = false;

	@property({ reflect: true })
	position: PositionPair = DEFAULT_POSITION;

	@property({ type: String, reflect: true })
	connotation?: NoteConnotation;

	@property({ type: String, reflect: true })
	icon?: string;

	@property({ type: String, reflect: true })
	header?: string;

	@property({ type: String, reflect: true })
	message?: string;

	@property({ type: Boolean, reflect: true })
	dismissible?: boolean;

	connectedCallback() {
		super.connectedCallback();
		this.setupEventListeners();
	}

	/* eslint-disable lit-a11y/click-events-have-key-events */
	render() {
		const position = VWCSnackbar.preprocessPositionConfig(this.position);
		return html`
			<div class="mdc-snackbar" position="${position}">
				<div class="mdc-snackbar__surface">
					${this.legacy ? this.renderLegacy() : this.renderModern()}
				</div>
			</div>
		`;
	}

	private setupEventListeners(): void {
		const MDCEventPrefix = 'MDCSnackbar';
		for (const eventName of [OPENING_EVENT, OPENED_EVENT, CLOSING_EVENT, CLOSED_EVENT]) {
			this.addEventListener(`${MDCEventPrefix}:${eventName}`, this.getEventHandler(eventName));
		}
	}

	private getEventHandler(eventName: string): (event: Event) => void {
		return (e) => {
			const event = eventName;
			const reason = (e as any).reason;
			const detail = reason ? { reason: reason } : null;
			const forwardedEvent = new CustomEvent(event, { bubbles: true, composed: true, detail: detail });
			this.dispatchEvent(forwardedEvent);
		};
	}

	private handleActionClick(event: MouseEvent): void {
		this.mdcFoundation.handleActionButtonClick(event);
	}
	private handleDismissClick(event: MouseEvent): void {
		this.mdcFoundation.handleActionIconClick(event);
	}

	private renderLegacy(): TemplateResult {
		return html`<div class="legacy-flavor">
				<vwc-note
					icon="${ifDefined(this.icon)}"
					connotation="${ifDefined(this.connotation)}"
					header="${ifDefined(this.header)}"
				>
					<div class="snackbar-content">
						<div>
							${this.message}
							<div class="action-container">
								<slot name="action" @click="${this.handleActionClick}"></slot>
							</div>
						</div>
						<div class="dismiss-container">
							${this.renderDismissAction()}
						</div>
					</div>
				</vwc-note>
			</div>`;
	}

	private renderModern(): TemplateResult {
		return html`<div class="modern-flavor" part="vvd-scheme-alternate">
				<vwc-note
					icon="${ifDefined(this.icon)}"
					connotation="${ifDefined(this.connotation)}"
					header="${ifDefined(this.header)}"
				>
					<div class="snackbar-content">
						<div>
							${this.message}
							<div class="action-container">
								<slot name="action" @click="${this.handleActionClick}"></slot>
							</div>
						</div>
						<div class="dismiss-container">
							${this.renderDismissAction()}
						</div>
					</div>
				</vwc-note>
			</div>`;
	}

	private renderDismissAction(): TemplateResult | string {
		if (!this.dismissible) {
			return '';
		}

		return html`
			<vwc-icon-button
				class="dismiss-button"
				icon="close-line"
				dense
				@click="${this.handleDismissClick}"
			>
			</vwc-icon-button>
		`;
	}

	private static preprocessPositionConfig(input: PositionPair | undefined): PositionPair {
		let result = DEFAULT_POSITION;

		if (typeof input === 'string' && POSITION_VALIDATOR.test(input)) {
			result = input;
		}

		return result;
	}
}
