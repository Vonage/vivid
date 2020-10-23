import {
	getBaseVarNames,
	getSchemeFiles,
	getSchemeVariables,
} from '../../../test/style-utils.js';

const MUST_DIFFER = ['base', 'surface', 'primary'];

describe('design tokens service', () => {
	describe('scheme design tokens', () => {
		it('should have scheme design tokens generated', async () => {
			const EXPECTED_MATRIX = [
				'dark/alternate.scss',
				'dark/base.scss',
				'light/alternate.scss',
				'light/base.scss',
			];
			const schemeFiles = getSchemeFiles();
			expect(Object.keys(schemeFiles).sort()).eql(EXPECTED_MATRIX);
			Object.keys(schemeFiles).forEach((sf) => {
				expect(schemeFiles[sf]).exist.and.not.empty;
			});
		});

		it("should have symmetric variables number in each scheme's **base** variables", async () => {
			const schemeVariables = getSchemeVariables();
			Object.values(schemeVariables)
				.map((schemeVars) => Object.keys(schemeVars).length)
				.reduce((result, schemeVarsLength) => {
					if (result) {
						expect(schemeVarsLength).equal(result);
					} else {
						return schemeVarsLength;
					}
				}, null);
		});

		it('should have symmetric variables the base schemes', async () => {
			const testSet = {};
			const schemeVariables = getSchemeVariables();
			Object.keys(schemeVariables)
				.filter((schemeName) => schemeName.includes('base'))
				.forEach((schemeName) => {
					Object.keys(schemeVariables[schemeName]).forEach((cssVarName) => {
						const set = testSet[cssVarName] || (testSet[cssVarName] = new Set());
						set.add(schemeName);
					});
				});

			expect(Object.values(testSet)).not.empty;
			const expectedCount = Object.values(testSet)[0].size;
			expect(expectedCount).greaterThan(0);
			Object.values(testSet).forEach((set) =>
				expect(set.size).equal(expectedCount)
			);
		});

		//	we have a matrix of schemes and flavors: each scheme hase 2 flavors (base/alternate)
		//	this test checks that flavors are distinct withing each scheme, eg:
		//	- light: base != alternate
		//	- dark: base != alternate
		it('should have differing values in different flavors (base/alternate) per scheme', async () => {
			const schemeVariables = getSchemeVariables();
			const flavorsListByScheme = {};
			for (const key in schemeVariables) {
				const scheme = key.split('/')[0];
				const list =
					flavorsListByScheme[scheme] || (flavorsListByScheme[scheme] = []);
				list.push(schemeVariables[key]);
			}
			assertListsOfDistinct(flavorsListByScheme);
		});

		//	we have a matrix of schemes and flavors: each scheme hase 2 flavors (base/alternate)
		//	this test checks that schemes are distinct from each other while comparing the same flavor, eg:
		//	- base: light != dark != ...
		//	- alternate: light != dark != ...
		it('should have differing values in different schemes (light/dark/...) per flavor', async () => {
			const schemeVariables = getSchemeVariables();
			const schemesListByFlavor = {};
			for (const key in schemeVariables) {
				const flavor = key.split('/')[1];
				const list =
					schemesListByFlavor[flavor] || (schemesListByFlavor[flavor] = []);
				list.push(schemeVariables[key]);
			}
			assertListsOfDistinct(schemesListByFlavor);
		});
	});
});

function assertListsOfDistinct(setOfLists) {
	for (const list of Object.values(setOfLists)) {
		const numOfItems = list.length;
		for (const item in list[0]) {
			if (MUST_DIFFER.some((md) => item.includes(md))) {
				const checkSet = new Set(list.map((sf) => sf[item]));
				expect(checkSet.size).equal(numOfItems);
			}
		}
	}
}
