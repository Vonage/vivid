import '@vonage/vvd-core';
import kefir from 'kefir';
import { pipe, partial, clamp, prop, always, not, identity, path } from 'ramda';
import { style as vwcMediaControllerStyle } from './vwc-media-controller.css';
import { Observable } from 'kefir';

const SIGNAL = Symbol('signal'),
	TRACK_KNOB_HORIZONTAL_MARGIN = 5,
	TRACK_VERTICAL_RESPONSIVITY_MARGIN = 10,
	TRACK_INACTIVE_COLOR = '#E1E2E6',
	TRACK_ACTIVE_COLOR = '#999';

interface StreamEvent {
	type: string;
	value?: unknown;
	[key: string]: unknown;
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

const kefirStreamFromAddEventListener = function (
	target: EventTarget,
	eventName: string,
	options: AddEventListenerOptions
) {
	return kefir.stream(({ emit }) => {
		target.addEventListener(eventName, emit, options);
		return () => target.removeEventListener(eventName, emit);
	});
};

const attachBoundingRect = (targetEl: HTMLElement) => (
	obj: unknown
): unknown => {
	return Object.assign(
		obj,
		(({ x, y, width, height }) => ({ x, y, width, height }))(
			targetEl.getBoundingClientRect()
		)
	);
};

const byType = (typeName: string) => ({ type }: StreamEvent) =>
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
	detail: unknown,
	options: Record<string, unknown> = { bubbles: true, composed: true }
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

const isEventWithinTrackElRect = function ({ mouseX, mouseY, ...rect }) {
	return isInRect(
		{ x: mouseX, y: mouseY },
		addRectMargin({ marginY: TRACK_VERTICAL_RESPONSIVITY_MARGIN }, rect as Rect)
	);
} as (p: unknown) => boolean;

// Artificially Excluded functions (here to remove congestion in constructor)
const createBaseStructureAndHandles = function () {
	let trackEl: HTMLElement,
		ScrubberKnobEl: HTMLElement,
		playPauseControlEl: HTMLElement,
		rootEl: HTMLElement;

	const [style, div, button] = ['style', 'div', 'button'].map(
		(tagName) =>
			partial(createTag, [tagName]) as (
				...children: Array<HTMLElement | string>
			) => HTMLElement
	);
	return {
		componentDOMElements: [
			style(vwcMediaControllerStyle.cssText),
			(rootEl = div(
				(playPauseControlEl = button()),
				(trackEl = div((ScrubberKnobEl = button())))
			)),
		],
		uiHandles: { trackEl, ScrubberKnobEl, playPauseControlEl, rootEl },
	};
};

const createTrackBarEnabledProperty = function (
	this: MediaController,
	componentConnectedStream: Observable<unknown, unknown>
) {
	return componentConnectedStream
		.take(1)
		.map(() => {
			// eslint-disable-next-line
			return !this.hasAttribute('noseek');
		})
		.toProperty(() => true);
};

const createApiPositionProperty = function (
	apiBus: Observable<unknown, unknown>
) {
	return apiBus
		.filter(byType('set_position') as (p: unknown) => boolean)
		.map(prop('value') as (p: unknown) => unknown)
		.toProperty(always(0));
};

const createScrubStream = function ({
	mouseUpStream,
	mouseMoveStream,
	touchMoveStream,
	contextMenuStream,
	touchEndStream,
}: {
	mouseUpStream: Observable<unknown, unknown>;
	mouseMoveStream: Observable<unknown, unknown>;
	touchMoveStream: Observable<unknown, unknown>;
	contextMenuStream: Observable<unknown, unknown>;
	touchEndStream: Observable<unknown, unknown>;
}) {
	return function ({
		mouseX,
		mouseY,
		x: rectX,
		width: rectWidth,
		identifier: touchIdentifier,
	}: {
		mouseX: number;
		mouseY: number;
		x: number;
		width: number;
		identifier: number;
	}) {
		return kefir.concat([
			kefir.constant({ type: 'start', rectWidth, rectX }),
			kefir
				.concat([
					kefir.constant({ mouseX, mouseY }),
					kefir
						.merge([
							mouseMoveStream,
							touchMoveStream
								.map((event: unknown): unknown => {
									const touches = (event as Record<string, ArrayLike<unknown>>)[
										'touches'
									];
									return Array.from(touches).find(
										(({ identifier: currentIdentifier }) =>
											currentIdentifier === touchIdentifier) as (value: unknown) => unknown
									);
								})
								.filter(Boolean),
						])
						.map((({ clientX: mouseX, clientY: mouseY }) => ({
							mouseX,
							mouseY,
						})) as (value: unknown) => unknown),
				])
				.map(
					pipe(
						prop('mouseX') as (x: unknown) => number,
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
							touchEndStream.filter((event: unknown): boolean => {
								const changedTouches = (event as Record<
									string,
									unknown
								>['changedTouches']) as ArrayLike<unknown>;
								return Array.from(changedTouches)
									.map(prop('identifier') as (parameter: unknown) => unknown)
									.includes(touchIdentifier);
							}),
						])
						.take(1)
				)
				.map((position) => ({ type: 'position_change', position })),
			kefir.constant({ type: 'end' }),
		]);
	};
};

