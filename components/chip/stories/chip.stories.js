import '@vonage/vwc-chip/vwc-chip.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Chip (NEW)',
	component: 'vwc-chip',
	argTypes
};

const createStory = args => Object.assign(args => html`<vwc-chip ...=${spread(args)}></vwc-chip>`, { args });

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

export const WithIcon = createStory({
	text: "With Icon",
	icon: "check-circle-solid"
});

export const WithTrailingIcon = createStory({
	text: "With Trailing Icon",
	iconTrailing: "close-small-line"
});
