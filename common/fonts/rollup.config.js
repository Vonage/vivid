import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
	plugins: [
		cleaner({
			targets: ['common/fonts/dist']
		}),
		terser(),
		copy({
			targets: [
				{ src: 'common/fonts/src/fonts', dest: 'common/fonts/dist' },
				{ src: 'common/fonts/src/vvd-fonts.css', dest: 'common/fonts/dist' }
			]
		})
	],
	input: [
		'common/fonts/vvd-fonts.js'
	],
	output: {
		dir: 'common/fonts/dist',
		format: 'es',
		compact: true
	}
};