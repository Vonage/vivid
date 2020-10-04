// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@vonage/vvd-core';
import kefir from 'kefir';
import { pipe, partial, clamp, prop, always, not, identity, path } from 'ramda';
import { style as vwcMediaControllerStyle } from './vwc-media-controller.css';

const SIGNAL = Symbol('signal'),
	TRACK_KNOB_HORIZONTAL_MARGIN = 5,
	TRACK_VERTICAL_RESPONSIVITY_MARGIN = 10,
	TRACK_INACTIVE_COLOR = '#E1E2E6',
	TRACK_ACTIVE_COLOR = '#999';

interface StreamEvent {
	type: string;
	value?: any;
	[key: string]: any;
}

interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface Point {
	x: number;
	y: number;
}

const byType = (typeName: string, ...ops: any) => ({ type }: StreamEvent) =>
	type === typeName;

const createTag = function (
	tagName: string,
	...children: (string | HTMLElement)[]
): HTMLElement {
	const el = document.createElement(tagName);
	children.forEach((child: string | HTMLElement) =>
		typeof child === 'string' ? (el.innerHTML += child) : el.appendChild(child)
	);
	return el;
};

const preventDefault = (e: Event) => {
	e.preventDefault();
	return e;
};

const sendCustomEventFactory = (target: HTMLElement) => (
	eventType: string,
	detail: any,
	options: any = { bubbles: true, composed: true }
) => {
	const event = new CustomEvent(eventType, { ...options, detail });
	target.dispatchEvent(event);
};

const addRectMargin = (
	{ marginX = 0, marginY = 0 }: { marginX?: number; marginY?: number },
	{ x, y, width, height }: Rect
) => ({
	x: x - marginX,
	y: y - marginY,
	width: width + marginX * 2,
	height: height + marginY * 2,
});

const isBetween = (value: number, min: number, max: number) =>
	value >= min && value <= max;

const isInRect = (
	{ x: sourceX, y: sourceY }: Point,
	{ x: rectX, y: rectY, width: rectWidth, height: rectHeight }: Rect
) =>
	[
		isBetween(sourceX, rectX, rectX + rectWidth),
		isBetween(sourceY, rectY, rectY + rectHeight),
	].every(identity);

/**
 * Displays controllers for media playback. Includes play/pause button and a scrub bar
 *
 * @element vwc-media-controller
 *
 * @fires userScrubRequest - Fires while the user modifies the scrubber's knob location.
 * @fires {number} userPlayPauseRequest - Fires when the user clicks the play/pause button, the "detail" event field will contain a number between zero and one describing the user's relative selected position.
 */
