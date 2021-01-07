import { html } from 'lit-element';

export default {
	title: 'Design System/Design Tokens',
};

export const DesignTokens = () => html`
	<link rel="stylesheet" href="assets/css/md-stories.css">
	<h1 id="components">Design tokens</h1>
	<h3>Single source of truth</h3>
	<h6>Design tokens are design decisions, represented as data, that ensure systematically unified and cohesive product experiences.</h6>
	<p>
		<img src="assets/images/design-tokens.svg">
	</p>
	<p>
		Design tokens are all the values needed to construct and maintain
		a design system - color, typography, spacing, object styles, sizing etc - represented as data.
	</p>
	<p>
		These can represent anything defined by design: font size in pixels, color as an RGB value,
		opacity as a number etc. They are used in place of hard-coded values in order to ensure flexibility
		and unity across all product experiences.
	</p>
	<p>
		Design tokens are directly integrated into our component libraries and UI kits.
		They cover the various options of platform scales, color themes, component states and more.
	</p>
	<p>
		Using Design tokens allows us to manage and maintain our design system as Vonage's design <b>Single source of truth</b>.
	</p>
`;
DesignTokens.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
