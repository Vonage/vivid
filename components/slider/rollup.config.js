import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
	external: ['tslib', '@vonage/vvd-core', 'lit-element', '@material/mwc-slider'],
	plugins: [
		cleaner({
			targets: ['components/slider/dist']
		}),
		terser(),
		copy({
			targets: [
				{ src: 'components/slider/*.d.ts', dest: 'components/slider/dist' },
			]
		})
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