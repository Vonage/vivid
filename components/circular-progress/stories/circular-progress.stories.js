import '@vonage/vwc-circular-progress/vwc-circular-progress.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Circular Progress',
	component: 'vwc-circular-progress',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Determinate</h3>
	<vwc-circular-progress progress="0.7"></vwc-circular-progress>

	<h3>Indeterminate</h3>
	<vwc-circular-progress indeterminate></vwc-circular-progress>

	<h3>Density</h3>
	<vwc-circular-progress indeterminate density="4"></vwc-circular-progress>
	<vwc-circular-progress indeterminate density="-4"></vwc-circular-progress>
	<vwc-circular-progress indeterminate density="-7"></vwc-circular-progress>
`;
