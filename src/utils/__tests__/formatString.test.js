const { formatString } = require('../../../build/utils/formatString')
const assert = require('assert')

describe('TEST remove strings and new lines from string', () => {
  it('spaces and new lines should be removed', () => {
    const rawString =
      '中華民國\n國民 身分證TPER? 姓名陳鮭頭 ANTAL \n出生民國6 8年3月\n12日年月日發證日 期\n民國98年\n1月10日(北市)補發TA性別男 統一的F123067888'
    const result =
      '中華民國國民身分證TPER?姓名陳鮭頭ANTAL出生民國68年3月12日年月日發證日期民國98年1月10日(北市)補發TA性別男統一的F123067888'
    const formattedString = formatString(rawString)
    assert.strictEqual(formattedString, result)
  })
})
