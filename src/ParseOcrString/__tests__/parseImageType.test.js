const {
  parseImageType,
} = require('../../../build/ParseOcrString/parseImageType')
const assert = require('assert')

describe('TEST image type parsing. ', () => {
  it('Should return front.', () => {
    const string =
      '中華民國國民身分證TPER?姓名陳鮭頭ANTAL出生民國68年3月12日年月日發證日期民國98年1月10日(北市)補發TA性別男統一的F123067888'
    const type = parseImageType(string)
    assert.strictEqual(type, 'id_front')
  })

  it('Should return back.', () => {
    const string =
      '父陳德明母與春美配偶金大异役割出生地臺北市住址臺北市內湖區新湖业部世1民權東路六段283巷15弄2180000133805'
    const type = parseImageType(string)
    assert.strictEqual(type, 'id_back')
  })
})
