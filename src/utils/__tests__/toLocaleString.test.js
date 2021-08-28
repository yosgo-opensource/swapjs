const { toLocaleString } = require('../../../build/utils/toLocaleString')
const assert = require('assert')

describe('toLocaleString', () => {
  it('number value tranfer to locale string 2000 -> 2,000', () => {
    const localeString = toLocaleString(2e3)
    assert.strictEqual(localeString, '2,000')
  })
  it('number value tranfer to locale string 1000000 -> 1,000,000', () => {
    const localeString = toLocaleString(1e6)
    assert.strictEqual(localeString, '1,000,000')
  })
})
