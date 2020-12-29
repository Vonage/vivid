export { CONTEXT_PROVIDING_ELEMENTS, DEVIATIVE_ELEMENTS };

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
