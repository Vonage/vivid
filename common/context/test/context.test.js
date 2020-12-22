import vvdContext from '@vonage/vvd-context';
import {
	getFrameLoadedInjected,
	cleanFrame,
} from '../../../test/test-helpers.js';

const CONTEXT_SETUP_HTML_TAG = 'contextSetupTest';

describe('vvd-context service', () => {
	describe('negative API usage', () => {
		const illegalArgs = [null, {}, document.createElement('div')];

		for (const illegalArg of illegalArgs) {
			it(`should fail on illegal argument ${illegalArg}`, async () => {
				try {
					await vvdContext.install(illegalArg);
					expect.fail('should NOT get to this point');
				} catch (e) {
					expect(e).exist;
					expect(e.message.includes('target document expected')).true;
				}
			});
		}
	});

	describe('basic (default) document setup', () => {
		it('should setup context in default document', async () => {
			await getFrameLoadedInjected(CONTEXT_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;

				let e = iframeWindow.document.querySelector('.vivid-context-style');
				expect(e).null;

				await iframeWindow.vvdContext.install();

				e = iframeWindow.document.querySelector('.vivid-context-style');
				expect(e).exist;
				expect(e.nodeType).equal(Node.ELEMENT_NODE);
				expect(e.nodeName.toLowerCase()).equal('style');
				//	TODO: assert some basic styles appliance

				cleanFrame(CONTEXT_SETUP_HTML_TAG);
			});
		});

		it('should NOT duplicate context in default document', async () => {
			await getFrameLoadedInjected(CONTEXT_SETUP_HTML_TAG, async (iframe) => {
				const iframeWindow = iframe.contentWindow;

				await iframeWindow.vvdContext.install();
				const es1 = iframeWindow.document.querySelectorAll('.vivid-context-style');
				expect(es1.length).equal(1);

				await iframeWindow.vvdContext.install();
				const es2 = iframeWindow.document.querySelectorAll('.vivid-context-style');
				expect(es2.length).equal(1);

				expect(es1[0]).equal(es2[0]);

				cleanFrame(CONTEXT_SETUP_HTML_TAG);
			});
		});
	});

	describe('iframe document setup', () => {
		it('should setup context in iframe document', async () => {
			const iframe = await setupLocalIframe();
			const iframeWindow = iframe.contentWindow;

			let e = iframeWindow.document.querySelector('.vivid-context-style');
			expect(e).null;

			await vvdContext.install(iframe.contentWindow.document);

			e = iframeWindow.document.querySelector('.vivid-context-style');
			expect(e).exist;
			expect(e.nodeType).equal(Node.ELEMENT_NODE);
			expect(e.nodeName.toLowerCase()).equal('style');
			//	TODO: assert some basic styles appliance

			iframe.remove();
		});

		it('should NOT duplicate context in default document', async () => {
			const iframe = await setupLocalIframe();
			const iframeWindow = iframe.contentWindow;

			await vvdContext.install(iframe.contentWindow.document);
			const es1 = iframeWindow.document.querySelectorAll('.vivid-context-style');
			expect(es1.length).equal(1);

			await vvdContext.install(iframe.contentWindow.document);
			const es2 = iframeWindow.document.querySelectorAll('.vivid-context-style');
			expect(es2.length).equal(1);

			expect(es1[0]).equal(es2[0]);

			iframe.remove();
		});
	});

	describe('shadow root document setup', () => {
		it('should setup context in shadow root', async () => {
			const sr = document.createElement('div').attachShadow({ mode: 'open' });

			let e = sr.querySelector('.vivid-context-style');
			expect(e).null;

			await vvdContext.install(sr);

			e = sr.querySelector('.vivid-context-style');
			expect(e).exist;
			expect(e.nodeType).equal(Node.ELEMENT_NODE);
			expect(e.nodeName.toLowerCase()).equal('style');
			//	TODO: assert some basic styles appliance

			sr.host.remove();
		});

		it('should NOT duplicate context in default document', async () => {
			const sr = document.createElement('div').attachShadow({ mode: 'open' });

			await vvdContext.install(sr);
			const es1 = sr.querySelectorAll('.vivid-context-style');
			expect(es1.length).equal(1);

			await vvdContext.install(sr);
			const es2 = sr.querySelectorAll('.vivid-context-style');
			expect(es2.length).equal(1);

			expect(es1[0]).equal(es2[0]);

			sr.host.remove();
		});
	});
});

async function setupLocalIframe() {
	const r = document.createElement('iframe');
	let p = new Promise((resolve) => {
		r.onload = () => resolve(r);
	});
	document.body.appendChild(r);
	return p;
}
