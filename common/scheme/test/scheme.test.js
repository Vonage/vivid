import { randomAlpha } from '../../../test/test-helpers.js';
import schemeService from '../vvd-scheme.js';

describe('vvd-scheme service', () => {
	it('should provide basic set scheme API', async () => {
		assert.isObject(schemeService, 'imported "schemeService" is object');
		assert.isNotNull(schemeService, 'imported "schemeService" not null');
		assert.isFrozen(
			schemeService,
			'imported "schemeService" object should be frozen'
		);
		assert.isFunction(schemeService.set, 'schemeService has "set" method');
		assert.isFunction(
			schemeService.getSelectedScheme,
			'schemeService has "getSelectedScheme" method'
		);
		assert.isFunction(
			schemeService.getSelectedSchemeOption,
			'schemeService has "getSelectedSchemeOption" method'
		);
	});

	it('should NOT auto init schemes upon import', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.isUndefined(currentScheme);
		assert.isUndefined(currentSchemeOption);
	});

	it('should be able to init to default when set to undefined', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		await s.set();
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.equal(currentScheme, 'light');
		assert.equal(currentSchemeOption, 'syncWithOSSettings');
	});

	it('should be able to init to default when set to null', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		await s.set(null);
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.equal(currentScheme, 'light');
		assert.equal(currentSchemeOption, 'syncWithOSSettings');
	});

	it('should be able to init to the given argument', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		await s.set('dark');
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.equal(currentScheme, 'dark');
		assert.equal(currentSchemeOption, 'dark');
	});

	it('should do nothing when set to the same argument', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const r1 = await s.set('light');
		assert.equal(r1.option, 'light');
		assert.equal(r1.scheme, 'light');

		const r2 = await s.set('light');
		assert.equal(r2, r1);
	});

	it('should do nothing when set to undefined and already post-init', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const r1 = await s.set('light');
		assert.equal(r1.option, 'light');
		assert.equal(r1.scheme, 'light');

		const r2 = await s.set();
		assert.equal(r2, r1);
	});

	it('should do nothing when set to null and already post-init', async () => {
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const r1 = await s.set('light');
		assert.equal(r1.option, 'light');
		assert.equal(r1.scheme, 'light');

		const r2 = await s.set(null);
		assert.equal(r2, r1);
	});
});