const createTrackBarStream = function ({
	trackBarEnabledProperty,
	componentConnectedStream,
	touchStartStream,
	mouseDownStream,
	mouseUpStream,
	mouseMoveStream,
	touchMoveStream,
	contextMenuStream,
	touchEndStream,
	apiPositionProperty,
	rafStream,
	windowResizeStream,
	apiBus,
	trackEl,
}: {
	trackBarEnabledProperty: Observable<unknown, unknown>;
	componentConnectedStream: Observable<unknown, unknown>;
	touchStartStream: Observable<unknown, unknown>;
	mouseDownStream: Observable<unknown, unknown>;
	mouseUpStream: Observable<unknown, unknown>;
	mouseMoveStream: Observable<unknown, unknown>;
	touchMoveStream: Observable<unknown, unknown>;
	contextMenuStream: Observable<unknown, unknown>;
	touchEndStream: Observable<unknown, unknown>;
	apiPositionProperty: Observable<unknown, unknown>;
	rafStream: Observable<unknown, unknown>;
	windowResizeStream: Observable<unknown, unknown>;
	apiBus: Observable<unknown, unknown>;
	trackEl: HTMLElement;
}) {
	return kefir
		.combine([trackBarEnabledProperty, componentConnectedStream], identity)
		.flatMapLatest((trackEnabled) => {
			const userScrubStream = kefir
				.merge([touchStartStream.map(path(['changedTouches', 0])), mouseDownStream])
				.map(
					// This transforms the original mouse event to logical names and adds the trackEl rectangle
					pipe(
						(({ clientX: mouseX, clientY: mouseY, identifier }) => ({
							mouseX,
							mouseY,
							identifier,
						})) as (a: unknown) => unknown,
						attachBoundingRect(trackEl)
					)
				)
				.filter(isEventWithinTrackElRect)
				.flatMapLatest(
					createScrubStream({
						mouseUpStream,
						mouseMoveStream,
						touchMoveStream,
						contextMenuStream,
						touchEndStream,
					}) as (p: unknown) => Observable<unknown, unknown>
				);

			const userScrubInteractionProperty = kefir
				.merge(
					['start', 'end'].map((eventType) =>
						userScrubStream
							.filter(byType(eventType) as (parameter: unknown) => boolean)
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
															.filter(
																byType('position_change') as (parameter: unknown) => boolean
															)
															.map(prop('position') as (parameter: unknown) => unknown)
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
							apiPositionProperty.skipDuplicates().map((percentage) => ({
								type: 'update_progress_position',
								value: percentage,
							})),
							userScrubInteractionProperty.map((state) => ({
								type: 'update_scrub_state',
								value: state,
							})),
							userScrubStream
								.filter(byType('position_change') as (parameter: unknown) => boolean)
								.map(
									pipe(
										prop('position') as (a: unknown) => unknown,
										(position): unknown => ({
											type: 'update_user_scrub_request',
											value: position,
										})
									)
								),
						])
						.takeUntilBy(
							apiBus
								.filter(
									byType('component_disconnected') as (parameter: unknown) => boolean
								)
								.take(1)
						)
				: kefir.constant({ type: 'update_scrub_state', value: false });
		});
};

