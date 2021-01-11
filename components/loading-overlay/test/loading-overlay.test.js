import '../vwc-loading-overlay.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	isolatedElementsCreation,
	textToDomToParent,
	randomAlpha,
	waitNextTask,
	waitInterval,
} from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-loading-overlay';
const DISMISS_TRANSITION_TIME = 160;

describe('loading overlay', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				`${COMPONENT_NAME} element is not defined`
			)
		);
	});

	it('should have default internal contents when nothing slotted', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitInterval(200);
		expect(e).shadowDom.to.equalSnapshot();
	});

	it('should have custom internal contents when slotted (no default)', async () => {
		const [e] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME}><span>Loading...</span></${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		expect(e).shadowDom.to.equalSnapshot();
	});

	describe('behaviors', () => {
		it('should put an overlay and remove it by given timeout (no awaitees)', async () => {
			const id = randomAlpha();
			const [e] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} id="${id}" timeout="310"></${COMPONENT_NAME}>`
				)
			);
			const startTime = performance.now();
			expect(document.getElementById(id)).exist;
			await new Promise((resolve) => {
				e.addEventListener('dismissed', () => {
					const endTime = performance.now();
					expect(endTime - startTime)
						.gte(300 + DISMISS_TRANSITION_TIME)
						.lt(350 + DISMISS_TRANSITION_TIME);
					expect(document.getElementById(id)).not.exist;
					resolve();
				});
			});
		});

		it('should put an overlay and remove it when all awaitees done', async () => {
			const id = randomAlpha();
			const [e] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} id="${id}"></${COMPONENT_NAME}>`)
			);
			const startTime = performance.now();
			expect(document.getElementById(id)).exist;

			let done = new Promise((resolve) => {
				e.addEventListener('dismissed', () => {
					const endTime = performance.now();
					expect(endTime - startTime)
						.gte(400 + DISMISS_TRANSITION_TIME)
						.lt(450 + DISMISS_TRANSITION_TIME);
					expect(document.getElementById(id)).not.exist;
					resolve();
				});
			});

			e.waitFor([waitInterval(200), waitInterval(400)]);

			return done;
		});

		it('should put an overlay and remove it when all awaitees done (awaitees added dynamically)', async () => {
			const id = randomAlpha();
			const [e] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} id="${id}"></${COMPONENT_NAME}>`)
			);
			const startTime = performance.now();
			expect(document.getElementById(id)).exist;
			let done = new Promise((resolve) => {
				e.addEventListener('dismissed', () => {
					const endTime = performance.now();
					expect(endTime - startTime)
						.gte(300 + DISMISS_TRANSITION_TIME)
						.lt(350 + DISMISS_TRANSITION_TIME);
					expect(document.getElementById(id)).not.exist;
					resolve();
				});
			});

			e.waitFor(waitInterval(200));
			await waitInterval(100);
			e.waitFor(waitInterval(200));

			return done;
		});

		it('should put an overlay and remove it by given timeout (awaitees take too much)', async () => {
			const id = randomAlpha();
			const [e] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} id="${id}" timeout="310"></${COMPONENT_NAME}>`
				)
			);
			const startTime = performance.now();
			expect(document.getElementById(id)).exist;

			let done = new Promise((resolve) => {
				e.addEventListener('dismissed', () => {
					const endTime = performance.now();
					expect(endTime - startTime)
						.gte(300 + DISMISS_TRANSITION_TIME)
						.lt(350 + DISMISS_TRANSITION_TIME);
					expect(document.getElementById(id)).not.exist;
					resolve();
				});
			});

			e.waitFor(waitInterval(400));

			return done;
		});
	});
});
