import { html } from 'lit';

export default {
	title: 'Components/Components List',
};

export const ComponentsList = () => html`
	<link rel="stylesheet" href="assets/css/md-stories.css">
	<h1 id="components">Components</h1>
	<h3>Browse all components</h3>
	<p>
		<img src="assets/images/components.svg">
	</p>
	<iframe class="airtable-embed" src="https://airtable.com/embed/shrTONpRzbYXwuvgh?backgroundColor=grayLight&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
`;
ComponentsList.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
