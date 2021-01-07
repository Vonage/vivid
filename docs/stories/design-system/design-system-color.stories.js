import { html } from 'lit-element';

export default {
	title: 'Design System/Color',
};

export const Color = () => html`
	<link rel="stylesheet" href="assets/css/md-stories.css">
	<h1 id="components">Color</h1>
	<h3>From color palettes to schemes</h3>
	<h6>Vivid colors are designed to be clear and accessible with consistent contrast ratios. They come in different color schemes. Each scheme is constituted of grays, connotation colors and brand colors.</h6>
	<p>
		<img src="assets/images/color.svg">
	</p>
	<h3>Color schemes</h3>
	<p>
		Vivid offers 2 color schemes: light theme and dark theme. Each product can support both
		color themes, allowing users to switch between them. The choice of which color theme to
		support should be based on content, platform and user experience.
	</p>
`;
Color.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
