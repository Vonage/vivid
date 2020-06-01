import { html } from 'lit-html';
import Element from '../modules/element.js';
import '@vonage/vwc-slider';

export default class Home extends Element {
	async getHtml() {
		return html`
			<style>
				.preview {
					--font-size: 24px;
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
				.preview > .part.text {
					text-align: center;
					font-size: var(--font-size);
					overflow: hidden;
					white-space: nowrap;
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
				<vwc-slider class="part selector" min="16" max="40" value="24" step="1" pin></vwc-slider>
			</div>
    `;
	}

	connectedCallback() {
		super.connectedCallback();
		setTimeout(() => {
			this.querySelector('.part.selector').addEventListener('input', event => {
				this.querySelector('.preview').style.setProperty('--font-size', `${event.target.value}px`);
			});
		}, 0);
	}
}
