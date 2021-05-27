import {
	getFrameLoadedInjected,
	cleanFrame,
	randomAlpha,
} from '../../../test/test-helpers.js';
import {
	getBaseVarNames,
	assertBaseVarsMatch,
	PRINCIPAL_SCHEME_VARIABLES_FILTER,
} from '../../../test/style-utils.js';

import schemeService from '../vvd-scheme.js';
import { getPreferedColorScheme } from '../os-sync.utils.js';

// const SYNC_WITH_OS = 'syncWithOSSettings',
const SCHEME_SETUP_HTML_TAG = 'schemeSetupTest';
const LIGHT = 'light';
const DARK = 'dark';

describe('vvd-scheme service', () => {
	/* eslint-disable no-undef */
	after(() => {
		cleanFrame(SCHEME_SETUP_HTML_TAG);
	});

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

	it('should init to default (LIGHT) when set to undefined', async () => {
		const autoScheme = LIGHT;
		// ! This is hardcoded to light instead of os settings due to:
		// ! 1. vivid packages aren't really supported by dark mode yet
		// ! 2. we still have no control over application scheme mode context
		// const autoScheme = getPreferedColorScheme();
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		await s.set();
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.equal(currentScheme, autoScheme);
		assert.equal(currentSchemeOption, LIGHT);

		await s.set(LIGHT);
	});

	it('should init to default (LIGHT) when set to null', async () => {
		const autoScheme = LIGHT;
		// ! This is hardcoded to light instead of os settings due to:
		// ! 1. vivid packages aren't really supported by dark mode yet
		// ! 2. we still have no control over application scheme mode context
		// const autoScheme = getPreferedColorScheme();
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		await s.set(null);
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.equal(currentScheme, autoScheme);
		assert.equal(currentSchemeOption, LIGHT);

		await s.set(LIGHT);
	});

	it('should init to the given argument', async () => {
		const newScheme = getPreferedColorScheme() === LIGHT ? DARK : LIGHT;
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		await s.set(newScheme);
		const currentScheme = s.getSelectedScheme();
		const currentSchemeOption = s.getSelectedSchemeOption();
		assert.equal(currentScheme, newScheme);
		assert.equal(currentSchemeOption, newScheme);

		await s.set(LIGHT);
	});

	it('should do nothing when set to the same argument', async () => {
		const sameScheme = getPreferedColorScheme();
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const r1 = await s.set(sameScheme);
		assert.equal(r1.option, sameScheme);
		assert.equal(r1.scheme, sameScheme);

		const r2 = await s.set(sameScheme);
		assert.equal(r2, r1);

		await s.set(LIGHT);
	});

	it('should do nothing when set to undefined and already post-init', async () => {
		const newScheme = getPreferedColorScheme() === LIGHT ? DARK : LIGHT;
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const r1 = await s.set(newScheme);
		assert.equal(r1.option, newScheme);
		assert.equal(r1.scheme, newScheme);

		const r2 = await s.set();
		assert.equal(r2, r1);

		await s.set(LIGHT);
	});

	it('should do nothing when set to null and already post-init', async () => {
		const newScheme = getPreferedColorScheme() === LIGHT ? DARK : LIGHT;
		const r = randomAlpha();
		const s = (await import(`../vvd-scheme.js?${r}`)).default;
		const r1 = await s.set(newScheme);
		assert.equal(r1.option, newScheme);
		assert.equal(r1.scheme, newScheme);

		const r2 = await s.set(null);
		assert.equal(r2, r1);
	});

	it('should install style element only once', async function () {
		this.timeout(8000);

		await getFrameLoadedInjected(SCHEME_SETUP_HTML_TAG, async (iframe) => {
			const iframeWindow = iframe.contentWindow;
			await Promise.all([
				iframeWindow.executeSetup('../vvd-scheme.js?instance=1'),
				iframeWindow.executeSetup('../vvd-scheme.js?instance=2'),
			]);
			const sseCount = iframe.contentDocument.querySelectorAll('.vvd-scheme-style')
				.length;
			expect(sseCount).equal(1);
		});
	});

	describe('variables setup functionality', () => {
		it('should have light variables set when light scheme set', async () => {
			const r = randomAlpha();
			const s = (await import(`../vvd-scheme.js?${r}`)).default;
			await s.set(LIGHT);
			assertBaseVarsMatch(LIGHT, PRINCIPAL_SCHEME_VARIABLES_FILTER);
		});

		it('should have dark variables set when dark scheme set', async () => {
			const r = randomAlpha();
			const s = (await import(`../vvd-scheme.js?${r}`)).default;
			await s.set(DARK);
			assertBaseVarsMatch(DARK, PRINCIPAL_SCHEME_VARIABLES_FILTER);

			await s.set(LIGHT);
		});

		it('should have different variables when move from light to dark', async () => {
			const testSet = {};
			const r = randomAlpha();
			const s = (await import(`../vvd-scheme.js?${r}`)).default;

			await s.set(DARK);
			getBaseVarNames(DARK, PRINCIPAL_SCHEME_VARIABLES_FILTER).forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key).trim();
				testSet[key] = new Set([varVal]);
			});

			await s.set(LIGHT);
			getBaseVarNames(LIGHT, PRINCIPAL_SCHEME_VARIABLES_FILTER).forEach((key) => {
				const varVal = getComputedStyle(document.body).getPropertyValue(key).trim();
				testSet[key].add(varVal);
			});

			expect(testSet).not.empty;
			Object.values(testSet).forEach(varSet => expect(varSet.size).equal(2));
		});
	});
});
