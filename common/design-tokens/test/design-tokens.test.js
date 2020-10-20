const DT_SCHEMES_BASE_PATH = 'common/design-tokens/build/scss/schemes',
	FIXTURES = window.__FIXTURES__;

describe.only('design tokens service', () => {
	describe('scheme design tokens', () => {
		it('should have scheme design tokens generated', async () => {
			console.log(Object.keys(FIXTURES));
		});
	});
});
