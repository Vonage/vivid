const DT_SCHEMES_BASE_PATH = 'common/design-tokens/build/scss/schemes',
	FIXTURES = window.__FIXTURES__;

describe.only('design tokens service', () => {
	describe('scheme design tokens', () => {
		before(function () {
			fixture.setBase(DT_SCHEMES_BASE_PATH);
		});

		it('should have scheme design tokens generated', () => {
			console.log(fixture.load('dark/base.scss'));
		});
	});
});
