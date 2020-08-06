import '@vonage/vwc-icon';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';
import { aiIcons } from './icon-ai.stories.js';

export default {
	title: 'Atoms|Icon',
	component: 'vwc-icon',
	decorators: [withA11y]
};

const style = html`
	<style>
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 1rem;
    }

    .container > figure {
    	box-shadow: 1px 1px 3px 1px #ddd;
    	margin: 0.5rem;
    	width: 5rem;
    	height: 5rem;
    	padding: 1rem 0 0 0;
    	text-align: center;
    	box-sizing: border-box;
    	position: relative;
			background-color: #eee;
			border-radius: 4px;
			overflow: hidden;
			fill: #eee;
    }

    .container > figure:nth-child(5n+1)  { background-color: #FA97AA; }
    .container > figure:nth-child(5n+2)  { background-color: #F876C2; }
    .container > figure:nth-child(5n+3)  { background-color: #A93CF8; }
    .container > figure:nth-child(5n+4)  { background-color: #8D9BFA; }
    .container > figure:nth-child(5n+5)  { background-color: #F75CDA; }

		.container > figure > vwc-icon {
			box-shadow: 3px 3px 3px rgba(0,0,0,0);
		}

		.container > figure > figcaption {
			font-size: 0.2rem;
			position: absolute;
			bottom: 0;
			left: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 100%;
			box-sizing: border-box;
			font-weight: bold;
			color: #eee;
			background-color: #00000025;
			padding: 0.2rem;
		}
	</style>
`;

export const ai = aiIcons(style, { name: 'AI', parameters: { docs: { disable: true } } });

