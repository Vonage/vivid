import '../vwc-media-controller';
import { textToDomToParent, waitNextTask } from '../../../utils/js/test-helpers';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);
const COMPONENT_NAME = `vwc-media-controller-yonatan`;

function emulateMouseMove(clientX, clientY) {
	const mouseMoveEvent = new MouseEvent("mousemove", {bubbles: true, composed: true, clientX, clientY});
	document.dispatchEvent(mouseMoveEvent);
}

function startDragging(knobElement, clientX = 0, clientY = 0) {
	const mouseDownEvent = new MouseEvent("mousedown", {bubbles: true, composed: true, clientX, clientY});
	knobElement.dispatchEvent(mouseDownEvent);
}

function stopDragging(knobElement, clientX = 0, clientY = 0) {
	const mouseUpEvent = new MouseEvent("mouseup", {bubbles: true, composed: true});
	knobElement.dispatchEvent(mouseUpEvent);
}

function addFnCounter(target){
	const swap = target;
	function counter(){
		if (!this.count) this.count = 0;
		swap.apply(null, arguments);
		counter.count++;
		console.log(`Called ${swap.name} ${counter.count} times`);
	}

	counter.count = 0;
	return counter;
}

describe(`${COMPONENT_NAME}`, ()=>{
	let addedElements = [];
	let actualElement, scrubberElement, knobElement, clientX, clientY;

	beforeEach(function() {
		addedElements = textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`);
		actualElement = addedElements[0];
		scrubberElement = actualElement.shadowRoot.querySelector('.scrubber');
		knobElement = scrubberElement.querySelector('button');

		const {x, y} = scrubberElement.getBoundingClientRect();
		clientX = x;
		clientY = y;
	});

	afterEach(function() {
		addedElements.forEach(elm => elm.remove());
	});

	describe(`init`, function() {
		it('should register as a custom element', async ()=> {
			assert.exists(customElements.get(`${COMPONENT_NAME}`, 'vwc-media-controller element is not defined'));
		});

		it(`should have the DOM set`, async function() {
			await waitNextTask();
			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		});
	});

	describe(`userPlayPauseRequest`, function() {
		let button;
		beforeEach(function() {
			button = actualElement.shadowRoot.querySelector('.play-pause-control');
		});

		it(`should emit a userPlayPauseRequest event on play button click`, function() {
			let eventFired = false;

			actualElement.addEventListener('userPlayPauseRequest', _ => {
				eventFired = true;
			});

			button.click();

			expect(eventFired).to.equal(true);
		});
	});

	describe(`userScrubRequest`, function() {

		let padding, width;

		beforeEach(function() {
			padding = 7;
			scrubberElement.style.paddingRight = padding + 'px';
			scrubberElement.style.paddingLeft = 0 + 'px';
			width = scrubberElement.getBoundingClientRect().width;
		});

		it(`should emit a userScrubRequest event with ratio in event detail when user clicks on the slider`, function() {
			let detail;
			actualElement.addEventListener('userScrubRequest', (event) => {
				detail = event.detail;
			});

			startDragging(knobElement, clientX, clientY);

			expect(detail).to.equal(clientX / (width - padding));
		});

		it(`should emit a userScrubRequest event with ratio in event detail when user is dragging the scrub`, function() {
			const motionCoordinates = [
				10, 15, 20, 12, 177
			].map(x => clientX + x);
			const expectedDetails = motionCoordinates.map(x => x / (width - padding));

			const details = [];

			startDragging(knobElement, clientX, clientY);

			actualElement.addEventListener('userScrubRequest', (event) => {
				details.push(event.detail);
			});

			motionCoordinates.forEach((x) => emulateMouseMove(x, clientY));

			expect(details.length).to.equal(expectedDetails.length);
			expectedDetails.forEach((expectedResult, index) => expect(expectedResult).to.equal(details[index]));
		});

		it(`should move the knob while dragging`, function() {
			const motionCoordinates = [
				10, 15, 20
			].map(x => clientX + x);

			startDragging(knobElement, clientX, clientY);

			const knobPositions = [];
			actualElement.addEventListener('userScrubRequest', (event) => {
				knobPositions.push(knobElement.getBoundingClientRect().x);
			});

			motionCoordinates.forEach((x, index) => {
				emulateMouseMove(x, clientY)
			});

			motionCoordinates.forEach((expectedX, index) => {
				expect(expectedX).to.equal(knobPositions[index]);
			});

			stopDragging(knobElement);
		});

		it('should stop emitting userScrubRequest after mouseup event', function() {

			const stopDraggingIndex = 3;
			const motionCoordinates = [
				10, 15, 20, 12, 177
			].map(x => clientX + x);
			const expectedDetails = motionCoordinates
				.map(x => x / (width - padding))
				.filter((val, index) => index < stopDraggingIndex);

			startDragging(knobElement, clientX, clientY);

			const details = [];
			actualElement.addEventListener('userScrubRequest', (event) => {
				details.push(event.detail);
			});

			motionCoordinates.forEach((x, index) => {
				if (index === stopDraggingIndex) {
					stopDragging(knobElement);
				}
				emulateMouseMove(x, clientY)
			});

			expect(details.length).to.equal(expectedDetails.length);
			expectedDetails.forEach((expectedResult, index) => expect(expectedResult).to.equal(details[index]));
		});

		it(`should stop sending userScrubRequest when out of X bounds`, function() {
			function outOfBoundsValue() {
				return Math.random() * 10 + dispatchSlackness;
			}
			const scrubberFixedWidth = 20;
			const dispatchSlackness = 1;
			scrubberElement.style.width = `${scrubberFixedWidth}px`;

			const motionCoordinates = [31.915659635885948,33,38,53,58.533680876033436];
			// const motionCoordinates = [
			// 	0 - outOfBoundsValue(), 0, 5, scrubberFixedWidth, scrubberFixedWidth + outOfBoundsValue()
			// ].map(x => clientX + x);

			const expectedEventsCount = motionCoordinates.filter(x => x >= clientX && x <= clientX + scrubberFixedWidth).length; // only 0, 5 and scrubberFixedWidth

			startDragging(knobElement, clientX, clientY);

			let eventsSent = 0;
			actualElement.addEventListener('userScrubRequest', (event) => {
				eventsSent++;
			});

			motionCoordinates.forEach((x) => {
				emulateMouseMove(x, clientY);
			});

			expect(eventsSent, `Error: ${JSON.stringify(motionCoordinates)} triggered more events than expected`).to.equal(expectedEventsCount)
		});

		it(`should stop moving the knob while x position is outside the scrubber width`, function() {
			const scrubberFixedWidth = 20;
			scrubberElement.style.width = `${scrubberFixedWidth}px`;
			const motionCoordinates = [
				0 - Math.random() * 10, 0, 5, scrubberFixedWidth, scrubberFixedWidth + Math.random()*10
			].map(x => clientX + x);

			const expectedPositions = motionCoordinates.map(x => x < clientX ? clientX :
				x > clientX + scrubberFixedWidth ? clientX + scrubberFixedWidth : x);

			const knobPositions = [];

			startDragging(knobElement, clientX, clientY);

			motionCoordinates.forEach((x) => {
				emulateMouseMove(x, clientY);
				knobPositions.push(knobElement.getBoundingClientRect().x);
			});

			expectedPositions.forEach((expectedPosition, index) => expect(expectedPosition, `failed on index ${index}`).to.equal(knobPositions[index]));

		});
	});

	describe(`setPlayState`, function() {
		let button;
		beforeEach(function() {
			button = actualElement.shadowRoot.querySelector('.play-pause-control');
		});

		it(`should toggle the play button class "isPlayed"`, function() {
			const isPlayingOnStartup = button.classList.contains("isPlayed");
			actualElement.setPlayState(true);
			const isPlayingAfterSetPlayStateTrue = button.classList.contains("isPlayed");
			actualElement.setPlayState(false);
			const isNotPlayingAfterSetPlayStateTrue = button.classList.contains("isPlayed");

			expect(isPlayingOnStartup, 'Error: playing on startup').to.equal(false);
			expect(isPlayingAfterSetPlayStateTrue, 'Error: not playing after state change').to.equal(true);
			expect(isNotPlayingAfterSetPlayStateTrue, 'Error: still playing after state change to false').to.equal(false);
		});
	});

	describe(`setPosition`, function() {
		let knobElement, scrubberElement;
		beforeEach(function() {
			scrubberElement = actualElement.shadowRoot.querySelector('.scrubber');
			knobElement = scrubberElement.querySelector('button');
		});

		it(`should set the scrub position according to input in %`, function() {
			const { x: scrubberX, width: scrubberWidth } = scrubberElement.getBoundingClientRect();
			const setPositionValue = 50;
			const expectedKnobPosition = scrubberX + scrubberWidth * setPositionValue / 100;

			actualElement.setPosition(setPositionValue);

			expect(knobElement.getBoundingClientRect().x).to.equal(expectedKnobPosition);
		});

		it(`should set the knob according to the last setPosition value after user change`, function() {
			const { x: scrubberX, y: scrubberY, width: scrubberWidth } = scrubberElement.getBoundingClientRect();
			const setPositionValue = 50;
			const expectedKnobPosition = scrubberX + scrubberWidth * setPositionValue / 100;

			actualElement.setPosition(setPositionValue);

			startDragging(knobElement,  scrubberX + 3, scrubberY );

			stopDragging(knobElement,  scrubberX + 3, scrubberY);

			expect(knobElement.getBoundingClientRect().x).to.equal(expectedKnobPosition);
		});

	});

	describe(`cleanup`, function() {
		let originalAddEventListener, originalRemoveEventListener;
		const eventsCallbacks = {};

		before(function() {
			originalAddEventListener = Document.prototype.addEventListener;
			originalRemoveEventListener = Document.prototype.removeEventListener;
			Document.prototype.addEventListener = function(eventName, cb) {

				const counter = addFnCounter(cb)
				eventsCallbacks[eventName] = {
					counter,
					cb
				};

				originalAddEventListener(eventName, counter);
			}

			Document.prototype.removeEventListener = function(eventName, cb) {
				originalRemoveEventListener(eventName, eventsCallbacks[eventName].counter)
			}
		});

		after(() => {
			// Document.prototype.addEventListener = originalAddEventListener;
		});

		beforeEach(function() {
		});

		afterEach(function() {
		});
		it(`should remove all events set on the document and the window`, function() {
			const documentEvents = Object.keys(eventsCallbacks);
			const counts = documentEvents.map(eventName => eventsCallbacks[eventName].counter.count);

			startDragging(knobElement, )

			// remove the element from the DOM
			addedElements.forEach(elm => elm.remove());
			// enact the events on the document
			documentEvents.forEach(eventName => {
				const event = new MouseEvent(eventName, {bubbles: true, composed: true});
				document.dispatchEvent(event);
			});

			// expect that counts is the same
			documentEvents.map(eventName => eventsCallbacks[eventName].counter.count).forEach((val, index) => {
				expect(val).to.equal(counts[index]);
			})
		});
	});
});