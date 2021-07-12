/**
* 创建日期: 2021-07-11
* 文件名称：dev.js
* 创建作者：Potter
* 开发版本：1.0.0
* 相关说明：开发模式-打包特定模块
*/

const fs = require('fs');
const execa = require('execa');

const moduleName = "reactivity";

/**
 * 打包
 * @param {*} module 模块
 */
async function build(module) {
    await execa('rollup', ['-cw', '--environment', `TARGET:${module}`],
        /* 子进程打包信息共享给父进程 */
        { stdio: 'inherit' });
}

build(moduleName);