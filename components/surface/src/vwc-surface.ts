import '@vonage/vvd-core';
import { Position } from '@vonage/vvd-foundation/constants';
import {
	customElement,
	html,
	LitElement,
	property,
	TemplateResult,
} from 'lit-element';
import { style as vwcSnackbarStyle } from './vwc-surface.css';
import '@material/mwc-menu/mwc-menu-surface-base';

export const COMPONENT_NAME = 'vwc-surface';
export const OPENING_EVENT = 'opening';
export const OPENED_EVENT = 'opened';
export const CLOSING_EVENT = 'closing';
export const CLOSED_EVENT = 'closed';

declare global {
	interface HTMLElementTagNameMap {
		[COMPONENT_NAME]: VWCSurface;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCSnackbarBase.styles = [mwcSnackbarStyle, vwcSnackbarStyle];

type PositionPair = `${Position.Top | Position.Bottom}-${Position.Start | Position.Center | Position.End}`;

const DEFAULT_POSITION: PositionPair = `${Position.Bottom}-${Position.Center}` as PositionPair;

const POSITION_VALIDATOR = new RegExp(`^(${Position.Top}|${Position.Bottom})-(${Position.Start}|${Position.Center}|${Position.End})$`);

/**
 * `vwc-surface` component is designated to show a surfaced content, similarly but not limited to menu-like use cases
 */
@customElement('vwc-surface')
export class VWCSurface extends LitElement {
	@property({ reflect: true })
	position: PositionPair = DEFAULT_POSITION;

	connectedCallback() {
		super.connectedCallback();
		this.setupEventListeners();
	}

	/* eslint-disable lit-a11y/click-events-have-key-events */
	render(): TemplateResult {
		const position = VWCSurface.preprocessPositionConfig(this.position);
		return html`
			<mwc-menu-surface
				class=""
				?hidden=${!this.open}
				.anchor=${this.anchor}
				.open=${this.open}
				.corner=${this.position}
				.menuCorner="START"
				@closed=${this.onClosed}
				@opened=${this.onOpened}
				@keydown=${this.onKeydown}>
				<slot></slot>
			</mwc-menu-surface>
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

	// private handleActionClick(event: MouseEvent): void {
	// 	this.mdcFoundation.handleActionButtonClick(event);
	// }
	// private handleDismissClick(event: MouseEvent): void {
	// 	this.mdcFoundation.handleActionIconClick(event);
	// }

	private static preprocessPositionConfig(input: PositionPair | undefined): PositionPair {
		let result = DEFAULT_POSITION;

		if (typeof input === 'string' && POSITION_VALIDATOR.test(input)) {
			result = input;
		}

		return result;
	}
}
