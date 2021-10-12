import {
	getSchemeFiles,
	getSchemeVariables,
	PRINCIPAL_SCHEME_VARIABLES_FILTER,
} from '../../../test/style-utils.js';

import { render as elevationRender } from '../src/builders/elevation/render.js';

const ALTERNATE = 'alternate',
	MAIN = 'main';

describe.only('design tokens service', () => {
	describe(`elevations builder`, function () {
		let configurations = [];
		let ranBuildPlatformCount = 0;
		const styleDictionaryMock = {
			extend: function (config) {
				configurations.push(config);
				return () => {
					ranBuildPlatformCount++;
				};
			}
		};
		elevationRender(styleDictionaryMock);

		expect(ranBuildPlatformCount)
			.to
			.equal(2);
		expect(JSON.stringify(configurations))
			.to
			.equalSnapshot();
	});

	describe('scheme design tokens', () => {
		it('should have scheme design tokens generated', async () => {
			const EXPECTED_MATRIX = [
				`dark/${ALTERNATE}.scss`,
				`dark/${MAIN}.scss`,
				`light/${ALTERNATE}.scss`,
				`light/${MAIN}.scss`,
			];
			const schemeFiles = getSchemeFiles();
			expect(Object.keys(schemeFiles)
				.sort())
				.eql(EXPECTED_MATRIX);
			Object.keys(schemeFiles)
				.forEach((sf) => {
					expect(schemeFiles[sf]).exist.and.not.empty;
				});
		});

		it('should have symmetric variables number in each scheme\'s **base** variables', async () => {
			const schemeVariables = getSchemeVariables();
			Object.values(schemeVariables)
				.map(schemeVars => Object.keys(schemeVars).length)
				.reduce((result, schemeVarsLength) => {
					if (result) {
						expect(schemeVarsLength)
							.equal(result);
					} else {
						return schemeVarsLength;
					}
				}, null);
		});

		it('should have symmetric variables the base schemes', async () => {
			const testSet = {};
			const schemeVariables = getSchemeVariables();
			Object.keys(schemeVariables)
				.filter(schemeName => schemeName.includes(MAIN))
				.forEach((schemeName) => {
					Object.keys(schemeVariables[schemeName])
						.forEach((cssVarName) => {
							const set = testSet[cssVarName] || (testSet[cssVarName] = new Set());
							set.add(schemeName);
						});
				});

			expect(Object.values(testSet)).not.empty;
			const expectedCount = Object.values(testSet)[0].size;
			expect(expectedCount)
				.greaterThan(0);
			Object.values(testSet)
				.forEach(set => expect(set.size)
					.equal(expectedCount));
		});

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
			if (PRINCIPAL_SCHEME_VARIABLES_FILTER.test(item)) {
				const checkSet = new Set(list.map(sf => sf[item]));
				expect(checkSet.size)
					.equal(
						numOfItems,
						`${item} distinctness is not as expected`
					);
			}
		}
	}
}
