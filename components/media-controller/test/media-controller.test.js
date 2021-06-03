import '../vwc-media-controller';
import kefir from 'kefir';
import { textToDomToParent, waitInterval } from '../../../test/test-helpers';

const CENTER_Y = 8,
	TRACK_X = 40,
	TRACK_X_MARGIN = 5,
	BUTTON_X = 6,
	PERCENTAGE_TOLERANCE = 2,
	RESPONSE_TIMEOUT = 200; //ms

const setStyle = (el, style = {}) => {
	// eslint-disable-next-line
	return Object.entries(style).reduce((el, [k, v]) => {
		el.style[k] = v;
		return el;
	}, el);
};

const simulateMouseFactory = ({ x: baseX = 0, y: baseY = 0 }) => {
	const getParentCount = (target, parentCount = 1) => {
		return target.parentElement
			? getParentCount(target.parentElement, parentCount + 1)
			: parentCount;
	};

	const findTarget = function (x, y) {
		const
			depths = new WeakMap(),
			scannedRoots = new Set(),
			scannedEls = new Set(),
			gatherEls = (root, depth = 0) => {
				scannedRoots.add(root);
				const els = [...root.elementsFromPoint(x, y)];

				els.forEach((el) => {
					depths.set(el, depth);
					scannedEls.add(el);
				});

				els
					.filter(el => el.shadowRoot && !scannedRoots.has(el.shadowRoot))
					.forEach(el => gatherEls(el.shadowRoot, depth + 1));
			};

		gatherEls(document);


		return [...scannedEls.values()]
			.filter(el => !el.shadowRoot)
			.sort((el1, el2) => depths.get(el1) * getParentCount(el1) - depths.get(el2) * getParentCount(el2))
			.reverse()[0];
	};

	return (x, y, eventType, options = { bubbles: true, composed: true }) => {
		let targetX = baseX + x,
			targetY = baseY + y;

		findTarget(targetX, targetY).dispatchEvent(
			new MouseEvent(eventType, {
				clientX: targetX,
				clientY: targetY,
				...options,
			})
		);
	};
};

describe('vwc-media-controller', function () {
	describe('Custom Component', function () {
		it('Should register as a custom element', function () {
			assert.exists(
				customElements.get(
					`vwc-media-controller`,
					'vwc-media-controller element is not defined'
				)
			);
		});
	});

	describe(`Component Interaction`, function () {
		let addedElements,
			controllerEl,
			componentX,
			componentY,
			componentWidth,
			simulateMouse;

		beforeEach(async function () {
			addedElements = textToDomToParent(
				'<vwc-media-controller></vwc-media-controller>'
			);
			controllerEl = addedElements[0];
			setStyle(controllerEl, {
				bottom: 0,
				left: 0,
				width: '200px',
				position: 'fixed',
			});
			await waitInterval(RESPONSE_TIMEOUT);
			const rect = controllerEl.getBoundingClientRect();
			componentX = rect.x;
			componentY = rect.y;
			componentWidth = rect.width;
			simulateMouse = simulateMouseFactory({ x: componentX, y: componentY });
		});

		afterEach(function () {
			addedElements.forEach(elm => elm.remove());
		});

		it('Should emit an event when clicking play/pause ', function () {
			return new Promise((resolve, reject) => {
				controllerEl.addEventListener('userPlayPauseRequest', resolve);
				simulateMouse(BUTTON_X, CENTER_Y, 'click');
				setTimeout(
					reject,
					RESPONSE_TIMEOUT,
					new Error(
						"Play/pause button did not emit an event, make sure the layout's hasn't changed"
					)
				);
			});
		});

		it('Should report userScrubRequest events when clicking the trackbar', function () {
			const SAMPLES = 10;
			return kefir
				.concat(
					Array(SAMPLES)
						.fill(0)
						.map((val, index) => ({
							x:
								TRACK_X +
								TRACK_X_MARGIN +
								((componentWidth - 5 - TRACK_X - TRACK_X_MARGIN * 2) / SAMPLES) * index,
							y: CENTER_Y,
							expected: Math.floor((index / SAMPLES) * 100),
						}))
						.map(({ x, y, expected }) => {
							return kefir
								.merge([
									kefir
										.fromEvents(controllerEl, 'userScrubRequest')
										.take(1)
										.flatMap(({ detail }) => {
											const got = Math.floor(detail * 100);
											return kefir[
												got <= expected + PERCENTAGE_TOLERANCE &&
												got >= expected - PERCENTAGE_TOLERANCE
													? 'constant'
													: 'constantError'
											](
												new Error(`Wrong value returned, expected ${expected}, got ${got}`)
											);
										}),
									kefir
										.later(RESPONSE_TIMEOUT)
										.flatMap(() => kefir.constantError(
											'Did not receive a "userScrubRequest" event following a click on the trackbar'
										)),
									kefir
										.fromCallback(cb => cb(
											['mousedown', 'mouseup'].forEach(eventName => simulateMouse(x, y, eventName))
										))
										.ignoreValues(),
								])
								.take(1)
								.takeErrors(1);
						})
				)
				.takeErrors(1)
				.mapErrors(des => new Error(des))
				.toPromise();
		});
	});
});
