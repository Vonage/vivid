import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-slider';

export default class Home extends Element {
	async getHtml() {
		return html`
			<style>
				.preview {
					--font-size: 24px;
					--font-weight: 400;
				}

				.preview {
					width: 100%;
					max-width: 800px;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					margin: 24px 0;
				}

				.preview > .part {
					flex: 1;
					max-width: 320px;
				}

				.preview .text {
					text-align: center;
					font-size: var(--font-size);
					font-weight: var(--font-weight);
					overflow: hidden;
					white-space: nowrap;
				}

				.preview .resizer {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.preview .selector {
					flex-basis: 240px;
				}
			</style>

			<h3>General</h3>
			<p>
				Vivid provides means to fetch and use the brand selected fonts.
			</p>
			<p>
				We are providing variable fonts by default, falling back to a regular (static) fonts on a non-suporting systems.
			</p>
			<div class="preview">
				<span class="part text">Lorem ipsum...</span>
				<div class="part resizers">
					<div class="resizer">
						<span>size:</span>
						<vwc-slider class="size selector" min="16" max="40" value="24" step="1" pin></vwc-slider>
					</div>
					<div class="resizer">
						<span>weight:</span>
						<vwc-slider class="weight selector" min="100" max="900" value="400" step="100" pin></vwc-slider>
					</div>
				</div>
			</div>

			<h3>Usage example</h3>
			<p>
				Fonts are being fetched and 'installed' by the following API call flow:
			</p>
			<code-sample type="js" copy-clipboard-button>
				<template preserve-content>
					import fonts from 'vvd-fonts.js';


					fonts.init().then(() => {});
				</template>
			</code-sample>

			<p>
				In your CSS part consume the fonts as following:
			</p>
			<code-sample type="css" copy-clipboard-button>
				<template preserve-content>
					body {
						font-family: 'VonageMain';	/* for IE11 only, omit this line if not relevant */
						font-family: var(--vvd-font-family-spezia);
					}
				</template>
			</code-sample>
    `;
	}

	connectedCallback() {
		super.connectedCallback();
		setTimeout(() => {
			this.querySelector('.size.selector').addEventListener('input', event => {
				this.querySelector('.preview').style.setProperty('--font-size', `${event.target.value}px`);
			});
			this.querySelector('.weight.selector').addEventListener('input', event => {
				this.querySelector('.preview').style.setProperty('--font-weight', `${event.target.value}`);
			});
		}, 0);
	}
}
