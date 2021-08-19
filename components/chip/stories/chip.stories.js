import '@vonage/vwc-chip/vwc-chip.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Chip (NEW)',
	component: 'vwc-chip',
	argTypes
};

const Template = args => html`<vwc-chip ...=${spread(args)}></vwc-chip>`;
const createStory = args => Object.assign(Template, { args });

export const Basic = createStory({
	text: "Basic"
});

export const Enlarged = createStory({
	text: "Enlarged",
	enlarged: true
});

export const Dense = createStory({
	text: "Dense",
	dense: true
});

export const Outlined = createStory({
	text: "Outlined",
	layout: "outlined"
});

export const Selected = createStory({
	text: "selected",
	filter: true,
	selected: true
});

export const WithTrailingIcon = createStory({
	text: "With Trailing Icon",
	iconTrailing: "close-small-line"
});
