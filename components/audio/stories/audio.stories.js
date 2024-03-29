import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import '@vonage/vwc-audio';

export default {
	title: 'Components/Audio Player',
	component: 'vwc-audio'
};

const StoryShell = (
	defaultArgs = {},
	innerStory = args => html`<vwc-audio ...=${spread(args)}></vwc-audio>`
) => {
	return Object.assign(
		args => html`
			<style>
				:root {
					text-align: center;
				}
				.component-container {
					margin: auto;
					display: inline-block;
					padding: 1rem;
					border: solid 1px #eee;
					box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
				}
			</style>

			<div class="component-container">
				${innerStory(args)}
			</div>`, { args: { src: "https://download.samplelib.com/mp3/sample-6s.mp3", ...defaultArgs } }
	);
};

export const Basic = StoryShell();

export const NoSeek = StoryShell({ noseek: true });

export const TimeStamp = StoryShell({ timestamp: true });

export const TimeStampNoSeek = StoryShell({ timestamp: true, noseek: true });

export const Disabled = StoryShell({ disabled: true });
