import { html } from 'lit-element';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, number } from "@storybook/addon-knobs";

export default {
	title: 'Core/Typography',
	decorators: [withA11y],
	decorators: [withKnobs]
}

export const basic = () => {

	return html`

	`
};