import vvdContext from '@vonage/vvd-context';
import '@vonage/vwc-note';
import { html } from 'lit-element';

export default {
	title: 'Core/Typography',
};

export const basic = () => html`
	<div>
		<h1>Headline</h1>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h1</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h2>Title</h2>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h2</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h3>Subtitle 1</h3>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h3</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h4>Subtitle 2</h4>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h4</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h5>Subtitle 3</h5>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h5</code> HTML element with conjunction with context.
		</vwc-note>
	</div>

	<div>
		<h6>Body 2</h6>
		<vwc-note connotation="info" icon="info">
			This is achievable by utilizing <code>h6</code> HTML element with conjunction with context.
		</vwc-note>
	</div>
`;

vvdContext.install();
