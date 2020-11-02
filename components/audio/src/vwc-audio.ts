// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@vonage/vwc-media-controller';
import kefir from 'kefir';

const SYMBOL_TRIGGER = Symbol('trigger'),
	SYMBOL_AUDIO_EL = Symbol('audio_el');

const filterByValue = (filterValue: string) => (value: string) =>
		value === filterValue,
	// eslint-disable-next-line
	createConnectedProperty = (ingestStream: any) => {
		return kefir
			.merge([
				ingestStream.filter(filterByValue('connected')).map(() => true),
				ingestStream.filter(filterByValue('disconnected')).map(() => false),
			])
			.toProperty(() => false);
	};

/**
 * Basic audio player
 *
 * @element vwc-audio
 *
 */
class VwcAudio extends HTMLElement {
	constructor() {
		super();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const audioEl = (this[SYMBOL_AUDIO_EL] = new Audio());
		const controllerEl = document.createElement('vwc-media-controller');

		audioEl.controls = true;

		const ingestStream = kefir.stream(({ emit }) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				this[SYMBOL_TRIGGER] = emit;
			}),
			connectedProperty = ingestStream.thru(createConnectedProperty);

		connectedProperty
			.filter(Boolean)
			.take(1)
			.onValue(() => {
				// eslint-disable-next-line
				const sourceUrl = this.getAttribute('src');
				sourceUrl && (this.src = sourceUrl);
				// eslint-disable-next-line
				this.hasAttribute('noseek') && controllerEl.setAttribute('noseek', '');
				// eslint-disable-next-line
				this.appendChild(controllerEl);
			});

		const userPlayRequestStream = kefir.fromEvents(
				controllerEl,
				'userPlayPauseRequest'
			),
			userScrubRequestStream = kefir
				.fromEvents(controllerEl, 'userScrubRequest')
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line
				.map(({ detail }): any => detail),
			playerTimeUpdatedProperty = kefir
				.fromEvents(audioEl, 'timeupdate')
				.map(() => audioEl.currentTime)
				.toProperty(),
			playerAudioLoadedProperty = kefir
				.merge([
					kefir.fromEvents(audioEl, 'loadstart').map(() => false),
					kefir.fromEvents(audioEl, 'canplay').map(() => true),
				])
				.toProperty(),
			playerIsPlayingProperty = kefir
				.merge([
					kefir.fromEvents(audioEl, 'play').map(() => true),
					kefir
						.merge([
							kefir.fromEvents(audioEl, 'pause'),
							playerAudioLoadedProperty.filter((loaded) => !loaded),
						])
						.map(() => false),
				])
				.toProperty();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		playerTimeUpdatedProperty.onValue(() =>
			controllerEl.setPosition(
				audioEl.currentTime === 0 ? 0 : audioEl.currentTime / audioEl.duration
			)
		);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		playerIsPlayingProperty.onValue(controllerEl.setPlayState.bind(controllerEl));
		userPlayRequestStream
			.filterBy(playerAudioLoadedProperty)
			.onValue(() => audioEl[audioEl.paused ? 'play' : 'pause']());
		// eslint-disable-next-line
		userScrubRequestStream
			.filterBy(playerAudioLoadedProperty)
			.onValue(
				(position: any) => (audioEl.currentTime = audioEl.duration * position)
			);
		connectedProperty
			.filter((connected) => !connected)
			.onValue(() => audioEl.pause());
	}

	// ts-ignore
	connectedCallback(): void {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this[SYMBOL_TRIGGER]('connected');
	}

	disconnectedCallback(): void {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this[SYMBOL_TRIGGER]('disconnected');
	}

	/**
	 * Gets/Sets the playhead position
	 * @param {number} time - The timestamp (in seconds) to jump to
	 **/
	get currentTime(): number {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this[SYMBOL_AUDIO_EL].currentTime;
	}

	set currentTime(time: number) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this[SYMBOL_AUDIO_EL].currentTime = time;
	}

	/**
	 * Gets/Sets the audio source
	 * @param {string} source - The media source file to play
	 **/
	get src(): string {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return [SYMBOL_AUDIO_EL].src;
	}

	set src(source: string) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this[SYMBOL_AUDIO_EL].src = source;
	}

	/**
	 * Starts playback
	 **/
	play(): void {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this[SYMBOL_AUDIO_EL].play();
	}

	/**
	 * Pauses playback
	 **/
	pause(): void {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this[SYMBOL_AUDIO_EL].pause();
	}
}

export default Audio;
customElements.define('vwc-audio', VwcAudio);
