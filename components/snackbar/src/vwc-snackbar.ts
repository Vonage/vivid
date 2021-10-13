import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';

import { Connotation, Position } from '@vonage/vvd-foundation/constants';
import {
	customElement,
	html,
	property,
	TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import type { ClassInfo } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { SnackbarBase as MWCSnackbarBase } from '@material/mwc-snackbar/mwc-snackbar-base';
import { style as vwcSnackbarStyle } from './vwc-snackbar.css.js';
import { styles as mwcSnackbarStyles } from '@material/mwc-snackbar/mwc-snackbar.css.js';
import { accessibleSnackbarLabel } from '@material/mwc-snackbar/accessible-snackbar-label-directive.js';

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
	message = '';

	@property({ type: Boolean, reflect: true })
	dismissible?: boolean;

	override connectedCallback() {
  	super.connectedCallback();
  	this.setupEventListeners();
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

	protected getRenderClasses(): ClassInfo {
  	return {
  		[`connotation-${this.connotation}`]: !!this.connotation,
  		'vwc-snackbar-legacy': this.legacy
  	};
	}

	/* eslint-disable lit-a11y/click-events-have-key-events */
	override render(): TemplateResult {
  	const position = VWCSnackbar.preprocessPositionConfig(this.position);
  	const alternate = !this.legacy ? 'vvd-scheme-alternate' : undefined;

  	return html`
			<div
				class="mdc-snackbar ${classMap(this.getRenderClasses())}"
				position="${position}"
				part="${ifDefined(alternate)}"
				@keydown="${this._handleKeydown}">
				<div class="mdc-snackbar__surface">
					${this.icon ? this.renderIcon() : ''}
					${this.legacy ? this.renderLegacyUi() : accessibleSnackbarLabel(this.message, this.open)}
					<div class="mdc-snackbar__actions">
            ${!this.legacy ? html`<slot name="action" @click="${this._handleActionClick}"></slot>` : ''}
						${this.renderDismissAction()}
          </div>
				</div>
			</div>
		`;
	}
	/* eslint-enable lit-a11y/click-events-have-key-events */

	private renderHeading(): TemplateResult | string {
		return html`<h3 class="heading" aria-hidden="true">
					${this.header}
				</h3>`;
	}

	/* eslint-disable lit-a11y/click-events-have-key-events */
	// this is a legacy ui obligation which doesn't fit in the snackbar practice
	// TODO depreacte on the 1st chance
	private renderLegacyUi(): TemplateResult | string {
		return html`
			<div class="header-and-label">
				${this.header ? this.renderHeading() : ''}
				${accessibleSnackbarLabel(this.message, this.open)}
				<slot name="action" @click="${this._handleActionClick}"></slot>
			</div>`;
	}
	/* eslint-enable lit-a11y/click-events-have-key-events */

	protected renderIcon(): TemplateResult {
  	return html`
    <vwc-icon class="icon" type="${this.icon}"></vwc-icon>`;
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
					@click="${this._handleDismissClick}"
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
