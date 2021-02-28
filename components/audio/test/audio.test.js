import '@vonage/vwc-audio';
import { isolatedElementsCreation, textToDomToParent } from '../../../test/test-helpers';
import { VWCAudio } from '../vwc-audio';



describe.only('vwc-audio', () => {
	const addElements = isolatedElementsCreation();
	let AudioMock, audioEl;

	function resetAudioMock() {
		AudioMock = function() {
			audioEl = this;
		};
		AudioMock.prototype = Object.assign(
			AudioMock.prototype,
			{
				addEventListener: function addEventListener(event, cb) {
					if (!this.listeners) this.listeners = {};
					if (!this.listeners[event]) this.listeners[event] = [];
					this.listeners[event].push(cb);
				},
				removeEventListener: function() {

				},
				dispatchEvent: function({ type }) {
					if (!this.listeners[type]) return;
					this.listeners[type].forEach(cb => cb({}));
				},
				play: function() {

				},
				pause: function() {

				}
			}
		);
	}

	beforeEach(function() {
		resetAudioMock();

		window.Audio = AudioMock;
	});

	it('should register as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-audio', 'vwc-audio element is not defined')
		);
	});

	it(`should live in the DOM`, function() {
		const [audioElement] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
		expect(audioElement instanceof VWCAudio).to.eq(true);
	});


	it(`should set the noseek attribute on the controller noseek attribute is set`, function() {
		const url = 'asdfasdfasdf';
		const [actualElement] = addElements(textToDomToParent(`<vwc-audio noseek></vwc-audio>`));
		const controllerElement = actualElement.children[0];
		expect(controllerElement.getAttribute('noseek')).to.eq("");
	});

	describe(`userScrubRequest`, function() {
		it(`should respond to controller element userScrubRequest`, function() {
			const duration = 10;
			const scrubValue = Math.random();
			const expected = duration * scrubValue;


			const [audioElement] = addElements(textToDomToParent(`<vwc-audio></vwc-audio>`));
			const controllerElement = audioElement.children[0];
			audioEl.duration = duration;
			audioEl.dispatchEvent(new Event('canplay'));
			controllerElement.dispatchEvent(new CustomEvent('userScrubRequest', {detail: scrubValue}));
			expect(expected).to.equal(audioEl.currentTime);
		});
	});

	it('should deliver method calls to Audio', async () => {
		let pauseCalled = false, playCalled = false;
		AudioMock.prototype = Object.assign(
			AudioMock.prototype,
			{
				currentTime: {
					set: function(val) {
						this._time = val;
					},
					get: function() {
						return this._time;
					}
				},
				pause: () => {
					pauseCalled = true;
				},
				play: () => {
					playCalled = true;
				}
			});

		const audio = document.createElement('vwc-audio');

		audio.currentTime = 5;
		audio.pause();
		audio.play();
		assert.equal(audio.currentTime, 5);
		expect(audioEl.currentTime).to.equal(audio.currentTime);
		expect(playCalled).to.equal(true);
		expect(pauseCalled).to.equal(true);
	});
});
