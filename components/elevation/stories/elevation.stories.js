import '@vonage/vwc-elevation/vwc-elevation.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Elevation',
	component: 'vwc-elevation',
	argTypes
};

const dpLevels = [2, 4, 8, 12, 16, 24];
const styles = () => html`
	<style>
		.card {
			height: 20px;
			width: 90px;
			padding: 20px;
			text-align: center;
		}

		vwc-elevation {
			display: inline-block;
		}
	</style>
`;
const elevations = () => dpLevels.map(dpLevel => html`
		<vwc-elevation dp="${dpLevel}"><div class="card">DP ${dpLevel}</div></vwc-elevation>
	`);

const BasicTemplate = args => html`
	${styles()}
	${elevations()}
`;

const Template = args => html`
	${styles()}
	<vwc-elevation ...=${spread(args)}><div class="card"></div></vwc-elevation>
`;
export const Basic = BasicTemplate.bind({});
Basic.args = { label: 'Basic' };

export const BackgroundColor = Template.bind({});
BackgroundColor.args = { label: 'Background Color', style: '--vvd-elevation-background-color: lightblue', dp: 8 };

export const BorderRadius = Template.bind({});
BorderRadius.args = { label: 'Border Radius', style: '--vvd-elevation-border-radius: 16px', dp: 24 };
