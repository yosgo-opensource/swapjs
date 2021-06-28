const { InvoiceParser } = require('../../../build/Invoice')
const assert = require('assert')

let invoiceInfo = null

describe('Invoice json data parser', () => { 
  before(() => {
    const invoice_info_text = '{"CheckCode":"1215B29C02BB605B0C690173C3A419B72E36EEFE69A00AF8903D7A5A19724BEB","MerchantID":"32550462","MerchantOrderNo":"21031702380WeVph1k1","InvoiceNumber":"OO30192940","TotalAmt":2680,"InvoiceTransNo":"21031613585889961","RandomNum":"9587","CreateTime":"2021-03-16 13:58:58","BarCode":"11004OO301929409587","QRcodeL":"OO3019294011003169587000009f800000a7888888888508654865OkJhFDsbbyPy0w\/uXC\/PQ==:**********:1:1:1:\u52de\u52d9\u670d\u52d9\u8cbb(45233622375990):1:2680","QRcodeR":"**"}'
    invoiceInfo = new InvoiceParser(invoice_info_text)
  })
  after(() => {
    invoiceInfo = null
  })
  it('invoice info InvoiceNumber', () => { 
    assert.strictEqual(invoiceInfo.InvoiceNumber, 'OO－30192940')
  })
  it('invoice info CreateTime', () => { 
    assert.strictEqual(invoiceInfo.CreateTime, '2021-03-16 13:58:58')
  })
  it('invoice info RandomNum', () => { 
    assert.strictEqual(invoiceInfo.RandomNum, '9587') 
  })
  it('invoice info BarCode', () => {
    assert.strictEqual(invoiceInfo.BarCode, '11004OO301929409587')
  })
  it('invoice info QRcodeL', () => {
    assert.strictEqual(invoiceInfo.QRcodeL, 'OO3019294011003169587000009f800000a7888888888508654865OkJhFDsbbyPy0w\/uXC\/PQ==:**********:1:1:1:\u52de\u52d9\u670d\u52d9\u8cbb(45233622375990):1:2680')
  })
  it('invoice info QRcodeR', () => {
    assert.strictEqual(invoiceInfo.QRcodeR, '**')
  })
  it('invoice info getTotalAmtLocaleString', () => { 
    assert.strictEqual(invoiceInfo.getTotalAmtLocaleString(), '2,680')
  })
  it('invoice info year', () => {
    assert.strictEqual(invoiceInfo.year, 110)
  })
  it('invoice info month left and right', () => {
    assert.strictEqual(invoiceInfo.month.left, 3)
    assert.strictEqual(invoiceInfo.month.right, 4)
  })
  it('invoice info TotalAmt', () => {
    assert.strictEqual(invoiceInfo.TotalAmt, 2680)
  })
})

describe('Test edge case', () => {
  before(() => {
    const invoice_info_text = '{"CheckCode":"1215B29C02BB605B0C690173C3A419B72E36EEFE69A00AF8903D7A5A19724BEB","MerchantID":"32550462","MerchantOrderNo":"21031702380WeVph1k1","InvoiceNumber":"OO30192940","TotalAmt":2680,"InvoiceTransNo":"21031613585889961","RandomNum":"9587","CreateTime":"2021-06-16 13:58:58","BarCode":"11004OO301929409587","QRcodeL":"OO3019294011003169587000009f800000a7888888888508654865OkJhFDsbbyPy0w\/uXC\/PQ==:**********:1:1:1:\u52de\u52d9\u670d\u52d9\u8cbb(45233622375990):1:2680","QRcodeR":"**"}'
    invoiceInfo = new InvoiceParser(invoice_info_text)
  })
  after(() => {
    invoiceInfo = null
  })
  it('invoice info month left and right change', () => {
    assert.strictEqual(invoiceInfo.month.left, 5)
    assert.strictEqual(invoiceInfo.month.right, 6)
  })
})