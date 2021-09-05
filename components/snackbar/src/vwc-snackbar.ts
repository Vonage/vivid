import '@vonage/vvd-core';
import '@vonage/vwc-note';
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
import { styles as mwcSnackbarStyles } from '@material/mwc-snackbar/mwc-snackbar.css.js';

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
MWCSnackbarBase.styles = [mwcSnackbarStyles, vwcSnackbarStyle];

type SnackbarConnotation = Extract<
	Connotation,
	| Connotation.Alert
	| Connotation.Announcement
	| Connotation.Info
	| Connotation.Success
	| Connotation.Warning
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
	connotation?: SnackbarConnotation;

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
					${this.legacy ? this.renderUiLegacy() : this.renderUiDefault()}
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
			const originalDetail = (e as CustomEvent).detail;
			const detail = originalDetail ? Object.assign({}, originalDetail) : null;
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

	private renderUiDefault(): TemplateResult {
		return html`<div class="vvd-snackbar" part="vvd-scheme-alternate">
				<vwc-note
					class="vwc-note"
					icon="${ifDefined(this.icon)}"
				>${this.message}
				</vwc-note>
				<div class="actions-container">
					<div class="action-container">
						<slot name="action" @click="${this.handleActionClick}"></slot>
					</div>
					${this.renderDismissAction()}
				</div>
			</div>`;
	}

	private renderUiLegacy(): TemplateResult {
		return html`<div class="vvd-snackbar">
				<vwc-note
					class="vwc-note"
					icon="${ifDefined(this.icon)}"
					header="${ifDefined(this.header)}"
				>
					<div class="snackbar-content">
						<div>
							${this.message}
							<div class="action-container">
								<slot name="action" @click="${this.handleActionClick}"></slot>
							</div>
						</div>
						${this.renderDismissAction()}
					</div>
				</vwc-note>
			</div>`;
	}

	private renderDismissAction(): TemplateResult | string {
		if (!this.dismissible) {
			return '';
		}

		return html`
			<div class="dismiss-container">
				<vwc-icon-button
					class="dismiss-button"
					icon="close-line"
					layout="ghost"
					dense
					@click="${this.handleDismissClick}"
				>
				</vwc-icon-button>
			</div>
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
