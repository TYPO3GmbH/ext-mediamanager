import commonJs from 'rollup-plugin-commonjs';
import image from 'rollup-plugin-img';
import json from 'rollup-plugin-json';
import litSass from '@ponday/rollup-plugin-lit-sass';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

const globby = require('globby');
const configs = globby.sync('src/*/**/*.ts').map(inputFile => ({
  input: inputFile,
  output: {
    file: inputFile.replace('src', 'out-tsc/src').replace('.ts', '.js'),
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    image(),
    json({
      preferConst: true
    }),
    litSass(),
    nodeResolve(),
    commonJs(),
    typescriptPlugin({
      exclude: 'node_modules/**',
      importHelpers: true,
      typescript,
    })
  ],
  treeshake: true,
}));

module.exports = configs

