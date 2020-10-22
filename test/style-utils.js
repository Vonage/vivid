export function borderRadiusStyles(expectedRadius) {
	return {
		borderTopLeftRadius: `${expectedRadius}px`,
		borderTopRightRadius: `${expectedRadius}px`,
		borderBottomLeftRadius: `${expectedRadius}px`,
		borderBottomRightRadius: `${expectedRadius}px`,
	};
}

export const body1TypographyStyles = {
	fontFamily: 'SpeziaWebVariable',
	fontSize: '16px',
	fontWeight: '400',
	fontStretch: '50%',
	// lineHeight: '18.4px',
	// letterSpacing: '0.15px',
	textTransform: 'none',
}

export const body2TypographyStyles = {
	fontFamily: 'SpeziaWebVariable',
	fontSize: '14.2222px',
	fontWeight: '400',
	fontStretch: '50%',
	// lineHeight: 'normal',
	// letterSpacing: '0.133333px',
	textTransform: 'none',
}

export const captionTypographyStyles = {
	fontFamily: 'SpeziaWebVariable',
	fontSize: '12.642px',
	fontWeight: '400',
	fontStretch: '50%',
	// lineHeight: '18.4px',
	// letterSpacing: '0.119',
	textTransform: 'none',
}

export function getSchemeFiles() {
	const DT_SCHEMES_BASE_PATH = 'common/design-tokens/build/scss/schemes/';
	return Object.entries(window.__FIXTURES__).reduce((result, [key, value]) => {
		if (key.startsWith(DT_SCHEMES_BASE_PATH)) {
			result[key.replace(DT_SCHEMES_BASE_PATH, '')] = value;
		}
		return result;
	}, {});
}

export function getSchemeVariables() {
	const result = {};
	const schemeFiles = getSchemeFiles();
	Object.keys(schemeFiles).forEach((sf) => {
		const schemeKey = sf.replace(/\..+$/, '');
		result[schemeKey] = schemeFiles[sf]
			.replace(/^[^-]+/, '')
			.replace(/;[^;]+?$/, '')
			.split(';')
			.map((entry) => entry.trim().split(/\s*:\s*/))
			.reduce((r, [key, value]) => {
				r[key] = value;
				return r;
			}, {});
	});
	return result;
}

export function getBaseVarNames(scheme) {
	const BASE_VARIABLES = ['base', 'surface', 'primary'];
	const baseSchemeSet = getSchemeVariables()[`${scheme}/base`];
	return Object.keys(baseSchemeSet).filter((key) =>
		BASE_VARIABLES.some((baseVar) => key.includes(baseVar))
	);
}
