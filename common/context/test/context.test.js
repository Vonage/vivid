import vvdContext from '@vonage/vvd-context';

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
					console.log(e.message);
					expect(e.message.includes('target document expected')).true;
				}
			});
		}
	});

	it('should work on empty argument (document as default)', async () => {});

	it('should work on arbitrary document argument', async () => {});

	it('should work on arbitrary shadow root argument', async () => {});
});
