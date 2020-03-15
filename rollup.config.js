import { createDefaultConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

export default createDefaultConfig({
  input: './src/button/src/button.ts',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [typescript({ lib: ['es5', 'es6', 'dom'], target: 'es5' })],
});
