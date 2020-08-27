// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@vonage/vwc-media-controller';
import kefir from 'kefir';

/*
audioEl.src = "./src/demo_1/dance_of_the_fireflies_nathan_moore.mp3";
audioEl.addEventListener('play', controller.setPlayPause.bind(controller, 'play'));
audioEl.addEventListener('pause', controller.setPlayPause.bind(controller, 'pause'));
audioEl.addEventListener('timeupdate', ({ timeStamp })=> controller.setPosition(audioEl.currentTime / audioEl.duration));
 */

const [SYMBOL_CONNECT, SYMBOL_DISCONNECT, SYMBOL_AUDIO_EL] = ['symbol_connect', 'symbol_disconnect', 'symbol_audio_el'].map((symbolName)=> Symbol(symbolName));

const noop = ()=> {
	// do nothing
};

interface ILookup<T> {
	[key: string]: T;
}

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

		const controllerElProperty = connectedProperty
			.filter(Boolean)
			.take(1)
			.onValue((mediaControllerEl)=> this.appendChild(controllerEl));

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

	get currentTime():number {
		return this[SYMBOL_AUDIO_EL].currentTime
	}

	set currentTime(time:number){
		this[SYMBOL_AUDIO_EL].currentTime = time;
	}

	get src():string {
		return [SYMBOL_AUDIO_EL].src;
	}

	set src(source:string){
		this[SYMBOL_AUDIO_EL].src = source;
	}

	play():void {
		this[SYMBOL_AUDIO_EL].play();
	}

	pause():void {
		this[SYMBOL_AUDIO_EL].pause();
	}

}

export default Audio;
customElements.define('vwc-audio', VwcAudio);