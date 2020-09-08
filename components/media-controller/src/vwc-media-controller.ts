// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import kefir from 'kefir';
import { pipe, partial, clamp, prop, always, not, allPass } from 'ramda';
import { style as vwcMediaControllerStyle } from './vwc-media-controller.css';

const
	SIGNAL = Symbol('signal'),
	TRACK_KNOB_HORIZONTAL_MARGIN = 5,
	TRACK_VERTICAL_RESPONSIVITY_MARGIN = 10,
	TRACK_INACTIVE_COLOR = '#E1E2E6',
	TRACK_ACTIVE_COLOR = '#999';

const
	byType = (typeName)=> ({ type })=> type === typeName,
	createTag = function(tagName, ...children){
		const el = document.createElement(tagName);
		children.forEach((child)=> typeof(child) === 'string' ? el.innerHTML += child : el.appendChild(child));
		return el;
	},
	sendCustomEventFactory = (target)=> (eventType, detail, options = { bubbles: true, composed: true })=> {
			const event = new CustomEvent(eventType, { ...options, detail });
			target.dispatchEvent(event);
	},
	between = (value, min, max)=> value >= min && value <= max,
	byMouseInsideControlRange = ({ mouseX, mouseY, rectX, rectY, rectWidth, rectHeight })=>
		between(
			mouseX,
			rectX - TRACK_KNOB_HORIZONTAL_MARGIN,
			rectX + rectWidth + TRACK_KNOB_HORIZONTAL_MARGIN
		)
		&& between(
		mouseY,
		rectY - TRACK_VERTICAL_RESPONSIVITY_MARGIN,
		rectY + rectHeight + TRACK_VERTICAL_RESPONSIVITY_MARGIN
	);

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

		// Local bus for collecting signals from the end-user/custom element api
		const
			apiBus = kefir.pool(),
			sendCustomEvent = sendCustomEventFactory(this);

		this[SIGNAL] = pipe(kefir.constant, apiBus.plug.bind(apiBus));

		// Set component's elemental structure
		const rootDoc = this.attachShadow({ mode: 'open' });
		let trackEl, ScrubberKnobEl, playPauseControlEl, rootEl;

		const componentContent = (function(){
			const [style, div, button] = ['style', 'div', 'button'].map((tagName)=> partial(createTag, [tagName]));
			return [
				style( vwcMediaControllerStyle.cssText),
				rootEl = div(
					playPauseControlEl = button(),
					trackEl = div(
						ScrubberKnobEl = button()
					)
				),
			];
		})();

		const
			rafStream = kefir.repeat(()=> kefir.fromCallback(requestAnimationFrame)),
			componentConnectedStream = apiBus.filter(byType('component_connected')),
			mouseClickStream = kefir.fromEvents(rootDoc, 'click'),
			mouseDownStream = kefir.fromEvents(rootDoc, 'mousedown'),
			[mouseUpStream, mouseMoveStream, contextMenuStream, windowResizeStream] = ['mouseup', 'mousemove', 'contextmenu', 'resize'].map((eventName)=> kefir.fromEvents(window, eventName));

		const userScrubStream = mouseDownStream
			.map(({ clientX, clientY })=>
				({
					mouseX: clientX,
					mouseY: clientY,
					...(({ x: rectX, y: rectY, width: rectWidth, height: rectHeight })=> ({ rectX, rectY, rectWidth, rectHeight }))(trackEl.getBoundingClientRect())
				}))
			.filter(byMouseInsideControlRange)
			.flatMapLatest(({ mouseX, mouseY, rectX, rectWidth })=> {
					return kefir.concat([
						kefir.constant({ type: 'start', rectWidth, rectX }),
						kefir
							.concat([
								kefir.constant({ mouseX, mouseY }),
								mouseMoveStream.map(({ clientX: mouseX, clientY: mouseY })=> ({ mouseX, mouseY }))
							])
							.map(pipe(
								prop('mouseX'),
								clamp(
									rectX + TRACK_KNOB_HORIZONTAL_MARGIN,
									rectX + rectWidth - TRACK_KNOB_HORIZONTAL_MARGIN
								),
								(pos)=>
									(pos - (rectX + TRACK_KNOB_HORIZONTAL_MARGIN)) / (rectWidth - TRACK_KNOB_HORIZONTAL_MARGIN * 2)
							))
							.takeUntilBy(kefir.merge([mouseUpStream, contextMenuStream]).take(1))
							.map((position)=> ({ type: 'position_change', position })),
						kefir.constant({ type: 'end' })
					])
			});

		const userScrubInteractionProperty = kefir
			.merge(['start', 'end'].map((eventType)=> userScrubStream.filter(byType(eventType)).map(always(eventType === 'start'))))
			.skipDuplicates()
			.toProperty(always(false));

		const apiPositionProperty = apiBus
			.filter(byType('set_position'))
			.map(prop('value'))
			.toProperty(always(0));

		const playStateProperty = apiBus
			.filter(byType('set_play_state'))
			.map(prop('value'))
			.toProperty(always(false));

		// Draw component internals
		componentConnectedStream.take(1).onValue(()=> {
			componentContent.forEach((el)=> rootDoc.appendChild(el));
		});

		// Update knob position
		apiBus
			.filter(byType('component_connected'))
			.flatMapLatest(()=> {
				return kefir
					.combine([
						userScrubInteractionProperty
							.flatMap((active)=> {
								return active
									? userScrubStream.filter(byType('position_change')).map(prop('position'))
									: apiPositionProperty.filterBy(userScrubInteractionProperty.map(not))
							})
							.skipDuplicates(),
						windowResizeStream.toProperty(always(0))
					], (val)=> val)
					.flatMapLatest((value)=> rafStream.take(1).map(always(value)))
					.takeUntilBy(apiBus.filter(byType('component_disconnected')).take(1));
			})
			.onValue((position)=> {
				const { width: trackWidth } = trackEl.getBoundingClientRect();
				ScrubberKnobEl.style.transform = `translate(-50%, -50%) translateX(${TRACK_KNOB_HORIZONTAL_MARGIN + position * (trackWidth - TRACK_KNOB_HORIZONTAL_MARGIN * 2)}px)`;
			});

		// Update track state
		apiPositionProperty
			.skipDuplicates()
			.onValue((percentage)=>
				trackEl.style.backgroundImage =
					`linear-gradient(90deg, ${TRACK_ACTIVE_COLOR} 0%, ${TRACK_ACTIVE_COLOR} ${percentage * 100}%, ${TRACK_INACTIVE_COLOR} ${percentage * 100}%, ${TRACK_INACTIVE_COLOR} 100%)`);

		// Update scrub state
		userScrubInteractionProperty
			.onValue((scrub)=> rootEl.classList.toggle('scrub', scrub));

		// Update play state
		playStateProperty
			.onValue((isPlaying)=> rootEl.classList.toggle('play', isPlaying));

		// Send user scrub event
		userScrubStream
			.filter(byType('position_change'))
			.map(prop('position'))
			.onValue(partial(sendCustomEvent,['userScrubRequest']));

		// Send user play/pause event
		mouseClickStream
			.filter(allPass([
				({ target })=> target === playPauseControlEl
			]))
			.onValue(partial(sendCustomEvent,['userPlayPauseRequest', null]));
	}

	/**
	* Sets the scrubber's position
 	* @param {number} position - The relative position of the scrubber (a value between 0-1).
	**/
	setPosition(position:number):void {
		this[SIGNAL]({ type: 'set_position', value: position });
	}

	/**
	 * Sets the component's play state
	 * @param {boolean} isPlaying - A boolean stating whether the component is playing or not (displayed pause/play buttons respectively).
	 **/
	setPlayState(isPlaying:boolean):void {
		this[SIGNAL]({ type: 'set_play_state', value: isPlaying });
	}

	connectedCallback():void{
		this[SIGNAL]({ type: 'component_connected' });
	}

	disconnectedCallback():void{
		this[SIGNAL]({ type: 'component_disconnected' });
	}
}

export default MediaController;
customElements.define('vwc-media-controller', MediaController);