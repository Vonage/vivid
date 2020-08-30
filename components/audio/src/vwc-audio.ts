// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@vonage/vwc-media-controller';
import kefir from 'kefir';

const [SYMBOL_CONNECT, SYMBOL_DISCONNECT, SYMBOL_AUDIO_EL] = ['symbol_connect', 'symbol_disconnect', 'symbol_audio_el'].map((symbolName)=> Symbol(symbolName));

const noop = ()=> {
	// do nothing
};

interface ILookup<T> {
	[key: string]: T;
}

/**
 * Basic audio player
 *
 * @element vwc-audio
 *
 */
class VwcAudio extends HTMLElement implements ILookup<any> {
	[index:string]: any;

	constructor() {
		super();

		[SYMBOL_CONNECT, SYMBOL_DISCONNECT, SYMBOL_AUDIO_EL].forEach((symbol)=> this[symbol] = noop);

		const
			audioEl = this[SYMBOL_AUDIO_EL] = new Audio(),
			controllerEl = document.createElement('vwc-media-controller');

		audioEl.controls = true;

		const connectedProperty = kefir
			.merge([
					kefir.stream(({ emit })=> this[SYMBOL_CONNECT] = emit).map(()=> true),
					kefir.stream(({ emit })=> this[SYMBOL_DISCONNECT] = emit).map(()=> false)
			]).toProperty(()=> false);

		connectedProperty
			.filter(Boolean)
			.take(1)
			.onValue(()=> {
				// eslint-disable-next-line
				this.appendChild(controllerEl)
			});

		const
			userPlayRequestStream = kefir.fromEvents(controllerEl, 'userPlayPauseRequest'),
			userScrubRequestStream = kefir.fromEvents(controllerEl, 'userScrubRequest').map(({ detail })=> detail),
			playerTimeUpdatedProperty = kefir.fromEvents(audioEl, 'timeupdate').map(()=> audioEl.currentTime).toProperty(),
			playerAudioLoadedProperty = kefir
				.merge([
					kefir.fromEvents(audioEl, 'loadstart').map(()=> false),
					kefir.fromEvents(audioEl, 'canplay').map(()=> true)
				])
				.toProperty(),
			playerIsPlayingProperty = kefir.merge([
				kefir.fromEvents(audioEl, 'play').map(()=> true),
				kefir.merge([
					kefir.fromEvents(audioEl, 'pause'),
					playerAudioLoadedProperty.filter((loaded)=> !loaded)
				]).map(()=> false)
			]).toProperty();

		playerTimeUpdatedProperty.onValue(()=> controllerEl.setPosition(audioEl.currentTime === 0 ? 0 : audioEl.currentTime / audioEl.duration));
		playerIsPlayingProperty.onValue(controllerEl.setPlayState.bind(controllerEl));
		userPlayRequestStream.filterBy(playerAudioLoadedProperty).onValue(()=> audioEl[audioEl.paused ? 'play' : 'pause']());
		userScrubRequestStream.filterBy(playerAudioLoadedProperty).onValue((position)=> audioEl.currentTime = audioEl.duration * position);
		connectedProperty.filter((connected)=> !connected).onValue(()=> audioEl.pause());
	}

	connectedCallback():void{
		this[SYMBOL_CONNECT]();
	}

	disconnectedCallback():void {
		this[SYMBOL_DISCONNECT]();
	}

	/**
	 * Gets/Sets the playhead position
	 * @param {number} time - The timestamp (in seconds) to jump to
	 **/
	get currentTime():number {
		return this[SYMBOL_AUDIO_EL].currentTime
	}

	set currentTime(time:number){
		this[SYMBOL_AUDIO_EL].currentTime = time;
	}

	/**
	 * Gets/Sets the audio source
	 * @param {string} source - The media source file to play
	 **/
	get src():string {
		return [SYMBOL_AUDIO_EL].src;
	}

	set src(source:string){
		this[SYMBOL_AUDIO_EL].src = source;
	}

	/**
	 * Starts playback
	 **/
	play():void {
		this[SYMBOL_AUDIO_EL].play();
	}

	/**
	 * Pauses playback
	 **/
	pause():void {
		this[SYMBOL_AUDIO_EL].pause();
	}

}

export default Audio;
customElements.define('vwc-audio', VwcAudio);