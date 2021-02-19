export {
	CONTEXT_PROVIDING_ELEMENTS,
	DEVIATIVE_ELEMENTS,
	PADDING_DEFINITIONS,
	MARGIN_DEFINITIONS
};

const CONTEXT_PROVIDING_ELEMENTS = {
	h1: 'headline-1',
	h2: 'headline-2',
	h3: 'title-1',
	h4: 'title-2',
	h5: 'subtitle-1',
	h6: 'subtitle-2',
	div: 'body-1',
	p: 'body-1',
};

const PADDING_DEFINITIONS = {
	h1: ['0px', '0px', '0px', '0px'],
	h2: ['0px', '0px', '0px', '0px'],
	h3: ['0px', '0px', '0px', '0px'],
	h4: ['0px', '0px', '0px', '0px'],
	h5: ['0px', '0px', '0px', '0px'],
	h6: ['0px', '0px', '0px', '0px'],
};

const MARGIN_DEFINITIONS = {
	h1: ['48px', '0px', '48px', '0px'],
	h2: ['48px', '0px', '48px', '0px'],
	h3: ['40px', '0px', '40px', '0px'],
	h4: ['40px', '0px', '40px', '0px'],
	h5: ['40px', '0px', '40px', '0px'],
	h6: ['40px', '0px', '40px', '0px'],
};

const DEVIATIVE_ELEMENTS = [
	{
		name: 'mono-style',
		elements: ['code', 'kbd', 'samp'],
		deviations: {
			fontFamily: 'SpeziaMonoWebVariable, monospace',
		},
	},
	{
		name: 'bold-style',
		elements: ['b', 'strong'],
		deviations: {
			fontWeight: '600',
		},
	},
	{
		name: 'underline-style',
		elements: ['a'],
		deviations: {
			textDecoration: 'underline',
		},
	},
];
