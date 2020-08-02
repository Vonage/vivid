import '@vonage/vwc-icon';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Icon',
	component: 'vwc-icon',
	decorators: [withA11y]
};

export const basic = () => html`
	<style>
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .container > figure {
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
  <div class="container">
		<figure><vwc-icon type="puzzle-full"></vwc-icon><figcaption>puzzle-full</figcaption></figure>
		<figure><vwc-icon type="circle-down-full"></vwc-icon><figcaption>circle-down-full</figcaption></figure>
		<figure><vwc-icon type="click-to-call"></vwc-icon><figcaption>click-to-call</figcaption></figure>
		<figure><vwc-icon type="file-edit-full"></vwc-icon><figcaption>file-edit-full</figcaption></figure>
		<figure><vwc-icon type="group-2-full"></vwc-icon><figcaption>group-2-full</figcaption></figure>
		<figure><vwc-icon type="shield-full"></vwc-icon><figcaption>shield-full</figcaption></figure>
		<figure><vwc-icon type="bottom-tabs"></vwc-icon><figcaption>bottom-tabs</figcaption></figure>
		<figure><vwc-icon type="audio-max-full"></vwc-icon><figcaption>audio-max-full</figcaption></figure>
		<figure><vwc-icon type="call-outbound"></vwc-icon><figcaption>call-outbound</figcaption></figure>
		<figure><vwc-icon type="file-3"></vwc-icon><figcaption>file-3</figcaption></figure>
		<figure><vwc-icon type="minimize"></vwc-icon><figcaption>minimize</figcaption></figure>
		<figure><vwc-icon type="group-7-full"></vwc-icon><figcaption>group-7-full</figcaption></figure>
		<figure><vwc-icon type="file-voicemail"></vwc-icon><figcaption>file-voicemail</figcaption></figure>
		<figure><vwc-icon type="arrow-inbound-full"></vwc-icon><figcaption>arrow-inbound-full</figcaption></figure>
		<figure><vwc-icon type="flash"></vwc-icon><figcaption>flash</figcaption></figure>
		<figure><vwc-icon type="filter-full"></vwc-icon><figcaption>filter-full</figcaption></figure>
		<figure><vwc-icon type="enlarge-screen-2"></vwc-icon><figcaption>enlarge-screen-2</figcaption></figure>
		<figure><vwc-icon type="less-detailed-list-full"></vwc-icon><figcaption>less-detailed-list-full</figcaption></figure>
		<figure><vwc-icon type="world"></vwc-icon><figcaption>world</figcaption></figure>
		<figure><vwc-icon type="inbox-2-full"></vwc-icon><figcaption>inbox-2-full</figcaption></figure>
		<figure><vwc-icon type="file-doc"></vwc-icon><figcaption>file-doc</figcaption></figure>
		<figure><vwc-icon type="flash-2-full"></vwc-icon><figcaption>flash-2-full</figcaption></figure>
		<figure><vwc-icon type="separator"></vwc-icon><figcaption>separator</figcaption></figure>
		<figure><vwc-icon type="volume-off-full"></vwc-icon><figcaption>volume-off-full</figcaption></figure>
		<figure><vwc-icon type="user-sync-full"></vwc-icon><figcaption>user-sync-full</figcaption></figure>
		<figure><vwc-icon type="files"></vwc-icon><figcaption>files</figcaption></figure>
		<figure><vwc-icon type="brain"></vwc-icon><figcaption>brain</figcaption></figure>
		<figure><vwc-icon type="stop"></vwc-icon><figcaption>stop</figcaption></figure>
		<figure><vwc-icon type="bar-chart-2"></vwc-icon><figcaption>bar-chart-2</figcaption></figure>
		<figure><vwc-icon type="file-ppt"></vwc-icon><figcaption>file-ppt</figcaption></figure>
		<figure><vwc-icon type="pause-2"></vwc-icon><figcaption>pause-2</figcaption></figure>
		<figure><vwc-icon type="fax-scheduled"></vwc-icon><figcaption>fax-scheduled</figcaption></figure>
		<figure><vwc-icon type="group-9"></vwc-icon><figcaption>group-9</figcaption></figure>
		<figure><vwc-icon type="arrow-right"></vwc-icon><figcaption>arrow-right</figcaption></figure>
		<figure><vwc-icon type="switch"></vwc-icon><figcaption>switch</figcaption></figure>
		<figure><vwc-icon type="collapse"></vwc-icon><figcaption>collapse</figcaption></figure>
		<figure><vwc-icon type="home-user"></vwc-icon><figcaption>home-user</figcaption></figure>
		<figure><vwc-icon type="screen-share-full"></vwc-icon><figcaption>screen-share-full</figcaption></figure>
		<figure><vwc-icon type="play"></vwc-icon><figcaption>play</figcaption></figure>
		<figure><vwc-icon type="note"></vwc-icon><figcaption>note</figcaption></figure>
		<figure><vwc-icon type="design-tools"></vwc-icon><figcaption>design-tools</figcaption></figure>
		<figure><vwc-icon type="chevron-down"></vwc-icon><figcaption>chevron-down</figcaption></figure>
		<figure><vwc-icon type="hoteling"></vwc-icon><figcaption>hoteling</figcaption></figure>
		<figure><vwc-icon type="mobile-full"></vwc-icon><figcaption>mobile-full</figcaption></figure>
		<figure><vwc-icon type="user-full"></vwc-icon><figcaption>user-full</figcaption></figure>
		<figure><vwc-icon type="phone"></vwc-icon><figcaption>phone</figcaption></figure>
		<figure><vwc-icon type="enter"></vwc-icon><figcaption>enter</figcaption></figure>
		<figure><vwc-icon type="my-apps"></vwc-icon><figcaption>my-apps</figcaption></figure>
		<figure><vwc-icon type="light-bulb"></vwc-icon><figcaption>light-bulb</figcaption></figure>
		<figure><vwc-icon type="call-outbound-full"></vwc-icon><figcaption>call-outbound-full</figcaption></figure>
		<figure><vwc-icon type="open-full"></vwc-icon><figcaption>open-full</figcaption></figure>
		<figure><vwc-icon type="van-full"></vwc-icon><figcaption>van-full</figcaption></figure>
		<figure><vwc-icon type="leave-full"></vwc-icon><figcaption>leave-full</figcaption></figure>
		<figure><vwc-icon type="video-conference-full"></vwc-icon><figcaption>video-conference-full</figcaption></figure>
		<figure><vwc-icon type="arrow-thin-right-full"></vwc-icon><figcaption>arrow-thin-right-full</figcaption></figure>
		<figure><vwc-icon type="notification-full"></vwc-icon><figcaption>notification-full</figcaption></figure>
		<figure><vwc-icon type="list-numbers"></vwc-icon><figcaption>list-numbers</figcaption></figure>
		<figure><vwc-icon type="table-1"></vwc-icon><figcaption>table-1</figcaption></figure>
		<figure><vwc-icon type="broadcast-full"></vwc-icon><figcaption>broadcast-full</figcaption></figure>
	</div>
`;