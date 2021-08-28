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
  it('maybe we can let string parse to number', () => {
    const localeString = toLocaleString('2500', true)
    assert.strictEqual(localeString, '2,500')
  })
  it('default string can not parse to number', () => {
    const localeString = toLocaleString('2500', false)
    assert.strictEqual(localeString, 'NaN')
  })
  it('invalid type number always show NaN', () => {
    const localeString = toLocaleString('1')
    assert.strictEqual(localeString, 'NaN')
  })
  it('invalid type number always show NaN', () => {
    const localeString = toLocaleString('zero number')
    assert.strictEqual(localeString, 'NaN')
  })
})
