import {
	html,
	LitElement,
	property,
	customElement,
	CSSResult,
	TemplateResult,
	query,
} from 'lit-element';
import { style as vwcKeypadStyle } from './vwc-keypad.css';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';
import '@vonage/vwc-button/vwc-button';
import '@vonage/vwc-textfield/vwc-textfield';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-keypad': VWCKeypad;
	}
}

@customElement('vwc-keypad')
export class VWCKeypad extends LitElement {
	static get styles(): CSSResult[] {
		return [vwcKeypadStyle, styleCoupling];
	}

	@property({ attribute: 'no-asterisk', type: Boolean }) noAsterisk = false;

	@property({ attribute: 'no-hash', type: Boolean }) noHash = false;

	@property({ attribute: 'no-display', type: Boolean }) noDisplay = false;

	@property({ type: String }) actionText = 'Enter';

	@property({ type: String }) cancelText = 'Cancel';

	@property({ type: String }) digits = '';

	@property({ type: Number }) currentPosition = 0;

	@query('#digits-display') digitsDisplay!: HTMLTextAreaElement;

	@property({ type: Boolean }) actionStarted = false;

	private addDigit(digit: string): void {
		const front = this.digits.substring(0, this.currentPosition);
		const end = this.digits.substring(this.currentPosition);
		this.digits = front + digit + end;
		const digitAdded = new CustomEvent('digit-added', {
			detail: { digit, position: this.currentPosition },
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(digitAdded);
		this.currentPosition++;
	}

	private displayBlur() {
		this.currentPosition = this.digitsDisplay.selectionStart;
	}

	private sendDigits(): void {
		const digitsSent = new CustomEvent('digits-sent', {
			detail: { digits: this.digits },
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(digitsSent);
	}

	createAction(): void {
		this.actionStarted = true;
	}

	private endAction(): void {
		const actionEnded = new CustomEvent('action-ended', {
			detail: {},
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(actionEnded);
		this.digits = '';
		this.actionStarted = false;
	}

	render(): TemplateResult {
		return html`
			<div id="container">
				${this.noDisplay
		? ''
		: html`<vwc-textfield
							id="digits-display"
							outlined
							label="Enter"
							.value=${this.digits}
							@blur=${this.displayBlur}
					  ></vwc-textfield>`}
				<div class="button-row">
					<vwc-button id="1-digit" unelevated @click=${() => this.addDigit('1')}
						>1</vwc-button
					>
					<vwc-button id="2-digit" unelevated @click=${() => this.addDigit('2')}
						>2</vwc-button
					>
					<vwc-button id="3-digit" unelevated @click=${() => this.addDigit('3')}
						>3</vwc-button
					>
				</div>
				<div class="button-row">
					<vwc-button id="4-digit" unelevated @click=${() => this.addDigit('4')}
						>4</vwc-button
					>
					<vwc-button id="5-digit" unelevated @click=${() => this.addDigit('5')}
						>5</vwc-button
					>
					<vwc-button id="6-digit" unelevated @click=${() => this.addDigit('6')}
						>6</vwc-button
					>
				</div>
				<div class="button-row">
					<vwc-button id="7-digit" unelevated @click=${() => this.addDigit('7')}
						>7</vwc-button
					>
					<vwc-button id="8-digit" unelevated @click=${() => this.addDigit('8')}
						>8</vwc-button
					>
					<vwc-button id="9-digit" unelevated @click=${() => this.addDigit('9')}
						>9</vwc-button
					>
				</div>
				<div class="button-row">
					${this.noAsterisk
		? ''
		: html`<vwc-button
								id="asterisk-digit"
								unelevated
								@click=${() => this.addDigit('*')}
								>*</vwc-button
						  >`}
					<vwc-button id="0-digit" unelevated @click=${() => this.addDigit('0')}
						>0</vwc-button
					>
					${this.noHash
		? ''
		: html`<vwc-button
								id="hash-digit"
								unelevated
								@click=${() => this.addDigit('#')}
								>#</vwc-button
						  >`}
				</div>
				<div class="button-row">
					${this.actionStarted
		? html`<vwc-button
								id="cancel-button"
								unelevated
								fullwidth
								@click=${this.endAction}
								>${this.cancelText}</vwc-button
						  >`
		: html`<vwc-button
								id="action-button"
								unelevated
								fullwidth
								@click=${this.sendDigits}
								>${this.actionText}</vwc-button
						  >`}
				</div>
			</div>
		`;
	}
}
