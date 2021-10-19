const { parseIdCard } = require('../../../build/ParseOcrString/parseIdCard')
const assert = require('assert')

describe('TEST parse id card info', () => {
  it('Parse front id: id', () => {
    const string =
      '中華民國國民身分證TPER?姓名陳鮭頭ANTAL出生民國68年3月12日年月日發證日期民國98年1月10日(北市)補發TA性別男統一的F123067888'
    const parsedId = parseIdCard('front', string)

    const result = {
      address: '',
      id: 'F123067888',
      name: '陳鮭頭',
    }
    assert.strictEqual(parsedId.id, result.id)
  })
  it('Parse front id: name', () => {
    const string =
      '中華民國國民身分證TPER?姓名陳鮭頭ANTAL出生民國68年3月12日年月日發證日期民國98年1月10日(北市)補發TA性別男統一的F123067888'
    const parsedId = parseIdCard('front', string)

    const result = {
      address: '',
      id: 'F123067888',
      name: '陳鮭頭',
    }
    assert.strictEqual(parsedId.name, result.name)
  })
  it('Parse front id: address', () => {
    const string =
      '中華民國國民身分證TPER?姓名陳鮭頭ANTAL出生民國68年3月12日年月日發證日期民國98年1月10日(北市)補發TA性別男統一的F123067888'
    const parsedId = parseIdCard('front', string)

    const result = {
      address: '',
      id: 'F123067888',
      name: '陳鮭頭',
    }
    assert.strictEqual(parsedId.address, result.address)
  })

  it('Parse back id: id', () => {
    const string =
      '父張天賜母陳玉蒸父配偶吳家变役别常兵備役出生地臺灣省彪化縣住址台北市內湖區東林里新湖二路429年8樓1493938505'
    const parsedId = parseIdCard('back', string)

    const result = {
      address: '台北市內湖區東林里新湖二路429年8樓',
      id: '',
      name: '',
    }
    assert.strictEqual(parsedId.id, result.id)
  })
  it('Parse back id: name', () => {
    const string =
      '父張天賜母陳玉蒸父配偶吳家变役别常兵備役出生地臺灣省彪化縣住址台北市內湖區東林里新湖二路429年8樓1493938505'
    const parsedId = parseIdCard('back', string)

    const result = {
      address: '台北市內湖區東林里新湖二路429年8樓',
      id: '',
      name: '',
    }
    assert.strictEqual(parsedId.name, result.name)
  })
  it('Parse back id: address', () => {
    const string =
      '父張天賜母陳玉蒸父配偶吳家变役别常兵備役出生地臺灣省彪化縣住址台北市內湖區東林里新湖二路429年8樓1493938505'
    const parsedId = parseIdCard('back', string)

    const result = {
      address: '台北市內湖區東林里新湖二路429年8樓',
      id: '',
      name: '',
    }
    assert.strictEqual(parsedId.address, result.address)
  })
})
