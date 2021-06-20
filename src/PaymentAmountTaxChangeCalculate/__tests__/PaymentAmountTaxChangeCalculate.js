const { taxAmtToAmt, amtToTaxAmt } = require('../../../build/PaymentAmountTaxChangeCalculate')
const assert = require('assert')

describe('TEST PaymentAmountTaxChangeCalculate Start 50', () => {
  it('taxAmtToAmt 含稅轉未稅', () => {
    const total = taxAmtToAmt("50", 200)
    assert.strictEqual(total, 186)
  })
  it('amtToTaxAmt 未稅轉含稅', () => {
    const total = amtToTaxAmt("50", 186)
    assert.strictEqual(total, 200)
  })
})

describe('TEST PaymentAmountTaxChangeCalculate Start 9A', () => {
  it('taxAmtToAmt 含稅轉未稅', () => {
    const total = taxAmtToAmt("9A", 200)
    assert.strictEqual(total, 190)
  })
  it('amtToTaxAmt 未稅轉含稅', () => {
    const total = amtToTaxAmt("9A", 190)
    assert.strictEqual(total, 200)
  })
})

describe('TEST PaymentAmountTaxChangeCalculate Start 9B', () => {
  it('taxAmtToAmt 含稅轉未稅', () => {
    const total = taxAmtToAmt("9B", 200)
    assert.strictEqual(total, 190)
  })
  it('amtToTaxAmt 未稅轉含稅', () => {
    const total = amtToTaxAmt("9B", 190)
    assert.strictEqual(total, 200)
  })
})