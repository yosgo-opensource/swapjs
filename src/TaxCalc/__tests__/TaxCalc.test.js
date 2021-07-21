const {
  convertTaxAmtToAmt,
  convertAmtToTaxAmt,
  calcBusinessTax,
  calcSaleAmt,
  calcSecondGenerationNHISupplementaryPremium,
} = require('../../../build/TaxCalc')
const assert = require('assert')

describe('TEST TaxCalc Start 50', () => {
  it('convertTaxAmtToAmt 含稅轉未稅', () => {
    const total = convertTaxAmtToAmt('50', 200)
    assert.strictEqual(total, 186)
  })
  it('convertAmtToTaxAmt 未稅轉含稅', () => {
    const total = convertAmtToTaxAmt('50', 186)
    assert.strictEqual(total, 200)
  })
})

describe('TEST TaxCalc Start 9A', () => {
  it('convertTaxAmtToAmt 含稅轉未稅', () => {
    const total = convertTaxAmtToAmt('9A', 200)
    assert.strictEqual(total, 190)
  })
  it('convertAmtToTaxAmt 未稅轉含稅', () => {
    const total = convertAmtToTaxAmt('9A', 190)
    assert.strictEqual(total, 200)
  })
})

describe('TEST TaxCalc Start 9B', () => {
  it('convertTaxAmtToAmt 含稅轉未稅', () => {
    const total = convertTaxAmtToAmt('9B', 200)
    assert.strictEqual(total, 190)
  })
  it('convertAmtToTaxAmt 未稅轉含稅', () => {
    const total = convertAmtToTaxAmt('9B', 190)
    assert.strictEqual(total, 200)
  })
})

describe('TEST TaxCalc Start calcBusinessTax', () => {
  it('calcBusinessTax 營業稅 5% (稅額)', () => {
    const total = calcBusinessTax(25000)
    assert.strictEqual(total, 1190)
  })
  it('calcBusinessTax 營業稅 5% (稅額)', () => {
    const total = calcBusinessTax(190)
    assert.strictEqual(total, 9)
  })
})

describe('TEST TaxCalc Start calcSaleAmt', () => {
  it('calcSaleAmt 銷售額', () => {
    const total = calcSaleAmt(25000)
    assert.strictEqual(total, 23810)
  })
  it('calcSaleAmt 銷售額', () => {
    const total = calcSaleAmt(190)
    assert.strictEqual(total, 181)
  })
})

describe('TEST TaxCalc Start calcSecondGenerationNHISupplementaryPremium', () => {
  it('calcSecondGenerationNHISupplementaryPremium 二代健保補充保費', () => {
    const total = calcSecondGenerationNHISupplementaryPremium(25000)
    assert.strictEqual(total, 492)
  })
  it('calcSecondGenerationNHISupplementaryPremium 二代健保補充保費', () => {
    const total = calcSecondGenerationNHISupplementaryPremium(190)
    assert.strictEqual(total, 4)
  })
})
