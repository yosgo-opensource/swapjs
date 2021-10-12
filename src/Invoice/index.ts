interface InvoiceInfo {
  InvoiceNumber?: string
  CreateTime?: string
  RandomNum?: string
  TotalAmt?: number
  BarCode?: string
  QRcodeL?: string
  QRcodeR?: string
}
interface Month {
  left: number
  right: number
}

export class InvoiceParser {
  private _invoiceInfo: InvoiceInfo
  constructor(invoiceInfoText: string) {
    try {
      this._invoiceInfo = this.parser(invoiceInfoText)
    } catch (err) {
      throw new Error(err)
    }
  }

  private parser(invoiceInfoText: string): InvoiceInfo {
    return JSON.parse(invoiceInfoText)
  }

  public getTotalAmtLocaleString(): string {
    return Number(this._invoiceInfo.TotalAmt).toLocaleString()
  }

  get InvoiceNumber(): string {
    return (
      this._invoiceInfo?.InvoiceNumber?.substr(0, 2) +
      '－' +
      this._invoiceInfo?.InvoiceNumber?.substr(2)
    )
  }

  get TotalAmt(): number | undefined {
    return Number(this._invoiceInfo.TotalAmt)
  }

  get CreateTime(): string | undefined {
    return this._invoiceInfo.CreateTime
  }

  get RandomNum(): string | undefined {
    return this._invoiceInfo.RandomNum
  }

  get BarCode(): string | undefined {
    return this._invoiceInfo.BarCode
  }

  get QRcodeL(): string | undefined {
    return this._invoiceInfo.QRcodeL
  }

  get QRcodeR(): string | undefined {
    return this._invoiceInfo.QRcodeR
  }

  get year(): number {
    return (
      new Date(
        this._invoiceInfo.CreateTime?.replace(/-/g, '/') as string
      ).getFullYear() - 1911
    )
  }

  get month(): Month {
    let monthLeft =
      new Date(
        this._invoiceInfo.CreateTime?.replace(/-/g, '/') as string
      ).getMonth() + 1
    let monthRight = monthLeft % 2 !== 0 ? monthLeft + 1 : monthLeft - 1
    if (monthLeft > monthRight) {
      const tmp = monthRight
      monthRight = monthLeft
      monthLeft = tmp
    }
    return {
      left: monthLeft,
      right: monthRight,
    }
  }
}
