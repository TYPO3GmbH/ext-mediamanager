import litSass from '@ponday/rollup-plugin-lit-sass';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

const globby = require('globby');

const configs = globby.sync('(packages|test)/**/*.ts').map(inputFile => ({
  input: inputFile,
  inlineDynamicImports: true,
  output: {
    file: 'out-tsc/' + inputFile.replace('.ts', '.js'),
    format: 'esm',
    sourcemap: false
  },
  plugins: [
    litSass(),
    typescriptPlugin({
      importHelpers: true,
      typescript,
    })
  ],
  treeshake: true,
}));

module.exports = configs

