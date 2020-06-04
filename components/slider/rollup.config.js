import { terser } from 'rollup-plugin-terser';

export default {
	plugins: [
		terser()
	],
	input: [
		'components/slider/vwc-slider.js'
	],
	output: {
		dir: 'components/slider/dist',
		format: 'es',
		compact: true
	}
};