class MediaController extends HTMLElement implements ExtendableClass {
	[SIGNAL] = _.noop;
	constructor() {
		super();

		// Local bus for collecting signals from the end-user/custom element api
		const apiBus = kefir.pool(),
			sendCustomEvent = sendCustomEventFactory(this);

		this[SIGNAL] = pipe(kefir.constant, apiBus.plug.bind(apiBus));

		// Set component's elemental structure
		const rootDoc = this.attachShadow({ mode: 'open' });
		let trackEl: HTMLElement,
			ScrubberKnobEl: HTMLElement,
			playPauseControlEl: HTMLElement,
			rootEl: HTMLElement;

		const componentContent = (function () {
			const [style, div, button] = ['style', 'div', 'button'].map((tagName) =>
				partial(createTag, [tagName])
			);
			return [
				style(vwcMediaControllerStyle.cssText),
				(rootEl = div(
					(playPauseControlEl = button()),
					(trackEl = div((ScrubberKnobEl = button())))
				)),
			];
		})();

		const rafStream = kefir.repeat(() =>
				kefir.fromCallback(requestAnimationFrame)
			),
			componentConnectedStream = apiBus.filter(byType('component_connected')),
			mouseClickStream = kefir.fromEvents(rootDoc, 'click'),
			mouseDownStream = kefir.fromEvents(rootDoc, 'mousedown'),
			touchStartStream = kefir
				.fromEvents(window, 'touchstart')
				.map(preventDefault),
			touchMoveStream = kefir
				.stream(({ emit }) => {
					window.addEventListener('touchmove', emit, { passive: false });
					return () => window.removeEventListener('touchmove', emit);
				})
				.map(preventDefault),
			touchEndStream = kefir.merge(
				['touchend', 'touchcancel'].map((eventName) =>
					kefir.fromEvents(window, eventName)
				)
			),
			[mouseUpStream, mouseMoveStream, contextMenuStream, windowResizeStream] = [
				'mouseup',
				'mousemove',
				'contextmenu',
				'resize',
			].map((eventName) => kefir.fromEvents(window, eventName)),
			trackBarEnabledProperty = componentConnectedStream
				.take(1)
				.map(() => {
					// eslint-disable-next-line
					return this.getAttribute('noseek') !== 'true';
				})
				.toProperty(() => true);

		const apiPositionProperty = apiBus
			.filter(byType('set_position'))
			.map(prop('value'))
			.toProperty(always(0));

		const trackBarStream = kefir
			.combine([trackBarEnabledProperty, componentConnectedStream], identity)
			.flatMapLatest(function (trackEnabled) {
				const userScrubStream = kefir
					.merge([
						touchStartStream.map(path(['changedTouches', 0])),
						mouseDownStream,
					])
					.map(({ clientX: mouseX, clientY: mouseY, identifier }) => ({
						mouseX,
						mouseY,
						identifier,
						...(({ x, y, width, height }) => ({ x, y, width, height }))(
							trackEl.getBoundingClientRect()
						),
					}))
					.filter(({ mouseX, mouseY, ...rect }) =>
						isInRect(
							{ x: mouseX, y: mouseY },
							addRectMargin({ marginY: TRACK_VERTICAL_RESPONSIVITY_MARGIN }, rect)
						)
					)
					.flatMapLatest(
						({
							mouseX,
							mouseY,
							x: rectX,
							width: rectWidth,
							identifier: touchIdentifier,
						}) => {
							return kefir.concat([
								kefir.constant({ type: 'start', rectWidth, rectX }),
								kefir
									.concat([
										kefir.constant({ mouseX, mouseY }),
										kefir
											.merge([
												mouseMoveStream,
												touchMoveStream
													.map(({ touches }) =>
														Array.from(touches).find(
															({ identifier: currentIdentifier }) =>
																currentIdentifier === touchIdentifier
														)
													)
													.filter(Boolean),
											])
											.map(({ clientX: mouseX, clientY: mouseY }) => ({ mouseX, mouseY })),
									])
									.map(
										pipe(
											prop('mouseX'),
											clamp(
												rectX + TRACK_KNOB_HORIZONTAL_MARGIN,
												rectX + rectWidth - TRACK_KNOB_HORIZONTAL_MARGIN
											),
											(pos) =>
												(pos - (rectX + TRACK_KNOB_HORIZONTAL_MARGIN)) /
												(rectWidth - TRACK_KNOB_HORIZONTAL_MARGIN * 2)
										)
									)
									.takeUntilBy(
										kefir
											.merge([
												mouseUpStream,
												contextMenuStream,
												touchEndStream.filter(({ changedTouches }) =>
													Array.from(changedTouches)
														.map(prop('identifier'))
														.includes(touchIdentifier)
												),
											])
											.take(1)
									)
									.map((position) => ({ type: 'position_change', position })),
								kefir.constant({ type: 'end' }),
							]);
						}
					);

				const userScrubInteractionProperty = kefir
					.merge(
						['start', 'end'].map((eventType) =>
							userScrubStream
								.filter(byType(eventType))
								.map(always(eventType === 'start'))
						)
					)
					.skipDuplicates()
					.toProperty(always(false));

				return trackEnabled
					? kefir
							.merge([
								kefir
									.combine(
										[
											userScrubInteractionProperty
												.flatMap((active) => {
													return active
														? userScrubStream
																.filter(byType('position_change'))
																.map(prop('position'))
														: apiPositionProperty.filterBy(
																userScrubInteractionProperty.map(not)
														  );
												})
												.skipDuplicates(),
											windowResizeStream.toProperty(always(0)),
										],
										(val) => val
									)
									.flatMapLatest((value) => rafStream.take(1).map(always(value)))
									.map((position) => ({
										type: 'update_knob_position',
										value: position,
									})),
								apiPositionProperty
									.skipDuplicates()
									.map((percentage) => ({
										type: 'update_progress_position',
										value: percentage,
									})),
								userScrubInteractionProperty.map((state) => ({
									type: 'update_scrub_state',
									value: state,
								})),
								userScrubStream
									.filter(byType('position_change'))
									.map(
										pipe(prop('position'), (position) => ({
											type: 'update_user_scrub_request',
											value: position,
										}))
									),
							])
							.takeUntilBy(apiBus.filter(byType('component_disconnected')).take(1))
					: kefir.constant({ type: 'update_scrub_state', value: false });
			});

		// Draw component internals
		componentConnectedStream.take(1).onValue(() => {
			componentContent.forEach((el) => rootDoc.appendChild(el));
		});

		trackBarEnabledProperty.onValue(
			(enabled) => (trackEl.style.display = enabled ? 'block' : 'none')
		);

		// Update knob position
		trackBarStream
			.filter(byType('update_knob_position'))
			.map(prop('value'))
			.onValue((position) => {
				const { width: trackWidth } = trackEl.getBoundingClientRect();
				ScrubberKnobEl.style.transform = `translate(-50%, -50%) translateX(${
					TRACK_KNOB_HORIZONTAL_MARGIN +
					position * (trackWidth - TRACK_KNOB_HORIZONTAL_MARGIN * 2)
				}px)`;
			});

		trackBarStream
			.filter(byType('update_progress_position'))
			.map(prop('value'))
			.onValue(
				(percentage) =>
					(trackEl.style.backgroundImage = `linear-gradient(90deg, ${TRACK_ACTIVE_COLOR} 0%, ${TRACK_ACTIVE_COLOR} ${
						percentage * 100
					}%, ${TRACK_INACTIVE_COLOR} ${
						percentage * 100
					}%, ${TRACK_INACTIVE_COLOR} 100%)`)
			);

		trackBarStream
			.filter(byType('update_scrub_state'))
			.map(prop('value'))
			.onValue((scrub) => rootEl.classList.toggle('scrub', scrub));

		// Send user scrub event
		trackBarStream
			.filter(byType('update_user_scrub_request'))
			.map(prop('value'))
			.onValue(partial(sendCustomEvent, ['userScrubRequest']));

		const playStateProperty = apiBus
			.filter(byType('set_play_state'))
			.map(prop('value'))
			.toProperty(always(false));

		// Update play state
		playStateProperty.onValue((isPlaying) =>
			rootEl.classList.toggle('play', isPlaying)
		);

		// Send user play/pause event
		mouseClickStream
			.filter(
				({ target }: { target: HTMLElement }) => target === playPauseControlEl
			)
			.onValue(partial(sendCustomEvent, ['userPlayPauseRequest', null]));
	}

	/**
	 * Sets the scrubber's position
	 * @param {number} position - The relative position of the scrubber (a value between 0-1).
	 **/
	setPosition(position: number): void {
		this[SIGNAL]({ type: 'set_position', value: position });
	}

	/**
	 * Sets the component's play state
	 * @param {boolean} isPlaying - A boolean stating whether the component is playing or not (displayed pause/play buttons respectively).
	 **/
	setPlayState(isPlaying: boolean): void {
		this[SIGNAL]({ type: 'set_play_state', value: isPlaying });
	}

	connectedCallback(): void {
		this[SIGNAL]({ type: 'component_connected' });
	}

	disconnectedCallback(): void {
		this[SIGNAL]({ type: 'component_disconnected' });
	}
}

export default MediaController;
customElements.define('vwc-media-controller', MediaController);
