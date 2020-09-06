import { style } from './vwc-media-controller.css';

const USER_PLAY_TOGGLE_EVENT_NAME = 'userPlayPauseRequest';
const USER_SCRUB_EVENT_NAME = 'userScrubRequest';

function getPaddingX(element: HTMLElement) {
	return Number(window.getComputedStyle(element).paddingRight.replace('px', '')) +
		Number(window.getComputedStyle(element).paddingLeft.replace('px', ''));
}

function dispatchEvent(element: MediaController, eventName: string, payload: any) {
	element.dispatchEvent(new CustomEvent(eventName,
		{ bubbles: true, composed: true, detail: payload }
	));
}

function addPlaycontrolButton( parent: HTMLElement) {
	const playControlButton = document.createElement('button');
	playControlButton.className = 'play-pause-control';


	parent.appendChild(playControlButton);
	return playControlButton;
}

function setPlayButtonListener(element: MediaController, playControlButton: HTMLButtonElement) {
	playControlButton.addEventListener('click', () => {
		element.dispatchEvent(new Event(USER_PLAY_TOGGLE_EVENT_NAME));
	});
}

function addScrub(parent: HTMLElement) {
	const [scrubberEl, trackEl] = [1, 2].map(() => document.createElement('div'));
	const knobEl = document.createElement('button');

	knobEl.tabIndex = 0;
	scrubberEl.appendChild(trackEl);
	scrubberEl.appendChild(knobEl);
	scrubberEl.className = 'scrubber';
	scrubberEl.style.width = '100%';
	parent.appendChild(scrubberEl);

	return scrubberEl;
}

function moveKnob(knobElement: HTMLElement, scrubElement: HTMLDivElement, targetPosition: number) {
	const {width, x: scrubberX} = scrubElement.getBoundingClientRect();
	const actualWidth = width - getPaddingX(scrubElement);
	let hasPositionChanged = true;
	let newKnobPositionX = targetPosition - scrubberX;

	if (newKnobPositionX < 0) {
		newKnobPositionX = 0;
		hasPositionChanged = false;
	} else if (newKnobPositionX > actualWidth) {
		newKnobPositionX = actualWidth;
		hasPositionChanged = false;
	}

	knobElement.style.transform = `translate(${newKnobPositionX}px, -50%)`;

	return hasPositionChanged;
}

interface ListenerCallback {
	event: string;
	cb: any;
}

class MediaController extends HTMLElement {

	#_currentPosition = 0;
	#_playButtonElement: HTMLButtonElement;
	#_scrubElement: HTMLDivElement;
	#_knobElement: HTMLButtonElement | null;
	#_initComplete = false;
	#_eventsToClear: ListenerCallback[] = [];
	#_isDragging = false;

	constructor() {
		super();

		const root = this.attachShadow({ mode: 'open' });

		const componentRootEl = document.createElement('div');
		componentRootEl.className = 'component';
		root.appendChild(componentRootEl);

		this.#_playButtonElement = addPlaycontrolButton(componentRootEl);
		this.#_scrubElement = addScrub(componentRootEl);
		this.#_knobElement = this.#_scrubElement.querySelector('button');

		const baseStyle = document.createElement('style');
		baseStyle.innerHTML = style.cssText;
		root.appendChild(baseStyle);
	}

	/**
	 * Sets the scrubber's position
	 * @param {number} position - The relative position of the scrubber (a value between 0-1).
	 **/
	setPosition(position:number):void {
		this.#_currentPosition = position;
		if (this.#_knobElement && !this.#_isDragging) {
			moveKnob(this.#_knobElement, this.#_scrubElement, this.knobPosition);
		}
	}

	get knobPosition(): number {
		const scrubberElement = this.#_scrubElement;
		const { x, width } = scrubberElement.getBoundingClientRect();

		return x + (this.#_currentPosition * width / 100);
	}

	/**
	 * Sets the component's play state
	 * @param {boolean} isPlaying - A boolean stating whether the component is playing or not (displayed pause/play buttons respectively).
	 **/
	setPlayState(isPlaying:boolean):void {
		this.#_playButtonElement.classList.toggle('isPlayed', isPlaying);
	}

	disconnectedCallback() {
		this.#_initComplete = false;
		this.#_eventsToClear.forEach(evt => {
			document.removeEventListener(evt.event, evt.cb);
		});
	}

	connectedCallback() {
		setPlayButtonListener(this, this.#_playButtonElement);
		this._setScrubListeners();
		this.#_initComplete = true;
	}

	_setScrubListeners() {
		const knobMove = (event: MouseEvent, eventName = USER_SCRUB_EVENT_NAME) => {
			if (!knob) {
				return;
			}

			if (!this.#_isDragging) {
				moveKnob(knob, scrubElement, this.knobPosition);
				return;
			}

			const mousePositionX = event.clientX;

			const hasPositionChanged = moveKnob(knob, scrubElement, mousePositionX);

			if (hasPositionChanged) {
				const {width} = scrubElement.getBoundingClientRect();
				const actualWidth = width - getPaddingX(scrubElement);
				const positionRatio = mousePositionX / actualWidth;
				dispatchEvent(this, eventName, positionRatio);
			}
		}

		const mouseDownHandler = (event: MouseEvent) => {
			this.#_isDragging = true;
			knobMove(event);
			document.addEventListener('mouseup', mouseUpHandler);
			document.addEventListener('mousemove', knobMove);
		}

		const mouseUpHandler = (event: MouseEvent) => {
			if (!this.#_isDragging) {
				return;
			}
			this.#_isDragging = false;
			knobMove(event);
			document.removeEventListener('mousemove', knobMove);
			document.removeEventListener('mouseup', mouseUpHandler);
		};

		if (this.#_initComplete) {
			return;
		}

		const knob = this.#_knobElement;
		const scrubElement = this.#_scrubElement;

		scrubElement.addEventListener('mousedown', mouseDownHandler);

		this.#_eventsToClear.push({
			event: 'mouseup',
			cb: mouseUpHandler
		});

		this.#_eventsToClear.push({
			event: 'mousemove',
			cb: knobMove
		});
	}
}

export default MediaController;
customElements.define('vwc-media-controller-yonatan', MediaController);