import { html, css, LitElement, property } from 'lit-element';
import '@vonage/vwc-button/vwc-button';
import '@vonage/vwc-textfield/vwc-textfield';

export class VwcKeypad extends LitElement {
	static styles = css`
		:host {
			display: block;
			padding: 25px;
			color: var(--vwc-keypad-text-color, #000);
		}
		.large {
			font-size: 200%;
		}

		.span {
			width: 4rem;
			display: inline-block;
			text-align: center;
		}

		.btn {
			width: 64px;
			height: 64px;
			border: none;
			border-radius: 10px;
			background-color: seagreen;
			color: white;
			margin: 10px;
			cursor: pointer;
		}

		.btn:disabled {
			background-color: gray;
		}

		#container {
			width: 75vw;
			max-width: 300px;
		}

		.button-row {
			display: flex;
			justify-content: space-evenly;
		}

		.full-width {
			width: 100%;
		}

		#hangup {
			background-color: red;
		}

		vwc-button {
			margin: 10px;
		}

		vwc-textfield {
			width: 100%;
		}
	`;

	@property({ attribute: 'no-asterisk', type: Boolean }) noAsterisk = false;

	@property({ attribute: 'no-hash', type: Boolean }) noHash = false;

	@property({ attribute: 'no-display', type: Boolean }) noDisplay = false;

	@property({ type: String }) actionText = 'Enter';

	@property({ type: String }) cancelText = 'Cancel';

	@property({ type: String }) digits = '';

	@property({ type: Boolean }) actionStarted = false;

	__addDigit(digit: string) {
		this.digits += digit;
		const digitAdded = new CustomEvent('digit-added', {
			detail: { digit },
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(digitAdded);
	}

	__sendDigits() {
		const digitsSent = new CustomEvent('digits-sent', {
			detail: { digits: this.digits },
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(digitsSent);
	}

	createAction() {
		this.actionStarted = true;
	}

	__endAction() {
		const actionEnded = new CustomEvent('action-ended', {
			detail: {},
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(actionEnded);
		this.digits = '';
		this.actionStarted = false;
	}

	render() {
		return html`
			<div id="container">
				${this.noDisplay
					? ''
					: html`<vwc-textfield
							id="digits-display"
							outlined
							label="digits display"
							.value=${this.digits}
					  ></vwc-textfield>`}
				<div class="button-row">
					<vwc-button
						id="1-digit"
						unelevated
						@click=${() => this.__addDigit('1')}
						>1</vwc-button
					>
					<vwc-button
						id="2-digit"
						unelevated
						@click=${() => this.__addDigit('2')}
						>2</vwc-button
					>
					<vwc-button
						id="3-digit"
						unelevated
						@click=${() => this.__addDigit('3')}
						>3</vwc-button
					>
				</div>
				<div class="button-row">
					<vwc-button
						id="4-digit"
						unelevated
						@click=${() => this.__addDigit('4')}
						>4</vwc-button
					>
					<vwc-button
						id="5-digit"
						unelevated
						@click=${() => this.__addDigit('5')}
						>5</vwc-button
					>
					<vwc-button
						id="6-digit"
						unelevated
						@click=${() => this.__addDigit('6')}
						>6</vwc-button
					>
				</div>
				<div class="button-row">
					<vwc-button
						id="7-digit"
						unelevated
						@click=${() => this.__addDigit('7')}
						>7</vwc-button
					>
					<vwc-button
						id="8-digit"
						unelevated
						@click=${() => this.__addDigit('8')}
						>8</vwc-button
					>
					<vwc-button
						id="9-digit"
						unelevated
						@click=${() => this.__addDigit('9')}
						>9</vwc-button
					>
				</div>
				<div class="button-row">
					${this.noAsterisk
						? ''
						: html`<vwc-button
								id="asterisk-digit"
								unelevated
								@click=${() => this.__addDigit('*')}
								>*</vwc-button
						  >`}
					<vwc-button
						id="0-digit"
						unelevated
						@click=${() => this.__addDigit('0')}
						>0</vwc-button
					>
					${this.noHash
						? ''
						: html`<vwc-button
								id="hash-digit"
								unelevated
								@click=${() => this.__addDigit('#')}
								>#</vwc-button
						  >`}
				</div>
				<div class="button-row">
					${this.actionStarted
						? html`<vwc-button
								id="cancel-button"
								unelevated
								fullwidth
								@click=${this.__endAction}
								>${this.cancelText}</vwc-button
						  >`
						: html`<vwc-button
								id="action-button"
								unelevated
								fullwidth
								@click=${this.__sendDigits}
								>${this.actionText}</vwc-button
						  >`}
				</div>
			</div>
		`;
	}
}
