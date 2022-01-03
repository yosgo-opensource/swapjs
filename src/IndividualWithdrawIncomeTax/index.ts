/*
 * In Taiwan, if you are freelancer you should pay the individual healthy tax.
 * Not the same tax pay every year, for the new year should check it again.
 * (2020)
 * (2021)
 * (2022) <- NOW
 */

import {
  IndividualTaxCode,
  IndividualWithdrawIncomeTaxOptions,
} from '../../types/tax'
import type { SYMBOL_FIFTY, SYMBOL_NINEA, SYMBOL_NINEB } from '../../types/tax'

export const FIFTY: SYMBOL_FIFTY = Symbol('50')
export const NINEA: SYMBOL_NINEA = Symbol('9A')
export const NINEB: SYMBOL_NINEB = Symbol('9B')

export class IndividualWithdrawIncomeTax {
  public year: number
  public code: IndividualTaxCode | SYMBOL_FIFTY | SYMBOL_NINEA | SYMBOL_NINEB
  public value: number
  constructor(options: IndividualWithdrawIncomeTaxOptions) {
    this.year = options.year || new Date().getFullYear()
    this.code = options.code || FIFTY
    this.value = options.value || 0
  }
  /**
   * individual tax calculate <br />
   * (2022) code 50 - value more then 86,001, pay 5% tax <br/>
   * (2022) code 9A, 9B - value more then 20,010, pay 10% tax
   */
  inComeCalculate(): number {
    if (this.code === FIFTY || this.code === '50') {
      if (this.value < 86001) {
        return 0
      }
      return Math.floor(this.value * 0.05)
    } else {
      if (this.value <= 20009) {
        return 0
      }
      return Math.floor(this.value * 0.1)
    }
  }
  /**
   * (2022) code 50 - value more then 25,250, pay 2.11% tax <br />
   * (2022) code 9A, 9B - value more then 20,000, pay 2.11% tax <br />
   */
  secondGenerationCalculate(): number {
    if (this.code === FIFTY || this.code === '50') {
      if (this.value <= 25249) {
        return 0
      }
    } else {
      if (this.value < 20000) {
        return 0
      }
    }
    return Math.round(this.value * 0.0211)
  }
  /**
   * calculate pure withdraw total
   */
  payTaxWithdrawTotal(): number {
    return (
      this.value - this.inComeCalculate() - this.secondGenerationCalculate()
    )
  }
}
