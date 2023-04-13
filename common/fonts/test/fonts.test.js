import { init as initFonts } from '../vvd-fonts.js';
import { cleanFrame, getFrameLoadedInjected } from '../../../test/test-helpers.js';

const FONTS_SETUP_HTML_TAG = 'fontsSetupTest';

describe('vvd-fonts service', () => {
	it('should provide basic fonts API', async () => {
		assert.isFunction(initFonts, 'fonts has "init" method');
	});

	it('should provide the same Promise each new time after the initial run', async () => {
		const [r1, r2, r3] = await Promise.all([
			await initFonts(),
			await initFonts(),
			await (await import('../vvd-fonts.js')).init(),
		]);
		expect(r2).equal(r1);
		expect(r3).equal(r2);
	});
});
