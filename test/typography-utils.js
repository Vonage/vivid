const typographyCache = {};

export async function getTypographyStyle(category, typographyType = 'web') {
	if (!category || typeof category !== 'string') {
		throw new Error(`category parameter MUST be a non-empty string, got '${category}'`);
	}
	if (!(typographyType in typographyCache)) {
		const ttDefs = await fetchData(typographyType);
		for (const [tName, tVals] of Object.entries(ttDefs)) {
			ttDefs[tName] = Object.freeze(tVals);
		}
		typographyCache[typographyType] = Object.freeze(ttDefs);
	}
	const result = typographyCache[typographyType][category];
	if (!result) {
		throw new Error(`category '${category}' is missing in typography '${typographyType}'`);
	}
	return result;
}

async function fetchData(typographyType) {
	const response = await fetch(`base/packages/design-tokens/build/scss/typography-variables/${typographyType}.scss`);
	if (response.status !== 200) {
		throw new Error(`failed to fetch typography of type '${typographyType}', ${response.status} ${response.statusText}`);
	}
	const content = await response.text();
	if (!content) {
		throw new Error(`typography data fetched for '${typographyType}' is empty`);
	}
	return parseData(content);
}

function parseData(data) {
	const tmp = data
		.replace(/^[^\(]*\(/, '')
		.replace(/\)[^\)]*$/, '')
		.split(/\s\)[,\s]*\s/)
		.filter(category => category.trim())
		.map(category => category.trim().split(/\s*\:\s*\(/))
		.reduce((acc, cat) => {
			const catKey = cat[0].replace(/[^\w-]*/g, '');
			const catPairs = cat[1].split(/\s*,\s*/);
			acc[catKey] = catPairs.reduce((acc1, pair) => {
				const [key, val] = pair.split(/\s*\:\s*/);
				const propKey = key
					.replace(/[^\w-]*/g, '')
					.replace(/-(\w)/, (_whole, group) => group.toUpperCase());
				acc1[propKey] = val;
				return acc1;
			}, {});
			return acc;
		}, {});

	return tmp;
}