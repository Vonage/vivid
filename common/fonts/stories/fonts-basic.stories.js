import { html } from 'lit-element';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, number } from "@storybook/addon-knobs";

export default {
	title: 'Services/Fonts',
	decorators: [withA11y],
	decorators: [withKnobs]
}

export const basic = () => {
	const size = number('Size', 24, {
		range: true,
		min: 16,
		max: 36,
		step: 1,
	});
	const weight = number('Weight', 300, {
		range: true,
		min: 100,
		max: 900,
		step: 10,
	});
	return html`
		<style>
			.preview {
				--font-size: ${size}px;
				--font-weight: ${weight};
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
		</div>

		<h3>Usage example</h3>
		<p>
			Fonts are being fetched and 'installed' by the following API call flow:
		</p>
		<pre>
			<code class="javascript">
import fonts from 'vvd-fonts.js';

fonts.init().then(() => {});
			</code>
		</pre>

		<p>
			In your CSS part consume the fonts as following:
			<pre>
				<code class="css">
body {
	font-family: var(--vvd-font-family-spezia);
}
				</code>
			</pre>
		</p>
	`
};