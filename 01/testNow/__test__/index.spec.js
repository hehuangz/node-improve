const fs = require('fs')
test('集成测试 测试生成测试代码文件', () => {
    const src = new (require('../index'))()
    // 准备环境
    // 删除测试用的生成结果
    console.log(__dirname, 11)
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true
    })
    src.genJestSource(__dirname + '/data')
})


// test('testSouceName', () => {
//     const src = new (require('../index'))()    
//     const ret = src.getTestSource('fun', 'class')
//     expect(ret)
//         .toBe(`
//         test('TESTfun', () => {
//             const fun = require('../class')
//             expect(ret)
//                 .thBe('test return)
//         })
//         `)
// })




// test('testgetTestFileName', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestFileName('/abc/index.js')
//     expect(ret)
//         .toBe('/abc/__test__/index.spec.js')
// })