const path = require('path')
const fs = require('fs')
module.exports = class Test {
    /**
     * 生成Jest测试代码
     * @param {*} sourcePath 
     */
    genJestSource(sourcePath = resolve('./')) {
        const testPath = `${sourcePath}/__test__`
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件
        let list = fs.readdirSync(sourcePath)
        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码
            .filter(v => v.indexOf('.spec') === -1)
            .map(v => this.genTestFile(v))
    }

    /**
     * 生成测试文件
     * @param {*} filename 
     */
    genTestFile(filename) {
        console.log('genTestFile:' + filename)
        const testFileName = this.getTestFileName(filename)

        // 判断是否存在此文件
        if (fs.existsSync(testFileName)) {
            console.log('该测试代码已存在')
            return
        }

        const module = require(filename)
        let source
        if (typeof module === 'object') {
            source = Object.keys(module).map(v => this.getTestSource(v, path.basename(filename), true))
                .join('\n')
        } else if (typeof module == 'function') {
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js', ''), basename)
        }
        fs.writeFileSync(testFileName, source)
    }

    /**
     * 生成测试代码
     * @param {*} methodName 
     * @param {*} classFile 
     * @param {*} isClass 
     */
    getTestSource (methodName, classFile, isClass = false) {
        return `
        test('${'TEST'+ methodName }', () => {
            const ${isClass ? '{'+ methodName +'}' : methodName} = require('../${classFile}')
            const ret = ${methodName}()
            expect(ret)
                .toBe('test return')
        })
        `
    }

    /**
     * 获取测试文件名称
     * @param {*} filename 
     */
    getTestFileName (filename) {
        const dirname = path.dirname(filename)
        const basename = path.basename(filename)
        const extname = path.extname(filename)
        const base = basename.replace(extname, `.spec${extname}`)
        return path.format({
            root: dirname + '/__test__/',
            base: base
        })
    }
}