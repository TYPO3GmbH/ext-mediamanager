import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import postcssImport from 'postcss-import';
import postcssNano from 'cssnano';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

const config = {
  context: 'window',
  input: './bundle/index.ts',
  output: {
    dir: './dist/es',
    format: 'es',
    sourcemap: true,
    compact: true,
  },
  plugins: [
    postcss({
      plugins: [
        postcssImport,
        postcssNano
      ]
    }),
    postcssLit(),
    typescriptPlugin({
      importHelpers: false,
      typescript,
    }),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
    resolve({
      mainfields: ['module', 'browser', 'main', 'jsnext']
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    terser()
  ],
  treeshake: true,
};

export default config;

