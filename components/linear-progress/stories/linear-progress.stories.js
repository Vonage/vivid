import '@vonage/vwc-linear-progress/vwc-linear-progress.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Linear Progress',
	component: 'vwc-linear-progress',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Default</h3>
	<vwc-linear-progress size="small" progress="0.5" buffer="0.75"></vwc-linear-progress>

	<h3>Indeterminate</h3>
	<vwc-linear-progress size="small" indeterminate></vwc-linear-progress>
`;