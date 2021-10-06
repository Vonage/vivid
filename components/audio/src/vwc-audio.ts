import '@vonage/vvd-core';
import '@vonage/vwc-media-controller';
import '@vonage/vwc-media-controller/vwc-scrub-bar.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import type { ClassInfo } from 'lit-html/directives/class-map';
import { pipe } from 'ramda';
import { style as AudioStyle } from './vwc-audio.css.js';
import { ariaProperty } from '@material/mwc-base/aria-property';
import '@vonage/vwc-icon';
import {
	LitElement,
	TemplateResult,
	customElement,
	html,
} from 'lit-element';

import type { PropertyValues } from 'lit-element';

import { nothing } from 'lit-html';
import { internalProperty, property, query } from 'lit-element/lib/decorators';
import type { VWCScrubBar } from '@vonage/vwc-media-controller/vwc-scrub-bar';
import type { Connotation } from '@vonage/vvd-foundation/constants';

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;


const setEvents = function (eventSource: HTMLElement, handlersMap: Record<string, ()=> unknown>) {
	return (pipe as any)(...Object
		.entries(handlersMap)
		.map(([eventName, eventHandler]) => {
			eventSource.addEventListener(eventName, eventHandler);
			return () => eventSource.removeEventListener(eventName, eventHandler);
		}));
};

/* istanbul ignore next */
const formatTime = (seconds:number) => {
	const outputTime:Array<number> = [];
	[HOUR, MINUTE, SECOND].reduce((ac:number, divider:number) => {
		outputTime.push(~~(ac / divider));
		return ac % divider;
	}, seconds);
	return outputTime
		.filter((segment:number, index:number, arr:number[]) => segment > 0 || index > arr.length - 3)
		.map((segment:number, index:number) => segment.toString().padStart(index === 0 ? 1 : 2, '0'))
		.join(':');
};

type AudioConnotation =
	Connotation.Primary |
	Connotation.CTA;

@customElement('vwc-audio')
export class VWCAudio extends LitElement {
	static styles = [AudioStyle];

	@property({ type: String, reflect: true })
	connotation?: AudioConnotation;

	@query('.audio-el')
	_audio!:HTMLAudioElement;

	@query('.scrubber')
	_scrubber!:VWCScrubBar;

	@ariaProperty
	@property({ attribute: 'aria-controls', type: String })
	ariaControls?:string;

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
			/* istanbul ignore next */
			loadedmetadata: () => this._duration = this._audio.duration,
			/* istanbul ignore next */
			timeupdate: () => this._playheadPosition = this._audio.currentTime,
			/* istanbul ignore next */
			loadstart: () => this._loading = true,
			/* istanbul ignore next */
			canplay: () => this._loading = false,
			/* istanbul ignore next */
			play: () => this._isPlaying = true,
			/* istanbul ignore next */
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

	override update(_changedProperties: PropertyValues):void {
		this._scrubber?.setPosition(this._playheadPosition / this._duration);
		super.update(_changedProperties);
	}

	protected getRenderClasses(): ClassInfo {
		return {
			[`connotation-${this.connotation}`]: !!this.connotation,
			loading: this._loading
		};
	}

	override render(): TemplateResult {
		return html`
			<audio class='audio-el' src='${ifDefined(this.src)}'></audio>
			<div class="audio ${classMap(this.getRenderClasses())}" aria-controls="${ifDefined(this.ariaControls)}">
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
