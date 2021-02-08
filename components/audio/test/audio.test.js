import '@vonage/vwc-audio';

describe('vwc-audio', () => {
	it('should register as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-audio', 'vwc-audio element is not defined')
		);
	});

	it('should deliver method calls to Audio', async () => {
		let fail = [];
		let counter = 0;
		let _Audio = window.Audio;

		const failCheck = (message) => (val) => val || fail.push(message);
		const tests = {
			currentTimeSetter: failCheck(
				"currentTime setter wasn't called with right arg!"
			),
			currentTimeGetter: failCheck(''),
			play: failCheck(''),
			pause: failCheck(''),
		};

		const exp = (testId, res) => {
			tests[testId](res);
			counter++;
		};

		// eslint-disable-next-line
		const Audio = function () {};
		Audio.prototype = Object.assign(
			Object.create(null, {
				currentTime: {
					set(val) {
						exp('currentTimeSetter', val === 5);
					},
					get() {
						exp('currentTimeGetter', true);
						return 5;
					},
				},
			}),
			{
				// eslint-disable-next-line
				on: () => {},
				// eslint-disable-next-line
				off: () => {},
				pause: () => {
					exp('pause', true);
				},
				play: () => {
					exp('play', true);
				},
			}
		);

		window.Audio = Audio;
		const audio = document.createElement('vwc-audio');
		window.Audio = _Audio;
		audio.currentTime = 5;
		assert.equal(audio.currentTime, 5);
		audio.pause();
		audio.play();
		assert(
			fail.length === 0 && counter > Object.keys(tests).length,
			fail
				.concat(
					counter <= Object.keys(tests).length && 'Not all methods were called'
				)
				.join('\n')
		);
	});
});
