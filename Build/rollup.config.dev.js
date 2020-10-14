import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';

import postcssImport from 'postcss-import';

import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

const globby = require('globby');

const configs = globby.sync('(packages|test)/**/*.(ts|pcss)').map(inputFile => ({
  input: inputFile,
  inlineDynamicImports: true,
  output: {
    file: 'out-tsc/' + inputFile.replace('.ts', '.js'),
    format: 'esm',
    sourcemap: false
  },
  plugins: [
    postcss({
      plugins: [
        postcssImport
      ]
    }),
    postcssLit(),
    typescriptPlugin({
      importHelpers: true,
      typescript,
    })
  ],
  treeshake: true,
}));

module.exports = configs

