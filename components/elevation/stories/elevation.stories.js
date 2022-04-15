import '@vonage/vwc-elevation/vwc-elevation.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Elevation',
	component: 'vwc-elevation',
	argTypes
};

const dpLevels = [0, 2, 4, 8, 12, 16, 24];
const styles = () => html`
	<style>
		vwc-elevation {
			display: inline-block;
		}

		.wrapper {
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.card {
			height: 20px;
			padding: 20px;
			text-align: center;
			width: 500px;
			border-radius: 6px;
		}
	</style>
`;
const elevations = () => dpLevels.map(dpLevel => html`
		<vwc-elevation dp="${dpLevel}"><div class="card">DP ${dpLevel}</div></vwc-elevation>
	`);

const AllTemplate = args => html`
	<div class="wrapper">
		${styles()}
		${elevations()}
	</div>
`;

const Template = args => html`
	${styles()}
	<vwc-elevation ...=${spread(args)}><div class="card">elevation</div></vwc-elevation>
`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic' };

export const AllElevations = AllTemplate.bind({});
AllTemplate.args = { label: 'All' };

const HoverEffectExampleTemplate = args => html`
	${styles()}
	<vwc-elevation ...=${spread(args)}
								 @mouseenter="${onMouseEnter}"
								 @mouseleave="${onMouseLeave}">
		<div class="card" style="width: 120px;">Hover me!</div>
	</vwc-elevation>
`;

export const HoverEffectExample = HoverEffectExampleTemplate.bind({});
HoverEffectExample.args = { label: 'Border Radius', dp: 24 };

function onMouseEnter(e) {
	e.target.setAttribute('dp', '24');
	e.target.querySelector('div').innerText = 'Get OFF of me!';
}

function onMouseLeave(e) {
	e.target.setAttribute('dp', '2');
	e.target.querySelector('div').innerText = 'Hover me!';
}
