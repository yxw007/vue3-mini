/**
* 创建日期: 2021-07-11
* 文件名称：build.js
* 创建作者：Potter
* 开发版本：1.0.0
* 相关说明：正式模式-打包所有模块
*/

const fs = require('fs');
const execa = require('execa');

//1.获取packages下的所有模块
const modules = fs.readdirSync('packages');

/**
 * 打包
 * @param {*} module 模块
 */
async function build(module) {
    await execa('rollup', ['-c', '--environment', `TARGET:${module}`],
        /* 子进程打包信息共享给父进程 */
        { stdio: 'inherit' });
}

/**
 * 并行打包模块
 * @param {*} modules 
 */
async function runParallel(modules, build) {
    let result = [];
    for (const module of modules) {
        result.push(build(module));
    }
    return Promise.all(result);
}

//2. 并行打包所有模块
runParallel(modules, build).then(() => {
    console.log("All Modules Build Success !");
}, (fail) => {
    console.error("All Modules Build Fail !" + fail);
});