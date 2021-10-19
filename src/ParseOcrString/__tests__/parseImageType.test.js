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
      '父張天賜母陳玉蒸父配偶吳家变役别常兵備役出生地臺灣省彪化縣住址台北市內湖區東林里新湖二路429年8樓1493938505'
    const type = parseImageType(string)
    assert.strictEqual(type, 'id_back')
  })
})
