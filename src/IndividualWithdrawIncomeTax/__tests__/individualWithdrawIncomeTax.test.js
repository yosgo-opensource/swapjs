const {
  FIFTY,
  NINEA,
  NINEB,
  IndividualWithdrawIncomeTax,
} = require('../../../build/IndividualWithdrawIncomeTax')
const assert = require('assert')

describe('TEST individual withdraw income tax', () => {
  it('code => 50, value => less then 86,001, pay 0', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 86000,
      code: FIFTY,
    })
    const incomeTax = calculator.inComeCalculate()
    assert.strictEqual(incomeTax, 0)
  })
  it('code => 50, value => more then 86,001 and use `50` string, pay 4450', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 89000,
      code: '50',
    })
    const incomeTax = calculator.inComeCalculate()
    assert.strictEqual(incomeTax, 4450)
  })

  it('code => 9A, 9B, value => less then 21,000, pay 0', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 20009,
      code: NINEA,
    })
    const incomeTax = calculator.inComeCalculate()
    assert.strictEqual(incomeTax, 0)
  })
  it('code => 50, value => more then 84,501 and use `50` string, pay 2120', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 21200,
      code: NINEB,
    })
    const incomeTax = calculator.inComeCalculate()
    assert.strictEqual(incomeTax, 2120)
  })
})

describe('TEST individual withdraw second generation healthy tax, pay 0', () => {
  it('code => 50, value => less then 25,250', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 25249,
      code: FIFTY,
    })
    const secondGenerationHealthyTax = calculator.secondGenerationCalculate()
    assert.strictEqual(secondGenerationHealthyTax, 0)
  })
  it('code => 50, value => less then 25,250, pay 533', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 25251,
      code: '50',
    })
    const secondGenerationHealthyTax = calculator.secondGenerationCalculate()
    assert.strictEqual(secondGenerationHealthyTax, 533)
  })

  it('code => 9A, value => less then 20,000, pay 0', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 19999,
      code: NINEA,
    })
    const secondGenerationHealthyTax = calculator.secondGenerationCalculate()
    assert.strictEqual(secondGenerationHealthyTax, 0)
  })
  it('code => 9B, value => more then 19,999, pay 517', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 24500,
      code: NINEB,
    })
    const secondGenerationHealthyTax = calculator.secondGenerationCalculate()
    assert.strictEqual(secondGenerationHealthyTax, 517)
  })
})

describe('TEST withdraw total final calculate', () => {
  it('code => 50, value => 20,000 tax => 0 second healthy => 0 , final total 20,000', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 20000,
      code: FIFTY,
    })
    const withdrawPureTotal = calculator.payTaxWithdrawTotal()
    assert.strictEqual(withdrawPureTotal, 20000)
  })
  it('code => 50, value => 25,750 tax => 0 second healthy => 543, final total 25,207', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 25750,
      code: FIFTY,
    })
    const withdrawPureTotal = calculator.payTaxWithdrawTotal()
    assert.strictEqual(withdrawPureTotal, 25207)
  })

  it('code => 9A, value => 21,051 tax => 2105 second healthy => 444 , final total 20,000', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 21051,
      code: NINEA,
    })
    const withdrawPureTotal = calculator.payTaxWithdrawTotal()
    assert.strictEqual(withdrawPureTotal, 18502)
  })
  it('code => 9B, value => 46,872 tax => 4687 second healthy =>  989, final total 41196', () => {
    const calculator = new IndividualWithdrawIncomeTax({
      value: 46872,
      code: NINEA,
    })
    const withdrawPureTotal = calculator.payTaxWithdrawTotal()
    assert.strictEqual(withdrawPureTotal, 41196)
  })
})
