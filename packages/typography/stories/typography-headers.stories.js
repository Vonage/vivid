import vvdContext from '@vonage/vvd-context';
import '@vonage/vwc-note';
import { html } from 'lit-element';

export default {
	title: 'Core/Typography',
};

export const Typography = () => html`
	<div>
		<h1>Headline 1</h1>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h1</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h2>Headline 2</h2>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h2</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h3>Title 1</h3>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h3</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h4>Title 2</h4>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h4</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h5>Subtitle 1</h5>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h5</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h6>Subtitle 2</h6>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h6</code> HTML element with conjunction with context.
		</vwc-note>
	</div>
`;

vvdContext.mount();
