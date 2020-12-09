import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import postcssImport from 'postcss-import';
import postcssNano from 'cssnano';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import minifyHTML from 'rollup-plugin-minify-html-literals';

import merge from 'deepmerge';
// use createSpaConfig for bundling a Single Page App
//import {createSpaConfig} from '@open-wc/building-rollup';
// use createBasicConfig to do regular JS to JS bundling
import {createBasicConfig} from '@open-wc/building-rollup';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import commonjs from 'rollup-plugin-commonjs';

const baseConfig = createBasicConfig({
  // use the outputdir option to modify where files are output
  outputDir: '../Resources/Public/JavaScript',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: true,

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

const plugins = [
  minifyHTML(),
  postcss({
    plugins: [postcssImport, postcssNano],
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

export default [
  merge(baseConfig, {
    input: './bundle/filestorage/index.ts',
    output: {
      sourcemap: true,
      entryFileNames: 'es.js',
    },
  }),
  merge(baseConfig, {
    input: './bundle/top/index.ts',
    output: {
      sourcemap: true,
      entryFileNames: 'top_es.js',
    },
  }),
];
