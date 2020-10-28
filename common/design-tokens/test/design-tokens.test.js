import {
	getSchemeFiles,
	getSchemeVariables,
	PRINCIPAL_VARIABLES_FILTER,
} from '../../../test/style-utils.js';

const ALTERNATE = 'alternate',
	BASE = 'base';

describe('design tokens service', () => {
	describe('scheme design tokens', () => {
		it('should have scheme design tokens generated', async () => {
			const EXPECTED_MATRIX = [
				`dark/${ALTERNATE}.scss`,
				`dark/${BASE}.scss`,
				`light/${ALTERNATE}.scss`,
				`light/${BASE}.scss`,
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
				.filter((schemeName) => schemeName.includes(BASE))
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

		//	we have a matrix of schemes and flavors: each scheme hase 2 flavors (base/alternate)
		//	this test checks that alternate flavor has ONLY a DISTINCT props from base
		// it('should have differing values in different flavors (base/alternate) per scheme', async () => {
		// 	const schemeVariables = getSchemeVariables();
		// 	let totalAlternatesTested = 0;
		// 	for (const key in schemeVariables) {
		// 		const [scheme, flavor] = key.split('/');
		// 		if (flavor === ALTERNATE) {
		// 			totalAlternatesTested++;
		// 			const altSet = schemeVariables[key];
		// 			const baseSet = schemeVariables[`${scheme}/${BASE}`];
		// 			expect(altSet).exist;
		// 			expect(baseSet).exist;
		// 			const altKeys = Object.keys(altSet);
		// 			expect(altKeys).not.empty;
		// 			altKeys.forEach((altKey) => {
		// 				expect(altKey in baseSet).true;
		// 				expect(
		// 					baseSet[altKey],
		// 					`${altKey} NOT equal or not present in alt`
		// 				).not.equal(altSet[altKey]);
		// 			});
		// 		}
		// 	}
		// 	expect(totalAlternatesTested).greaterThan(0);
		// });

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
	});
});

function assertListsOfDistinct(setOfLists) {
	for (const list of Object.values(setOfLists)) {
		const numOfItems = list.length;
		for (const item in list[0]) {
			if (PRINCIPAL_VARIABLES_FILTER.test(item)) {
				const checkSet = new Set(list.map((sf) => sf[item]));
				expect(checkSet.size).equal(
					numOfItems,
					`${item} distinctness is not as expected`
				);
			}
		}
	}
}
