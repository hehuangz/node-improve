test('testSouceName', () => {
    const src = new (require('../index'))()    
    const ret = src.getTestSource('fun', 'class')
    expect(ret)
        .toBe(`
        test('TESTfun', () => {
            const fun = require('../class')
            expect(ret)
                .thBe('test return)
        })
        `)
})




// test('testgetTestFileName', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestFileName('/abc/index.js')
//     expect(ret)
//         .toBe('/abc/__test__/index.spec.js')
// })