// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import merge from 'lodash/merge';

const { version } = require('./package.json');

const banner = '/*!\n'
    + ` * TagCloud.js v${version}\n`
    + ` * Copyright (c) 2016-${new Date().getFullYear()} @ Cong Min\n`
    + ' * MIT License - https://github.com/mcc108/TagCloud\n'
    + ' */';

export default [{
    output: {
        file: 'dist/TagCloud.js',
    },
}, {
    output: {
        file: 'dist/TagCloud.min.js',
    },
    plugins: [
        uglify({ output: { comments: /^!/ } }),
    ],
}].map((config) => merge({
    input: 'src/index.js',
    output: {
        name: 'TagCloud',
        format: 'umd',
        banner,
    },
    plugins: [
        resolve(),
        babel(),
        commonjs(),
        json(),
    ],
}, config));
