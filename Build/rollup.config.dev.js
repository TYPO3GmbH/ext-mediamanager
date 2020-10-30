import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';

import postcssImport from 'postcss-import';

import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import commonjs from "rollup-plugin-commonjs";
import {createBasicConfig} from "@open-wc/building-rollup";
import merge from "deepmerge";

const globby = require('globby');

const baseConfig = createBasicConfig({
  inlineDynamicImports: true,

  nodeResolve: {
    resolveOnly: [/masonry/],
  },

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: true,

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

const plugins = [
  postcss({
    plugins: [
      postcssImport,
    ]
  }),
  postcssLit(),
  commonjs(),
  typescriptPlugin({
    importHelpers: true,
    typescript,
  }),
  injectProcessEnv({
    NODE_ENV: 'development',
  }),
];

baseConfig.plugins.unshift(...plugins);

const configs = globby.sync('(packages|prototypes)/**/src/*.ts').map(inputFile => {

  return merge(baseConfig, {
    input: inputFile,
    inlineDynamicImports: true,
    output: {
      file: 'out-tsc/' + inputFile.replace('.ts', '.js'),
      dir: null,
      format: 'esm',
      sourcemap: false
    },
  });

});

module.exports = configs;