function drawInternals(
	componentConnectedStream: Observable<unknown, unknown>,
	componentContent: HTMLElement[],
	rootDoc: ShadowRoot
) {
	componentConnectedStream.take(1).onValue(() => {
		componentContent.forEach((el) => rootDoc.appendChild(el));
	});
}

function setTrackEnabled(
	trackBarEnabledProperty: Observable<unknown, unknown>,
	trackEl: HTMLElement
) {
	trackBarEnabledProperty.onValue(
		(enabled) => (trackEl.style.display = enabled ? 'block' : 'none')
	);
}

function setKnobPosition(
	trackBarStream: Observable<unknown, unknown>,
	trackEl: HTMLElement,
	ScrubberKnobEl: HTMLElement
) {
	// Update knob position
	trackBarStream
		.filter(byType('update_knob_position') as (parameter: unknown) => boolean)
		.map(prop('value') as (parameter: unknown) => unknown)
		.onValue((position) => {
			const { width: trackWidth } = trackEl.getBoundingClientRect();
			ScrubberKnobEl.style.transform = `translate(-50%, -50%) translateX(${
				TRACK_KNOB_HORIZONTAL_MARGIN +
				(position as number) * (trackWidth - TRACK_KNOB_HORIZONTAL_MARGIN * 2)
			}px)`;
		});
}

function setTrackBarPosition(
	trackBarStream: Observable<unknown, unknown>,
	trackEl: HTMLElement
) {
	trackBarStream
		.filter(byType('update_progress_position') as (parameter: unknown) => boolean)
		.map(prop('value') as (parameter: unknown) => unknown)
		.onValue(
			(percentage) =>
				(trackEl.style.backgroundImage = `linear-gradient(90deg, ${TRACK_ACTIVE_COLOR} 0%, ${TRACK_ACTIVE_COLOR} ${
					(percentage as number) * 100
				}%, ${TRACK_INACTIVE_COLOR} ${
					(percentage as number) * 100
				}%, ${TRACK_INACTIVE_COLOR} 100%)`)
		);
}

function setScrubClass(
	trackBarStream: Observable<unknown, unknown>,
	rootEl: HTMLElement
) {
	trackBarStream
		.filter(byType('update_scrub_state') as (parameter: unknown) => boolean)
		.map(prop('value') as (parameter: unknown) => unknown)
		.onValue((scrub) => rootEl.classList.toggle('scrub', scrub as boolean));
}

function sendScrubEvents(
	trackBarStream: Observable<unknown, unknown>,
	sendCustomEvent: (
		eventType: string,
		detail: unknown,
		options?: Record<string, unknown>
	) => void
) {
	// Send user scrub event
	trackBarStream
		.filter(
			byType('update_user_scrub_request') as (parameter: unknown) => boolean
		)
		.map(prop('value') as (parameter: unknown) => unknown)
		.onValue(
			partial(sendCustomEvent, ['userScrubRequest']) as (p: unknown) => void
		);
}

function updatePlayState(
	playStateProperty: Observable<unknown, unknown>,
	rootEl: HTMLElement
) {
	// Update play state
	playStateProperty.onValue((isPlaying) =>
		rootEl.classList.toggle('play', isPlaying as boolean)
	);
}

