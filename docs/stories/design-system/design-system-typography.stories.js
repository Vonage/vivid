import { html } from 'lit-element';

export default {
	title: 'Design System/Typography',
};

export const Typography = () => html`
	<link rel="stylesheet" href="assets/css/md-stories.css">
	<h1 id="components">Typography</h1>
	<h3>Vivid type scale</h3>
	<h6>Typography is an important part of a design system that brings consistency accross experiences and platforms. Good typography rules help to present content clearly and efficiently.</h6>
	<p>
		<img src="assets/images/typography.svg">
	</p>
	<h3>Typeface</h3>
	<p>
		Vivid typography is built using Spezia font family, namely the regular one, wide and the monospace one.
	</p>
`;
Typography.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
