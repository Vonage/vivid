import '../vwc-media-controller';
import kefir from "kefir";

const
	CENTER_Y = 8,
	TRACK_X = 37,
	TRACK_X_MARGIN = 5,
	BUTTON_X = 6,
	PERCENTAGE_TOLERANCE = 2,
	RESPONSE_TIMEOUT = 100; //ms

const setStyle = (el, style = {})=> {
	return Object.entries(style).reduce((el, [k, v])=> { el.style[k] = v; return el; }, el);
};

const simulateMouseFactory =
	({ x: baseX = 0, y: baseY = 0 })=> {

		let findTarget = (root = document, x, y)=> {
			let target = root.elementFromPoint(x, y);
			return !target
				? root
				: !target.shadowRoot
					? target
					: findTarget(target.shadowRoot, x, y);
		};

		//const deb = document.createElement('div');
		//setStyle(deb, { transition: "opacity 0.2s", opacity: 0, borderRadius: "10px", pointerEvents: "none", backgroundColor: "yellow", width: "10px", height: "10px", position: "fixed" });
		//document.body.append(deb);

		return ( x, y , eventType, options = { bubbles: true, composed: true }) => {
			let
				targetX = baseX + x,
				targetY = baseY + y;

			/*setStyle(deb, { opacity: 1, "left": targetX + "px", "top": targetY + "px" });
			setTimeout(function(){
				setStyle(deb, { opacity: 0 });
			}, 1200);*/

			findTarget(document, targetX, targetY)
				.dispatchEvent(new MouseEvent(eventType, {
					clientX: targetX,
					clientY: targetY,
					...options
				}));
		}
	};

describe.only('vwc-media-controller', function(){

	describe('Custom Component', function(){
		it('Should register as a custom element', function(){
			assert.exists(customElements.get(`vwc-media-controller`, 'vwc-media-controller element is not defined'));
		});
	});

	describe(`Component Interaction`, function(){

		const controllerEl = setStyle(
			document.createElement('vwc-media-controller'),
			{
				"position": "fixed",
				"bottom": 0,
				"left": 0,
				"width": "100%"
			});

		document.body.appendChild(controllerEl);
		const
			{ x: componentX, y: componentY, width: componentWidth } = controllerEl.getBoundingClientRect(),
			simulateMouse = simulateMouseFactory({ x: componentX, y: componentY });

		it('Should emit an event when clicking play/pause ', function(){
			return new Promise((resolve, reject)=> {
				controllerEl.addEventListener('userPlayPauseRequest', resolve);
				simulateMouse( BUTTON_X, CENTER_Y, 'mousedown');
				setTimeout( reject, RESPONSE_TIMEOUT, new Error('Play/pause button did not emit an event, make sure the layout\'s hasn\'t changed'))
			});
		});

		it('Should report userScrubRequest events when clicking the trackbar', function(){
			const SAMPLES = 10;
			return kefir
				.concat(
					Array(SAMPLES)
						.fill(0)
						.map((val, index)=> ({
							x: TRACK_X + TRACK_X_MARGIN + ((componentWidth - 5 - TRACK_X - TRACK_X_MARGIN * 2) / SAMPLES * index),
							y: CENTER_Y,
							expected: Math.floor(index / SAMPLES * 100)
						}))
						.map(({ x, y, expected })=> {
							return kefir.merge([
								kefir
									.fromEvents(controllerEl, 'userScrubRequest')
									.take(1)
									.flatMap(
										({ detail })=> {
											const got = Math.floor(detail * 100);
											return kefir[
												(got <= expected + PERCENTAGE_TOLERANCE && got >= expected - PERCENTAGE_TOLERANCE)
													? "constant"
													: "constantError"
												](new Error(`Wrong value returned, expected ${expected}, got ${got}`));
										}),
								kefir.later(RESPONSE_TIMEOUT).flatMap(()=> kefir.constantError('Did not receive a "userScrubRequest" event following a click on the trackbar')),
								kefir.fromCallback((cb)=> cb(["mousedown", "mouseup"].forEach((eventName)=> simulateMouse( x, y, eventName)))).ignoreValues()
							]).take(1).takeErrors(1)
						})
				)
				.takeErrors(1)
				.mapErrors((des)=> new Error(des))
				.toPromise();
		});
	});
});