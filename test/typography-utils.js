const typographyCache = {};

export async function getTypographyStyle(category) {
	if (!category || typeof category !== 'string') {
		throw new Error(`category parameter MUST be a non-empty string, got '${category}'`);
	}

	if (category in typographyCache) {
		return typographyCache[category];
	}

	const response = await fetch(`base/common/design-tokens/build/scss/typography-variables/_${category}.scss`);
	if (response.status !== 200) {
		throw new Error(`failed to fetch typography styles for '${category}', ${response.status} ${response.statusText}`);
	}

	const content = await response.text();
	if (!content) {
		throw new Error(`typography data fetched for '${category}' is empty`);
	}

	const typographyData = content
		.split(';')
		.filter(part => part.includes('--vvd-typography-'))
		.map(part => part.replace(/^[\s\S\.]*--vvd-typography-/, '').split(/\s*:\s/))
		.reduce((acc, [k, v]) => {
			const key = k.replace(/-(\w)/g, (_v, v1) => v1.toUpperCase());
			acc[key] = v;
			return acc;
		}, {});

	typographyCache[category] = typographyData;
	return typographyData;
}