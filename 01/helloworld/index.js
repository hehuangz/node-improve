const path = require('path')
module.exports = class Test {

    getTestSource (methodName, classFile, isClass = false) {
        return `
        test('${'TEST'+ methodName }', () => {
            const ${isClass ? '{'+ methodName +'}' : methodName} = require('../${classFile}')
            expect(ret)
                .thBe('test return)
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