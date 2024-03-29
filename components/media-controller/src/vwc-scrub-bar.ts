// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@vonage/vvd-core';
import kefir from 'kefir';
import {
	pipe, partial, clamp, prop, always, not, identity, path
} from 'ramda';
import { style as vwcScrubBarStyle } from './vwc-scrub-bar.css.js';

const SIGNAL = Symbol('signal'),
	TRACK_KNOB_HORIZONTAL_MARGIN = 5,
	TRACK_VERTICAL_RESPONSIVITY_MARGIN = 10,
	TRACK_INACTIVE_COLOR = 'var(--disable-scrub, #E1E2E6)',
	TRACK_ACTIVE_COLOR = 'var(--disable-scrub, #999)',
	KEY_LEFT = 'ArrowLeft',
	KEY_RIGHT = 'ArrowRight';

const byType = typeName => ({ type }) => type === typeName,
	createTag = function (tagName, tagAttrs = {}, ...children) {
		const el = document.createElement(tagName);
		Object.entries(tagAttrs).forEach(([attributeName, attributeValue]) => el.setAttribute(attributeName, attributeValue));
		children.forEach(child => (typeof child === 'string' ? (el.innerHTML += child) : el.appendChild(child)));
		return el;
	},
	preventDefault = (e) => {
		e.preventDefault();
		return e;
	},
	sendCustomEventFactory = target => (
		eventType,
		detail,
		options = { bubbles: true, composed: true }
	) => {
		const event = new CustomEvent(eventType, { ...options, detail });
		target.dispatchEvent(event);
	},
	addRectMargin = ({ marginX = 0, marginY = 0 }, {
		x, y, width, height
	}) => ({
		x: x - marginX,
		y: y - marginY,
		width: width + marginX * 2,
		height: height + marginY * 2,
	}),
	isBetween = (value, min, max) => value >= min && value <= max,
	isInRect = (
		{ x: sourceX, y: sourceY },
		{
			x: rectX, y: rectY, width: rectWidth, height: rectHeight
		}
	) => [
		isBetween(sourceX, rectX, rectX + rectWidth),
		isBetween(sourceY, rectY, rectY + rectHeight),
	].every(identity);

/**
 * Scrub bar implementation that shows playback progress and enables user-seeking
 *
 * @element vwc-scrub-bar
 *
 * @fires userScrubRequest - Fires while the user modifies the scrubber's knob location.
 * @fires userSkipForwardRequest - Fires when the user requests a skip forward
 * @fires userSkipBackwardsRequest - Fires when the user requests a skip backwards
 */
