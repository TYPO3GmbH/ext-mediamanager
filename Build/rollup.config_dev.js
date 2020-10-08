import commonJs from 'rollup-plugin-commonjs';
import litSass from '@ponday/rollup-plugin-lit-sass';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript';

const globby = require('globby');

globby.sync('(src|test)/**/*.ts').forEach((inputFile) => console.log(inputFile));

const configs = globby.sync('(src|test)/**/*.ts').map(inputFile => ({
  input: inputFile,
  inlineDynamicImports: true,
  output: {
    file: 'out-tsc/' + inputFile.replace('.ts', '.js'),
    format: 'esm',
    sourcemap: false
  },
  plugins: [
    litSass(),
    nodeResolve(),
    commonJs(),
    typescriptPlugin()
  ],
  treeshake: true,
}));

module.exports = configs

