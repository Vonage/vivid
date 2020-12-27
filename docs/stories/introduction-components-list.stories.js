import { html } from 'lit-element';

export default {
	title: 'Introduction/Components List',
};

export const ComponentsList = () => html`
	<iframe class="airtable-embed" src="https://airtable.com/embed/shrTONpRzbYXwuvgh?backgroundColor=grayLight&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>
`;
ComponentsList.parameters = {
	options: {
		showPanel: false
	}
}