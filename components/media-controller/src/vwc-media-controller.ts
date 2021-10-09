import '@vonage/vvd-core';
import '@vonage/vwc-icon/vwc-icon';
import type { VWCScrubBar } from './vwc-scrub-bar.js';
import { style as vwcMediaControllerStyle } from './vwc-media-controller.css.js';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators';

/**
 * Displays controllers for media playback. Includes play/pause button and a scrub bar
 *
 * @element vwc-media-controller
 *
 * @fires userScrubRequest - Fires while the user modifies the scrubber's knob location.
 * @fires userPlayPauseRequest - Fires when the user clicks the play/pause button, the "detail" event field will contain a number between zero and one describing the user's relative selected position.
 * @fires userSkipForwardRequest - Fires when the user requests a skip forward
 * @fires userSkipBackwardsRequest - Fires when the user requests a skip backwards
 */
@customElement('vwc-media-controller')
export class VwcMediaController extends LitElement {
	static override styles = [vwcMediaControllerStyle];

	@query('.scrubber')
	private _scrubber!:VWCScrubBar

	@state()
	private _playState = false;

	override render():TemplateResult {
		return html`
			<main class="main">
				<button @click="${this.dispatchPlayControllerClickEvent}" aria-label="Play/Pause" class="control-button">
					<vwc-icon
						class="icon"
						size="small"
						type="${this._playState ? 'pause-solid' : 'play-solid'}"
					></vwc-icon>
				</button>
				<vwc-scrub-bar aria-label="Seek" class="scrubber"></vwc-scrub-bar>
			</main>
		`;
	}

	dispatchPlayControllerClickEvent():void {
		this.dispatchEvent(new CustomEvent('userPlayPauseRequest', { bubbles: true, composed: true }));
	}

	setPosition(percentage:number):void {
		this._scrubber.setPosition(percentage);
	}

	setPlayState(playState:boolean):void {
		this._playState = playState;
	}
}
