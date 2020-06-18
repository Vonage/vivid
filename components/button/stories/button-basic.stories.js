import '@vonage/vwc-button/vwc-button.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Button',
	component: 'vwc-button',
	decorators: [withA11y]
}

export const basic = () => html`
	<style>
		.container {
			display: inline-block;
			padding: 24px;
		}

		.outstanding {
			background-color: #E5E5E5;
		}

		.inverted {
			background-color: #131414;
		}
	</style>

	<h3>Standard</h3>
	<div class="container">
		<vwc-button>Basic</vwc-button>
		<vwc-button icon="code">With icon</vwc-button>
		<vwc-button disabled icon="code">Disabled</vwc-button>
	</div>

	<h3>Outlined</h3>
	<div class="container">
		<vwc-button outlined>Basic</vwc-button>
		<vwc-button outlined icon="code">With icon</vwc-button>
		<vwc-button outlined disabled icon="code">Disabled</vwc-button>
	</div>

	<h3>Unelevated</h3>
	<div class="container">
		<vwc-button unelevated>Basic</vwc-button>
		<vwc-button unelevated icon="code">With icon</vwc-button>
		<vwc-button unelevated disabled icon="code">Disabled</vwc-button>
	</div>
`;