export const alert = () => html`${style}<div class="container"><figure><vwc-icon type="info"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="info-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="help"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="help-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="alert"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="alert-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="block"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="block-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="notification"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="notification-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="notification-off"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="notification-off-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="error-star"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="error"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
alert.story = { name: 'Alert', parameters: { docs: { disable: true } } };
export const arrows = () => html`${style}<div class="container"><figure><vwc-icon type="arrow-thin-right"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-right-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-left"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-left-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-up"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-up-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-down"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-thin-down-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-right"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-right-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-left"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-left-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-inbound"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-inbound-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-outbound"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="arrow-outbound-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="maximise"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="maximise-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="minimize"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="minimize-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="merge"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="merge-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="minimize-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="minimize-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="expand"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="expand-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="merge-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="merge-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="refresh"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="refresh-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="toggle"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="toggle-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="reload"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="reload-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="collapse"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="collapse-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="expand"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="expand-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="open"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="open-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="transfer"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="transfer-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="reply"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="reply-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="share-1"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="share-1-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="share-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="share-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="exit"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="exit-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="exit"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="exit-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="enter"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="enter-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="increase"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="increase-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="leave"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="leave-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="enlarge-screen"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="enlarge-screen-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="enlarge-screen-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="enlarge-screen-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bounce"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bounce-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
arrows.story = { name: 'Arrows', parameters: { docs: { disable: true } } };
export const cancel = () => html`${style}<div class="container"><figure><vwc-icon type="cross"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cross-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cross-circle"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cross-circle-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="backspace"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="backspace-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
cancel.story = { name: 'Cancel', parameters: { docs: { disable: true } } };
export const charts = () => html`${style}<div class="container"><figure><vwc-icon type="chart"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="chart-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="report"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="report-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pie-chart"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pie-chart-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
charts.story = { name: 'Charts', parameters: { docs: { disable: true } } };
export const check = () => html`${style}<div class="container"><figure><vwc-icon type="check-circle"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="check-circle-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="checkbox"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="checkbox-checked-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="checkbox-unchecked"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="checkbox-unchecked-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="check"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="check-bold"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="check-double"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="check-double-bold"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
check.story = { name: 'Check', parameters: { docs: { disable: true } } };
export const chevrons = () => html`${style}<div class="container"><figure><vwc-icon type="down"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="down-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="up"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="up-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="left"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="left-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="right"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="right-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sort"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sort-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="circle-down"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="circle-down-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
chevrons.story = { name: 'Chevrons', parameters: { docs: { disable: true } } };
export const commerce_shapes = () => html`${style}<div class="container"><figure><vwc-icon type="store"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="store-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="credit-card"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="wallet"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="wallet-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cart"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cart-glyph"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cart-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cart-full-glyph"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="packet"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="packet-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="packet-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="packet-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calculator"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calculator-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="refresh-dollar"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="dollar-star"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
commerce_shapes.story = { name: 'Commerce shapes', parameters: { docs: { disable: true } } };
export const connectivity = () => html`${style}<div class="container"><figure><vwc-icon type="wifi"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="wifi-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="salesforce"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="salesforce-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cloud"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cloud-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="snooze"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="snooze-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cloud-upload"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cloud-upload-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="quit"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="quit-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="broadcast"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="broadcast-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
connectivity.story = { name: 'Connectivity', parameters: { docs: { disable: true } } };
export const date_time = () => html`${style}<div class="container"><figure><vwc-icon type="calendar"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-3"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-3-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-add"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calendar-add-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="clock"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="clock-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="alarm"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="alarm-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="history"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="history-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sand-clock"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sand-clock-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stopwatch"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stopwatch-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
date_time.story = { name: 'Date & Time', parameters: { docs: { disable: true } } };
export const del = () => html`${style}<div class="container"><figure><vwc-icon type="bin"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bin-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="remove"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="remove-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
del.story = { name: 'Delete', parameters: { docs: { disable: true } } };
export const devices = () => html`${style}<div class="container"><figure><vwc-icon type="devices"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="devices-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="headset"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="headset-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="laptop"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="laptop-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-devices"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-devices-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="print"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="print-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-inbound"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-inbound-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-outbound"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-outbound-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-pending"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-pending-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-failed"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-failed-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-add"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-add-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-scheduled"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="fax-scheduled-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="voicemail"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="voicemail-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="virtual-voicemail"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="virtual-voicemail-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="voicemail-transcript"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="voicemail-transcript-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="light-bulb"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="light-bulb-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
devices.story = { name: 'Devices', parameters: { docs: { disable: true } } };
export const elements = () => html`${style}<div class="container"><figure><vwc-icon type="duplicate"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="duplicate-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="more-v"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="more-v-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="more"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="more-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="my-apps"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="my-apps-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="drag"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="drag-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
elements.story = { name: 'Elements', parameters: { docs: { disable: true } } };
export const emoji = () => html`${style}<div class="container"><figure><vwc-icon type="emoji"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="emoji-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="unhappy"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="unhappy-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="happy"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="happy-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="surprised"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="surprised-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="smile"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="smile-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="puzzled"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="puzzled-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
emoji.story = { name: 'Emoji', parameters: { docs: { disable: true } } };
export const file = () => html`${style}<div class="container"><figure><vwc-icon type="file"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="small-file"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-3"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-3-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-pdf"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-pdf-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-ppt"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-ppt-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-doc"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-doc-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-xls"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-xls-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-zip"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-zip-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-video"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-video-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-dollar"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-dollar-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-plus"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-plus-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-edit"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-edit-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-gear"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-gear-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-search"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-search-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-add"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-add-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="files"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="files-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="copy"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="copy-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="copy-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="copy-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="upload"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="upload-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="download"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="download-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="image"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="image-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="gallery"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="small-image"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="small-video"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="small-video-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stack"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stack-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="notes"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="notes-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="document"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="document-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-paragraph"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-paragraph-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-csv-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
file.story = { name: 'File', parameters: { docs: { disable: true } } };
export const media = () => html`${style}<div class="container"><figure><vwc-icon type="audio-mute-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-mid"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-mute"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-max"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-mid-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-min-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-off-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-off"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-off-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-off-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-max-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="audio-min"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="media-fullscreen"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="media-exit-fullscreen"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="microphone"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="microphone-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="microphone-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="microphone-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="microphone-mute"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="microphone-mute-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="subtitles-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-decrease"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-decrease-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-increase"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-increase-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-off"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-off-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-off-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-off-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-on-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="volume-on-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hearing"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hearing-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="shout"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="shout-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="whisper"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="whisper-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-audio"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="file-audio-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="note"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="note-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stream"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stream-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-active"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-active-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-off"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-off-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-conference"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="video-conference-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="screen-share"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="screen-share-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="camera"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="camera-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="camera-switch"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="camera-switch-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="play"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="play-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="play-3"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="play-3-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pause"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pause-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rec"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rec-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stop"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="stop-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
media.story = { name: 'Media', parameters: { docs: { disable: true } } };
export const messaging = () => html`${style}<div class="container"><figure><vwc-icon type="compose"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="compose-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="chat"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="chat-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="chat-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="chat-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="message"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="message-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sms"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sms-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="inbox"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="inbox-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="inbox-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="inbox-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="inbox-3"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="inbox-3-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="envelope"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="envelope-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mailbox"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mailbox-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="voicemail-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="voicemail-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="message-delivered"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="message-read"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="attachment"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="attachment-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
messaging.story = { name: 'Messaging', parameters: { docs: { disable: true } } };
export const phone = () => html`${style}<div class="container"><figure><vwc-icon type="call"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calls-disabled"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="calls-disabled-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-down"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-down-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-pause"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-pause-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-pending"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-pending-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-block"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-block-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-outbound"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-outbound-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-inbound"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-inbound-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-message"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-message-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-number"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-number-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-plus"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-plus-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-forward"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-forward-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-park"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-park-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-transfer"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-transfer-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-check"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-check-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-bounce"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-bounce-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-garland"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="phone-garland-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="keypad"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="keypad-line"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="keypad-line-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="keypad-solid"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-3"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="telephone-3-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="device-cloud"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-arrow-right"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-arrow-right-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-devices"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mobile-devices-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="click-to-call"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="click-to-call-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-flip"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="call-flip-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
phone.story = { name: 'Phone', parameters: { docs: { disable: true } } };
export const social = () => html`${style}<div class="container"><figure><vwc-icon type="thumbs-up"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="thumbs-up-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="thumbs-down"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="thumbs-down-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rocket"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rocket-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rocket-off"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rocket-off-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="magic-wand"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="magic-wand-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="world"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="world-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="heart"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="heart-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="star"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="star-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="share-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="share-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="link"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="link-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hash"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="vonage-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="vonage"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="rss"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="facebook"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="note"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="world-hand"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
social.story = { name: 'Social', parameters: { docs: { disable: true } } };
export const sort = () => html`${style}<div class="container"><figure><vwc-icon type="filter"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="filter-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="search"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="search-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="plus"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="plus-bold"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="minus"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="minus-bold"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="list-numbers"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="list"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="list-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="more-detailed-list"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="more-detailed-list-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="less-detailed-list"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="less-detailed-list-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="list-filter"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="reorder"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="reorder-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag-add"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag-add-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag-detach"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag-detach-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tag-search"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bookmark"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bookmark-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="separator"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="separator-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="preferences"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="preferences-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="table-1"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="table-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="add-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="add-outline"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
sort.story = { name: 'Sort', parameters: { docs: { disable: true } } };
export const tools = () => html`${style}<div class="container"><figure><vwc-icon type="save"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="save-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="edit"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="edit-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="crop-fill"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="crop-fill-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="palette"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="palette-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pentool"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pentool-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="design-tools"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="design-tools-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cursor"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="cursor-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="type"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="type-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tool"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tool-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tool-circle"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
tools.story = { name: 'Tools', parameters: { docs: { disable: true } } };
export const travel_places = () => html`${style}<div class="container"><figure><vwc-icon type="ambulance"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="ambulance-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="car"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="car-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="home"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="home-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hoteling"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hoteling-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="van"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="van-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pin"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pin-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hospital"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="hospital-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
travel_places.story = { name: 'Travel & Places', parameters: { docs: { disable: true } } };
export const user_avatar = () => html`${style}<div class="container"><figure><vwc-icon type="profile"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="profile-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="home-user"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="home-user-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="add-user"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="add-user-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="add-group"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="add-group-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-3"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-3-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-4"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-4-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-5"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-5-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-6"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-6-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-7"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-7-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-8"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-8-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-9"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="group-9-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="receptionist"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="receptionist-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="receptionist-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="receptionist-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-small"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="id"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="id-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="queue"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="queue-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="meeting"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="meeting-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-sync"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-sync-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-sync-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-sync-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="card"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="card-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="address-book"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="address-book-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-admin"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-admin-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-lock"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="user-lock-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
user_avatar.story = { name: 'User/Avatar', parameters: { docs: { disable: true } } };
export const utilities_objects = () => html`${style}<div class="container"><figure><vwc-icon type="infinity"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="infinity-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="plug"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="plug-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="world"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="world-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="key"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="key-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="atoms"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="atoms-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mind-map"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mind-map-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="books"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="books-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="puzzle"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="puzzle-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="lock"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="lock-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="unlock"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="unlock-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="flash"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="flash-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="flash-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="flash-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="clipboard-add"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="clipboard-add-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="shield"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="shield-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="gear"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="gear-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tooltip"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tooltip-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="circle-nested"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="tabs"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="flow"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="flow-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="code"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="code-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sticker"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sticker-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="switch"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="switch-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="megaphone"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="megaphone-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="link"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="link-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="umbrella"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="umbrella-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pin-2"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="pin-2-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="condition"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="condition-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="quote"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="quote-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
utilities_objects.story = { name: 'Utilities & Objects', parameters: { docs: { disable: true } } };
export const view = () => html`${style}<div class="container"><figure><vwc-icon type="density-high"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="density-medium"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="eye"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="eye-negative"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="eye-hide"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="eye-hide-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="menu"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="menu-full"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
view.story = { name: 'View', parameters: { docs: { disable: true } } };
export const windows = () => html`${style}<div class="container"><figure><vwc-icon type="code-snippet"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="code-snippet-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mockup"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="mockup-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="modal"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="modal-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bottom-tabs"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="bottom-tabs-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="app"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="app-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="app-plus"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="app-plus-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sidebar"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="sidebar-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="grid-two"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="table-1"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="table-full"></vwc-icon><figcaption>ai-full</figcaption></figure>
<figure><vwc-icon type="table-2"></vwc-icon><figcaption>ai-full</figcaption></figure></div>`;
windows.story = { name: 'Windows', parameters: { docs: { disable: true } } };