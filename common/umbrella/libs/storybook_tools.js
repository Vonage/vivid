import noop from 'lodash/fp/noop';
import { html } from 'lit-element';
import { asyncReplace } from 'lit-html/directives/async-replace';

export const createTimeline = function (frames) {
	let timers;
	const resetTimer = () => timers.forEach(clearTimeout);
	timers = frames.map(({ frameFunc, delay }) => setTimeout(frameFunc, delay));
	return resetTimer;
};

export const generateAsyncCallback = function () {
	const buffer = [];
	let releaseValue = noop;
	return [
		(payload) => {
			buffer.push(payload);
			releaseValue();
		},
		{
			[Symbol.asyncIterator]: () => ({
				next: () => {
					return Promise
						.resolve()
						.then(() => (!buffer.length ? new Promise(resolve => releaseValue = resolve) : Promise.resolve()))
						.then(() => buffer.shift())
						.then(value => ({ value, done: false }));
				}
			})
		}
	];
};

export const createUpdatableStory = function (updatableTemplate) {
	// firstArg and additionalArgs are used in order to prevent SB from displaying
	// "this story doesn't support controls" message (it checks func signature 🤷)
	return (firstArg, ...additionalArgs) => {
		const [requestUpdate, updateStream] = generateAsyncCallback();
		updatableTemplate(requestUpdate, firstArg, ...additionalArgs);
		return html`${asyncReplace(updateStream)}`;
	};
};
