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
	playControlButton.id = 'playControl';

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

function setScrubListeners(element: MediaController, scrubElement: HTMLDivElement) {
	function knobMove(event: MouseEvent, eventName = USER_SCRUB_EVENT_NAME) {
		const {width, x: scrubberX} = scrubElement.getBoundingClientRect();
		const actualWidth = width - getPaddingX(scrubElement);
		let mousePositionX = event.clientX;
		const shouldNotDispatchEvent = ((mousePositionX + 1) < scrubberX || (mousePositionX - 1) > scrubberX + actualWidth)
		if (!shouldNotDispatchEvent && (mousePositionX < 0 || mousePositionX > scrubberX)) {
			debugger
		};

		mousePositionX < scrubberX ? mousePositionX = scrubberX :
			mousePositionX > scrubberX + actualWidth ? mousePositionX = scrubberX + actualWidth : '';

		const positionRatio = mousePositionX / actualWidth;
		knob ? knob.style.transform = `translate(${mousePositionX}px)` : '';

		if (!shouldNotDispatchEvent) {
			dispatchEvent(element, eventName, positionRatio);
		}
	}

	const knob = scrubElement.querySelector('button');

	knob?.addEventListener('mousedown', () => {
		document.addEventListener('mousemove', knobMove);
	});

	knob?.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', knobMove);
	});

	scrubElement.addEventListener('click', (event) => {
		knobMove(event, USER_SCRUB_EVENT_NAME);
	});
}

class MediaController extends HTMLElement {

	constructor() {
		super();

		const root = this.attachShadow({ mode: 'open' });

		const componentRootEl = document.createElement('div');
		componentRootEl.className = 'component';
		root.appendChild(componentRootEl);

		const playerButton = addPlaycontrolButton(componentRootEl);
		setPlayButtonListener(this, playerButton);

		const scrubElement = addScrub(componentRootEl);
		setScrubListeners(this, scrubElement);
	}

	/**
	 * Sets the scrubber's position
	 * @param {number} position - The relative position of the scrubber (a value between 0-1).
	 **/
	setPosition(position:number):void {
		console.log(position);
	}

	/**
	 * Sets the component's play state
	 * @param {boolean} isPlaying - A boolean stating whether the component is playing or not (displayed pause/play buttons respectively).
	 **/
	setPlayState(isPlaying:boolean):void {
		console.log(isPlaying);
	}

	connectedCallback(): void {
	}

	disconnectedCallback(): void {
	}
}

export default MediaController;
customElements.define('vwc-media-controller-yonatan', MediaController);