class VWCScrubBar extends HTMLElement {
	static get observedAttributes() { return ['noseek-button']; }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'noseek-button' && oldValue !== newValue) {
			this.trackEl.querySelector('button')?.style.display = newValue !== null ? 'none' : 'block';
		}
	}
	constructor() {
		super();

		// Local bus for collecting signals from the end-user/custom element api
		const
			apiBus = kefir.pool(),
			sendCustomEvent = sendCustomEventFactory(this);

		this[SIGNAL] = pipe(kefir.constant, apiBus.plug.bind(apiBus));

		// Set component's elemental structure
		const rootDoc = this.attachShadow({ mode: 'open' });
		let trackEl,
			ScrubberKnobEl,
			rootEl;

		const componentContent = (function () {
			const [style, div, button] = ['style', 'div', 'button'].map(tagName => partial(createTag, [tagName]));
			return [
				style({}, vwcScrubBarStyle.cssText),
				(rootEl = div({ tabindex: '-1' },
					(trackEl = div({}, (ScrubberKnobEl = button({ tabindex: '0', 'aria-label': 'Seek' })))))),
			];
		}());

		const rafStream = kefir.repeat(() => kefir.fromCallback(requestAnimationFrame)),
			componentConnectedStream = apiBus.filter(byType('component_connected')),
			mouseDownStream = kefir.fromEvents(rootDoc, 'mousedown'),
			keyPressStream = kefir.fromEvents(this, 'keydown'),
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
				['touchend', 'touchcancel'].map(eventName => kefir.fromEvents(window, eventName))
			),
			[mouseUpStream, mouseMoveStream, contextMenuStream, windowResizeStream] = [
				'mouseup',
				'mousemove',
				'contextmenu',
				'resize',
			].map(eventName => kefir.fromEvents(window, eventName)),
			trackBarEnabledProperty = componentConnectedStream
				.map(() => {
					// eslint-disable-next-line
					return !this.hasAttribute('noseek');
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
						...(({
							x, y, width, height
						}) => ({
							x, y, width, height
						}))(
							trackEl.getBoundingClientRect()
						),
					}))
					.filter(({ mouseX, mouseY, ...rect }) => isInRect(
						{ x: mouseX, y: mouseY },
						addRectMargin({ marginY: TRACK_VERTICAL_RESPONSIVITY_MARGIN }, rect)
					))
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
													.map(({ touches }) => Array.from(touches).find(
														({ identifier: currentIdentifier }) => currentIdentifier === touchIdentifier
													))
													.filter(Boolean),
											])
											// eslint-disable-next-line
											.map(({ clientX: mouseX, clientY: mouseY }) => ({ mouseX, mouseY })),
									])
									.map(
										pipe(
											prop('mouseX'),
											clamp(
												rectX + TRACK_KNOB_HORIZONTAL_MARGIN,
												rectX + rectWidth - TRACK_KNOB_HORIZONTAL_MARGIN
											),
											pos => (pos - (rectX + TRACK_KNOB_HORIZONTAL_MARGIN)) /
												(rectWidth - TRACK_KNOB_HORIZONTAL_MARGIN * 2)
										)
									)
									.takeUntilBy(
										kefir
											.merge([
												mouseUpStream,
												contextMenuStream,
												touchEndStream.filter(({ changedTouches }) => Array.from(changedTouches)
													.map(prop('identifier'))
													.includes(touchIdentifier)),
											])
											.take(1)
									)
									.map(position => ({ type: 'position_change', position })),
								kefir.constant({ type: 'end' }),
							]);
						}
					);

				const userScrubInteractionProperty = kefir
					.merge(
						['start', 'end'].map(eventType => userScrubStream
							.filter(byType(eventType))
							.map(always(eventType === 'start')))
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
									val => val
								)
								.flatMapLatest(value => rafStream.take(1).map(always(value)))
								.map(position => ({
									type: 'update_knob_position',
									value: position,
								})),
							apiPositionProperty.skipDuplicates().map(percentage => ({
								type: 'update_progress_position',
								value: percentage,
							})),
							userScrubInteractionProperty.map(state => ({
								type: 'update_scrub_state',
								value: state,
							})),
							userScrubStream.filter(byType('position_change')).map(
								pipe(prop('position'), position => ({
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
			componentContent.forEach(el => rootDoc.appendChild(el));
		});

		trackBarEnabledProperty.onValue(
			enabled => (trackEl.style.display = enabled ? 'block' : 'none')
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
				percentage => (trackEl.style.backgroundImage = `linear-gradient(90deg, ${TRACK_ACTIVE_COLOR} 0%, ${TRACK_ACTIVE_COLOR} ${
					(!isNaN(percentage) ? percentage : 0) * 100
				}%, ${TRACK_INACTIVE_COLOR} ${
					(!isNaN(percentage) ? percentage : 0) * 100
				}%, ${TRACK_INACTIVE_COLOR} 100%)`)
			);

		trackBarStream
			.filter(byType('update_scrub_state'))
			.map(prop('value'))
			.onValue(scrub => rootEl.classList.toggle('scrub', scrub));

		// Send user scrub event
		trackBarStream
			.filter(byType('update_user_scrub_request'))
			.map(prop('value'))
			.onValue(partial(sendCustomEvent, ['userScrubRequest']));

		// Send user skip events
		keyPressStream
			.map(prop('key'))
			.filter(keyCode => [KEY_LEFT, KEY_RIGHT].includes(keyCode))
			.onValue((keyCode) => {
				sendCustomEvent(({
					[KEY_LEFT]: 'userSkipBackwardsRequest',
					[KEY_RIGHT]: 'userSkipForwardRequest'
				})[keyCode]);
			});

		this.trackEl = trackEl;
	}

	/**
	 * Sets the scrubber's position
	 * @param {number} position - The relative position of the scrubber (a value between 0-1).
	 **/
	setPosition(position: number): void {
		this[SIGNAL]({ type: 'set_position', value: position });
	}

	connectedCallback(): void {
		this[SIGNAL]({ type: 'component_connected' });
	}

	disconnectedCallback(): void {
		this[SIGNAL]({ type: 'component_disconnected' });
	}
}

export { VWCScrubBar };
customElements.define('vwc-scrub-bar', VWCScrubBar);
