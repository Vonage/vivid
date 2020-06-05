import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';

export default {
	plugins: [
		cleaner({
			targets: ['components/slider/dist']
		}),
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