// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import kefir from 'kefir';
import { pipe, not, always, clamp } from 'ramda';
import { style } from './vwc-media-controller.css';

const
	noop = ()=> {},
	TRACK_RESPONSE_MARGIN = 5,
	TRACK_VERTICAL_RESPONSIVITY_MARGIN = 15;

const [
	SET_POSITION,
	SET_PLAY_STATE,
	ON_CONNECT,
	ON_DISCONNECT
] = ['set_position', 'set_play_state', 'on_connect', 'on_disconnect'].map((name)=> Symbol(name));

/**
 * Displays controllers for media playback. Includes play/pause button and a scrub bar
 *
 * @element vwc-media-controller
 *
 * @fires userScrubRequest - Fires while the user modifies the scrubber's knob location.
 * @fires {number} userPlayPauseRequest - Fires when the user clicks the play/pause button, the "detail" event field will contain a number between zero and one describing the user's relative selected position.
 */
class MediaController extends HTMLElement {

	constructor() {
		super();

		const
			rootDom = this.attachShadow({ mode: 'open' }),
			baseStyle = document.createElement('style');

		baseStyle.innerHTML = style.cssText;
		rootDom.appendChild(baseStyle);

		[SET_PLAY_STATE, SET_POSITION].forEach((symbol)=> this[symbol] = noop);

		const
			triggerEvent = (eventName, payload)=> {
				const event = new CustomEvent(eventName.replace(/_(\w)/g, (m, group)=> group.toUpperCase()), { bubbles: true, composed: true, detail: payload });
				this.dispatchEvent(event);
			};

		const componentRootEl = document.createElement('div');
		componentRootEl.className = 'component';
		rootDom.appendChild(componentRootEl);

		const playPauseControlEl = document.createElement('button');
		playPauseControlEl.className = 'play-pause-control';
		componentRootEl.appendChild(playPauseControlEl);

		const
			[scrubberEl, trackEl] = [1,2].map(()=> document.createElement('div')),
			knobEl = document.createElement('button');

		knobEl.tabIndex = 0;
		scrubberEl.appendChild(trackEl);
		scrubberEl.appendChild(knobEl);
		scrubberEl.className = 'scrubber';
		scrubberEl.style.width = '100%';
		componentRootEl.appendChild(scrubberEl);

		const
			mouseClickStream = kefir.fromEvents(rootDom, 'click'),
			[
				mouseDownStream,
				mouseUpStream,
				mouseMoveStream,
				contentMenuStream
			] = [
				'mousedown',
				'mouseup',
				'mousemove',
				'contextmenu'
			].map((eventName)=> kefir.fromEvents(document, eventName));

		const connectedProperty = kefir.merge([
			kefir.stream(({ emit })=> this[ON_CONNECT] = emit).map(always(true)),
			kefir.stream(({ emit })=> this[ON_DISCONNECT] = emit).map(always(false))
		]).toProperty(always(false));

		const
			rafStream = kefir.repeat(()=> kefir.fromCallback((cb)=> requestAnimationFrame(cb))),
			trackElBoundingRectProperty = connectedProperty
				.filter(Boolean)
				.flatMapLatest(()=> {
					return kefir.concat([
						kefir.constant(trackEl.getBoundingClientRect()),
						kefir
							.fromEvents(window, 'resize')
							.debounce(10)
							.map(()=> trackEl.getBoundingClientRect())
							.takeUntilBy(connectedProperty.filter(pipe(Boolean, not)))
					]);
				})
				.toProperty(),
			userScrubInteractionProperty = kefir
				.merge([
					kefir
						.combine([mouseDownStream], [trackElBoundingRectProperty])
						.filter(([{ clientY, clientX }, { x, y, width, height }])=>
							clientX > x
							&& clientX < x + width
							&& clientY > y - TRACK_VERTICAL_RESPONSIVITY_MARGIN
							&& clientY < y + height + TRACK_VERTICAL_RESPONSIVITY_MARGIN
						)
						.map(()=> true),
					kefir.merge([
						mouseUpStream,
						contentMenuStream
					])
					.map(()=> false)
				])
				.skipDuplicates()
				.toProperty(()=> false),
			userScrubRequestStream = kefir
				.combine(
					[userScrubInteractionProperty, mouseMoveStream],
					[trackElBoundingRectProperty]
				)
				.filter(([interaction])=> interaction)
				.map(([interaction, { clientX }, { x, width }])=>
					clamp(
						0,
						width - (TRACK_RESPONSE_MARGIN * 2),
						clientX - (x + TRACK_RESPONSE_MARGIN)) / (width - TRACK_RESPONSE_MARGIN * 2)
				),
			userPlayPauseRequestStream = mouseClickStream
				.filter(({ target })=> target === playPauseControlEl),
			positionProperty = kefir.stream(({ emit })=> this[SET_POSITION] = emit).toProperty(()=> 0),
			playStateProperty = kefir
				.stream(({ emit })=> this[SET_PLAY_STATE] = emit)
				.toProperty(()=> false);

		userScrubRequestStream.onValue(triggerEvent.bind(null, 'user_scrub_request'));
		userPlayPauseRequestStream.onValue(triggerEvent.bind(null, 'user_play_pause_request'));
		playStateProperty.onValue((isPlaying)=> playPauseControlEl.classList.toggle('engaged', isPlaying));
		positionProperty.onValue((percentage)=> trackEl.style.backgroundImage = `linear-gradient(90deg, #999 0%, #999 ${percentage * 100}%, #00000000 ${percentage * 100}%, #00000000 100%)`);

		kefir
			.combine([
				kefir.combine([userScrubInteractionProperty, userScrubRequestStream.toProperty(()=> false), positionProperty], (scrub, request, actual)=> scrub ? request : actual),
				trackElBoundingRectProperty
			], (percentage, { width })=> TRACK_RESPONSE_MARGIN + (width - (TRACK_RESPONSE_MARGIN * 2)) * percentage)
			.sampledBy(rafStream)
			.onValue((xPos)=> knobEl.style.left = `${xPos}px`);
	}

	/**
	* Sets the scrubber's position
 	* @param {number} position - The relative position of the scrubber (a value between 0-1).
	**/
	setPosition(position:number):void {
		this[SET_POSITION](position);
	}

	/**
	 * Sets the component's play state
	 * @param {boolean} isPlaying - A boolean stating whether the component is playing or not (displayed pause/play buttons respectively).
	 **/
	setPlayState(isPlaying:boolean):void {
		this[SET_PLAY_STATE](isPlaying);
	}

	connectedCallback():void{
		this[ON_CONNECT]();
	}

	disconnectedCallback():void{
		this[ON_DISCONNECT]();
	}
}

export default MediaController;
customElements.define('vwc-media-controller', MediaController);