const DT_SCHEMES_BASE_PATH = 'common/design-tokens/build/scss/schemes/',
	FIXTURES = window.__FIXTURES__,
	MUST_DIFFER = ['base', 'surface', 'primary'];

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

		it('should have symmetric variables number in each scheme', async () => {
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

		it('should have differing values in different flavors same scheme', async () => {
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

		it('should have differing values in different schemes same flavors', async () => {
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

function getSchemeFiles() {
	return Object.entries(FIXTURES).reduce((result, [key, value]) => {
		if (key.startsWith(DT_SCHEMES_BASE_PATH)) {
			result[key.replace(DT_SCHEMES_BASE_PATH, '')] = value;
		}
		return result;
	}, {});
}

function getSchemeVariables() {
	const result = {};
	const schemeFiles = getSchemeFiles();
	Object.keys(schemeFiles).forEach((sf) => {
		const schemeKey = sf.replace(/\..+$/, '');
		result[schemeKey] = schemeFiles[sf]
			.replace(/^[^-]+/, '')
			.replace(/;[^;]+?$/, '')
			.split(';')
			.map((entry) => entry.trim().split(/\s*:\s*/))
			.reduce((result, [key, value]) => {
				result[key] = value;
				return result;
			}, {});
	});
	return result;
}

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
