type Code = '50' | '9A' | '9B'

export function echo(msg: string): string

export function convertTaxAmtToAmt(code: Code, value: number): number

export function convertAmtToTaxAmt(code: Code, value: number): number

export function calcBusinessTax(value: number): number

export function calcSaleAmt(value: number): number

export function calcSecondGenerationNHISupplementaryPremium(
  value: number
): number

interface InvoiceInfo {
  InvoiceNumber: string
  CreateTime: string
  RandomNum: string
  TotalAmt: number
  BarCode: string
  QRcodeL: string
  QRcodeR: string
}

interface Month {
  left: number
  right: number
}

export class InvoiceParser {
  constructor(invoiceInfoText: string)
  getTotalAmtLocaleString(): string
  InvoiceNumber: string | undefined
  TotalAmt: number | undefined
  CreateTime: string | undefined
  RandomNum: string | undefined
  BarCode: string | undefined
  QRcodeL: string | undefined
  QRcodeR: string | undefined
  year: number
  month: Month
}
