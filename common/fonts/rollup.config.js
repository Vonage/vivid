import { terser } from 'rollup-plugin-terser';

export default {
	plugins: [
		terser()
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