function sendPlayPauseEvents(
	mouseClickStream: Observable<unknown, unknown>,
	playPauseControlEl: HTMLElement,
	sendCustomEvent: (
		eventType: string,
		detail: unknown,
		options?: Record<string, unknown>
	) => void
) {
	// Send user play/pause event
	mouseClickStream
		.filter(
			(obj: unknown): boolean =>
				(obj as Record<string, unknown>)['target'] === playPauseControlEl
		)
		.onValue(
			partial(sendCustomEvent, ['userPlayPauseRequest', null]) as (
				p: unknown
			) => void
		);
}

/**
 * Displays controllers for media playback. Includes play/pause button and a scrub bar
 *
 * @element vwc-media-controller
 *
 * @fires userScrubRequest - Fires while the user modifies the scrubber's knob location.
 * @fires {number} userPlayPauseRequest - Fires when the user clicks the play/pause button, the "detail" event field will contain a number between zero and one describing the user's relative selected position.
 */
class MediaController extends HTMLElement {
	[SIGNAL] = (payload?: Record<string, unknown>): void => {
		void payload;
	};

	constructor() {
		super();

		// Local bus for collecting signals from the end-user/custom element api
		const apiBus = kefir.pool();

		const sendCustomEvent = sendCustomEventFactory(this);

		this[SIGNAL] = pipe(kefir.constant, apiBus.plug.bind(apiBus));

		// Set component's elemental structure
		const rootDoc = this.attachShadow({ mode: 'open' });

		const {
			componentDOMElements: componentContent,
			uiHandles: { trackEl, ScrubberKnobEl, playPauseControlEl, rootEl },
		} = createBaseStructureAndHandles();

		const rafStream = kefir.repeat(() =>
			kefir.fromCallback(requestAnimationFrame)
		);

		const componentConnectedStream = apiBus.filter(
			byType('component_connected') as (p: unknown) => boolean
		);

		const mouseClickStream = kefir.fromEvents(rootDoc, 'click');

		const mouseDownStream = kefir.fromEvents(rootDoc, 'mousedown');

		const touchStartStream = kefir
			.fromEvents(window, 'touchstart')
			.map(preventDefault as (p: unknown) => unknown);

		const touchMoveStream = kefirStreamFromAddEventListener(window, 'touchmove', {
			passive: false,
		}).map(preventDefault as (p: unknown) => unknown);

		const touchEndStream = kefir.merge(
			['touchend', 'touchcancel'].map((eventName) =>
				kefir.fromEvents(window, eventName)
			)
		);

		const mouseUpStream = kefir.fromEvents(window, 'mouseup');

		const mouseMoveStream = kefir.fromEvents(window, 'mousemove');

		const contextMenuStream = kefir.fromEvents(window, 'contextmenu');

		const windowResizeStream = kefir.fromEvents(window, 'resize');

		const trackBarEnabledProperty = createTrackBarEnabledProperty.call(
			this,
			componentConnectedStream
		);

		const apiPositionProperty = createApiPositionProperty(apiBus);

		const trackBarStream = createTrackBarStream({
			trackBarEnabledProperty,
			componentConnectedStream,
			touchStartStream,
			mouseDownStream,
			mouseUpStream,
			mouseMoveStream,
			touchMoveStream,
			contextMenuStream,
			touchEndStream,
			apiPositionProperty,
			rafStream,
			windowResizeStream,
			apiBus,
			trackEl,
		});

		const playStateProperty = apiBus
			.filter(byType('set_play_state') as (parameter: unknown) => boolean)
			.map(prop('value') as (parameter: unknown) => unknown)
			.toProperty(always(false));

		drawInternals(componentConnectedStream, componentContent, rootDoc);

		setTrackEnabled(trackBarEnabledProperty, trackEl);

		setKnobPosition(
			trackBarStream as Observable<string, unknown>,
			trackEl,
			ScrubberKnobEl
		);

		setTrackBarPosition(trackBarStream as Observable<string, unknown>, trackEl);

		setScrubClass(trackBarStream, rootEl);

		sendScrubEvents(trackBarStream, sendCustomEvent);

		updatePlayState(playStateProperty, rootEl);

		sendPlayPauseEvents(mouseClickStream, playPauseControlEl, sendCustomEvent);
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
