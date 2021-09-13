const {
  taxedAmountToTaxAnd2ndNHIExcluded,
  taxAnd2ndNHIExcludedToTaxedAmount,
  calcBusinessTax,
  calcSaleAmt,
  calcSecondGenerationNHISupplementaryPremium,
} = require('../../../build/TaxCalc')
const assert = require('assert')

describe('TEST TaxCalc Start 50', () => {
  it('taxedAmountToTaxAnd2ndNHIExcluded 含稅轉未稅', () => {
    const total = taxedAmountToTaxAnd2ndNHIExcluded('50', 200)
    assert.strictEqual(total, 186)
  })
  it('taxAnd2ndNHIExcludedToTaxedAmount 未稅轉含稅', () => {
    const total = taxAnd2ndNHIExcludedToTaxedAmount('50', 186)
    assert.strictEqual(total, 200)
  })
})

describe('TEST TaxCalc Start 9A', () => {
  it('taxedAmountToTaxAnd2ndNHIExcluded 含稅轉未稅', () => {
    const total = taxedAmountToTaxAnd2ndNHIExcluded('9A', 200)
    assert.strictEqual(total, 190)
  })
  it('taxAnd2ndNHIExcludedToTaxedAmount 未稅轉含稅', () => {
    const total = taxAnd2ndNHIExcludedToTaxedAmount('9A', 190)
    assert.strictEqual(total, 200)
  })
})

describe('TEST TaxCalc Start 9B', () => {
  it('taxedAmountToTaxAnd2ndNHIExcluded 含稅轉未稅', () => {
    const total = taxedAmountToTaxAnd2ndNHIExcluded('9B', 200)
    assert.strictEqual(total, 190)
  })
  it('taxAnd2ndNHIExcludedToTaxedAmount 未稅轉含稅', () => {
    const total = taxAnd2ndNHIExcludedToTaxedAmount('9B', 190)
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

describe('TEST User Flows => 已含稅計算', () => {
  const taxedAmount = 81931
  it('營業稅', () => {
    const total = calcBusinessTax(taxedAmount)
    assert.strictEqual(total, 3901)
  })
  it('銷售額', () => {
    const total = calcSaleAmt(taxedAmount)
    assert.strictEqual(total, 78030)
  })
  it('二代健保補充保費', () => {
    const total = calcSecondGenerationNHISupplementaryPremium(taxedAmount)
    assert.strictEqual(total, 1612)
  })
  it('勞務服務金額(直接算)', () => {
    const total = taxedAmountToTaxAnd2ndNHIExcluded('50', taxedAmount)
    assert.strictEqual(total, 76418)
  })
  it('勞務服務金額(加減)', () => {
    const total =
      calcSaleAmt(taxedAmount) -
      calcSecondGenerationNHISupplementaryPremium(taxedAmount)
    assert.strictEqual(total, 76418)
  })
})

describe('TEST User Flows => 以勞務服務金額計算', () => {
  const amount = 76418
  const taxedAmount = taxAnd2ndNHIExcludedToTaxedAmount('50', amount)
  it('含稅', () => {
    assert.strictEqual(taxedAmount, 81932)
  })
  it('營業稅', () => {
    const total = calcBusinessTax(taxedAmount)
    assert.strictEqual(total, 3902)
  })
  it('銷售額', () => {
    const total = calcSaleAmt(taxedAmount)
    assert.strictEqual(total, 78030)
  })
  it('二代健保補充保費', () => {
    const total = calcSecondGenerationNHISupplementaryPremium(taxedAmount)
    assert.strictEqual(total, 1612)
  })
  it('勞務服務金額(直接算)', () => {
    const total = taxedAmountToTaxAnd2ndNHIExcluded('50', taxedAmount)
    assert.strictEqual(total, amount)
  })
  it('勞務服務金額(加減)', () => {
    const total =
      calcSaleAmt(taxedAmount) -
      calcSecondGenerationNHISupplementaryPremium(taxedAmount)
    assert.strictEqual(total, amount)
  })
})
