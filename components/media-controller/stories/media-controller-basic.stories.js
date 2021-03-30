import { html } from 'lit-element';
import '@vonage/vwc-media-controller';

export default {
	title: 'Components/Composite/Media Controller',
	component: 'vwc-media-controller',
	parameters: {
		controls: {
			hideNoControlsWarning: true
		},
	},
	argTypes: {
		ripple: {
			table: {
				disable: true
			}
		},
		setPosition: {
			description: "Sets the scrubber's position, as percentage (in the range of zero to one)",
			table: {
				type: { summary: 'number' }
			}
		},
		setPlayState: {
			description: "Sets the controller's playback position. \"true\" for playing and \"false\" for stopped.",
			table: {
				type: { summary: 'boolean' }
			}
		}
	}
};

export const basic = () => html`
	<style>
	 	vwc-media-controller {
			width: 100%;
			margin: 0.2rem 0;
			padding: 0 0.6rem;
			box-sizing: border-box;
		}

		section#player {
			background-color: #fff;
			box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
			margin: auto;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			width: 426px;
			height: 240px;
			justify-content: space-between;
		}

		div#screen {
			font-family: courier, courier new, serif;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1 0;
			width: 100%;
			height: 100%;
			background-color: black;
			white-space: pre;
			color: #4AF626;
		}

		p > code {
			font-size: 0.8rem;
			display: block;
			background-color: #333 !important;
			color: #4AF626 !important;
			margin: 0.1rem 0;
			padding: 0 0.5rem !important;
		}
	</style>
	<section id="player">
		<div id="screen"></div>
		<vwc-media-controller></vwc-media-controller>
	</section>
	<p>
		<code id="scrubberStatus"></code>
		<code id="playbackStatus"></code>
	</p>
	<script>

		const [
		  playbackStatusEl,
			scrubberStatusEl,
			vwcMediaControllerEl,
			screenEl
		] = [
			'code#playbackStatus',
			'code#scrubberStatus',
			'vwc-media-controller',
			'div#screen'
		].map((tagName)=> document.querySelector(tagName));

		let
			scrubberPosition = 0,
			isPlaying = false;

		const updateStatusView = ()=> {
			screenEl.textContent = [
			  ["Scrubber is at", (scrubberPosition * 100).toFixed(2) + "%"].join(' '),
				["Playback state is", isPlaying ? "PLAYING" : "STOPPED"].join(': ')
			].join('\\n');
			vwcMediaControllerEl.setPosition(scrubberPosition);
			vwcMediaControllerEl.setPlayState(isPlaying);
		};

		vwcMediaControllerEl.addEventListener('userScrubRequest', ({ detail })=> {
			scrubberPosition = detail;
			updateStatusView();
		});

		vwcMediaControllerEl.addEventListener('userPlayPauseRequest', ()=> {
			isPlaying = !isPlaying;
		  updateStatusView();
		});

		updateStatusView();
	</script>
`;
