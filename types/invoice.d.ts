import type { Month } from './common'

export interface InvoiceInfo {
  InvoiceNumber: string
  CreateTime: string
  RandomNum: string
  TotalAmt: number
  BarCode: string
  QRcodeL: string
  QRcodeR: string
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
