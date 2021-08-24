const { IndividualIncomeTax } = require('../../../build/IndividualIncomeTax')
const assert = require('assert')

let IITCalculator = null

beforeEach(() => {
  IITCalculator = new IndividualIncomeTax()
})
afterEach(() => {
  IITCalculator = null
})

describe('TEST CalcSpecialDeductionOfSalary', () => {
  it('薪資特別扣除額 不足20w', () => {
    const amount = IITCalculator.calcSpecialDeductionOfSalary(100000, 25000)
    assert.strictEqual(amount, 125000)
  })
  it('薪資特別扣除額 超過20w', () => {
    const amount = IITCalculator.calcSpecialDeductionOfSalary(500000, 250000)
    assert.strictEqual(amount, 200000)
  })
})

describe('TEST CalcExemption', () => {
  it('免稅額 未滿70 * 1', () => {
    const amount = IITCalculator.calcExemption(1, 0)
    assert.strictEqual(amount, 88000)
  })
  it('免稅額 超過70 * 1', () => {
    const amount = IITCalculator.calcExemption(0, 1)
    assert.strictEqual(amount, 132000)
  })
  it('免稅額 未滿70 * 2 & 超過70 * 2', () => {
    const amount = IITCalculator.calcExemption(2, 2)
    assert.strictEqual(amount, 440000)
  })
})

describe('TEST CalcStandardDeduction', () => {
  it('標準扣除額 單身', () => {
    const amount = IITCalculator.calcStandardDeduction('single')
    assert.strictEqual(amount, 120000)
  })
  it('標準扣除額 已婚', () => {
    const amount = IITCalculator.calcStandardDeduction('married')
    assert.strictEqual(amount, 240000)
  })
})

describe('TEST CalcBasicLivingExpenseDifference', () => {
  it('基本生活費差額 單身,有基本生活費', () => {
    const amount = IITCalculator.calcBasicLivingExpenseDifference(
      2,
      1,
      'single'
    )
    assert.strictEqual(amount, 118000)
  })
  it('基本生活費差額 已婚,有基本生活費', () => {
    const amount = IITCalculator.calcBasicLivingExpenseDifference(
      3,
      1,
      'married'
    )
    assert.strictEqual(amount, 92000)
  })
  it('基本生活費差額 單身,無基本生活費', () => {
    const amount = IITCalculator.calcBasicLivingExpenseDifference(
      1,
      0,
      'single'
    )
    assert.strictEqual(amount, 0)
  })
  it('基本生活費差額 已婚,無基本生活費', () => {
    const amount = IITCalculator.calcBasicLivingExpenseDifference(
      2,
      1,
      'married'
    )
    assert.strictEqual(amount, 0)
  })
})

describe('TEST CalcProfessionalPractice9ATotal', () => {
  it('9A總計', () => {
    const data = {
      0: { value: 20000, expenseRatio: 0.2 },
      1: { value: 30000, expenseRatio: 0.6 },
      2: { value: 50000, expenseRatio: 0.3 },
      3: { value: 10000, expenseRatio: 0.7 },
      4: { value: 200, expenseRatio: 0.9 },
    }
    const amount = IITCalculator.calcProfessionalPractice9ATotal(data)
    assert.strictEqual(amount, 66020)
  })
})

describe('TEST CalcProfessionalPractice9BTotal', () => {
  it('9B總計&免稅額 非自行出版超過9B免稅額', () => {
    const amount = IITCalculator.calcProfessionalPractice9BTotal(200000, 500000)
    assert.strictEqual(amount.total, 274000)
    assert.strictEqual(amount.exemptionOf9B, 180000)
  })
  it('9B總計&免稅額 非自行出版未超過9B免稅額&加自行出版也未超過', () => {
    const amount = IITCalculator.calcProfessionalPractice9BTotal(70000, 100000)
    assert.strictEqual(amount.total, 0)
    assert.strictEqual(amount.exemptionOf9B, 170000)
  })
  it('9B總計&免稅額 非自行出版超過9B免稅額&加自行出版超過', () => {
    const amount = IITCalculator.calcProfessionalPractice9BTotal(200000, 100000)
    assert.strictEqual(amount.total, 30000)
    assert.strictEqual(amount.exemptionOf9B, 180000)
  })
})

describe('TEST taxBrackets', () => {
  it('稅率級距 1,210,001~2,420,000', () => {
    const amount = IITCalculator.taxBrackets(2420000)
    assert.strictEqual(amount.rate, 0.2)
  })
})

describe('TEST CalcTotalIncomeTax', () => {
  it('綜合所得稅', () => {
    const amount = IITCalculator.calcTotalIncomeTax(
      'single',
      0,
      3000000,
      400000,
      250000,
      2,
      2
    )
    assert.strictEqual(amount, 440000)
  })
})
