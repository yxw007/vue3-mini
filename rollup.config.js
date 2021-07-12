/**
* 创建日期: 2021-07-11
* 文件名称：rollup.config.js
* 创建作者：Potter
* 开发版本：1.0.0
* 相关说明：
*/

const path = require('path');
const json = require("@rollup/plugin-json");
const resolvePlugin = require("@rollup/plugin-node-resolve");
const ts = require('rollup-plugin-typescript2');

let moduleName = process.env.Target;
console.log(`rollup: current build ${moduleName}...`);

let packagesDir = path.resolve(__dirname, "packages");
let resolve = (p) => path.resolve(packagesDir, moduleName, p);
let packageJson = require(resolve("package.json"));

const outputConfig = {
    "esm-bundler": {
        file: resolve(`dist/${moduleName}.esm-bundler.js`),
        format: 'es'
    },
    "cjs": {
        file: resolve(`dist/${moduleName}.cjs.js`),
        format: 'cjs'
    },
    "global": {
        file: resolve(`dist/${moduleName}.global.js`),
        format: 'iife'
    }
}

const buildOptions = packageJson.buildOptions;

function createConfig(format, output) {
    output.name = buildOptions.name;
    output.sourcemap = true;

    return {
        input: resolve('src/index.ts'),
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin.nodeResolve()
        ]
    }
}

export default buildOptions.formats.map(format => createConfig(format, outputConfig[format]));