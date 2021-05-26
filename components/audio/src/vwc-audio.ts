import '@vonage/vvd-core';
import '@vonage/vwc-media-controller';
import { pipe } from 'ramda';
import { VWCScrubBar } from '@vonage/vwc-media-controller/vwc-scrub-bar';
import { style as AudioStyle } from './vwc-audio.css';
import '@vonage/vwc-icon';
import {
	LitElement,
	TemplateResult,
	customElement,
	html,
	PropertyValues,
} from 'lit-element';

import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { internalProperty, property, query } from 'lit-element/lib/decorators';

const setEvents = function (eventSource: HTMLElement, handlersMap: Record<string, ()=> unknown>) {
	return (<any>pipe)(...Object
		.entries(handlersMap)
		.map(([eventName, eventHandler]) => {
			eventSource.addEventListener(eventName, eventHandler);
			return () => eventSource.removeEventListener(eventName, eventHandler);
		}));
};

const formatTime = (seconds:number) => {
	const outputTime:Array<number> = [];
	[24 * 60, 60, 1].reduce((ac:number, divider:number) => {
		outputTime.push(~~(ac / divider));
		return ac % divider;
	}, seconds);
	return outputTime
		.filter((segment:number, index:number, arr:number[]) => segment > 0 || index > arr.length - 3)
		.map((segment:number, index:number) => segment.toString().padStart(index === 0 ? 1 : 2, '0'))
		.join(':');
};

@customElement('vwc-audio')
export class VWCAudio extends LitElement {
	static styles = [AudioStyle];

	@query('.audio')
	_audio!:HTMLAudioElement;

	@query('.scrubber')
	_scrubber!:VWCScrubBar;

	@property({ type: String, reflect: true })
	src?:string;

	@property({ type: Boolean, reflect: true })
	noseek = false;

	@property({ type: Boolean, reflect: true })
	timestamp = false;

	@internalProperty()
	private _duration = 0;

	@internalProperty()
	private _isPlaying = false;

	@internalProperty()
	private _loading = true;

	@internalProperty()
	private _playheadPosition = 0;

	protected firstUpdated(_changedProperties: PropertyValues):void {
		super.firstUpdated(_changedProperties);
		setEvents(this._audio, {
			loadedmetadata: () => this._duration = this._audio.duration,
			timeupdate: () => this._playheadPosition = this._audio.currentTime,
			loadstart: () => this._loading = true,
			canplay: () => this._loading = false,
			play: () => this._isPlaying = true,
			pause: () => this._isPlaying = false
		});
	}

	play(): void {
		this._audio.play();
	}

	pause(): void {
		this._audio.pause();
	}

	get currentTime(): number {
		return this._audio.currentTime;
	}

	set currentTime(time: number) {
		this._audio.currentTime = time;
	}

	update(_changedProperties: PropertyValues):void {
		this._scrubber?.setPosition(this._playheadPosition / this._duration);
		super.update(_changedProperties);
	}

	render():TemplateResult {
		return html`
			<audio class='audio' src='${this.src}'></audio>
			<div class="${classMap({ root: true, loading: this._loading })}">
				<button
					aria-label="Play/Pause"
					class="control-button"
					@click="${() => (this._isPlaying ? this.pause : this.play).call(this)}"
				>
				<vwc-icon
						class="icon"
						size="small"
						type="${this._isPlaying ? 'pause-solid' : 'play-solid'}"
				></vwc-icon>
				</button>
				${this.timestamp ? html`<div class="playhead-position">${formatTime(this._playheadPosition)} / ${formatTime(this._duration)}</div>` : nothing}
				${!this.noseek ? html`<vwc-scrub-bar @userScrubRequest="${({ detail }: { detail: number }) => this.currentTime = detail * this._duration}" class="scrubber"></vwc-scrub-bar>` : nothing}
			</div>
		`;
	}
}
