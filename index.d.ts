/**
 * Sample
 */
export { echo } from './types/sample'

/**
 * Common
 */
export type { Month, Code } from './types/common'

/**
 * Tax
 */
export type {
  SYMBOL_NINEA,
  SYMBOL_NINEB,
  SYMBOL_FIFTY,
  DefaultAmout,
  IndividualIncomeTax,
  IndividualWithdrawIncomeTax,
  IndividualWithdrawIncomeTaxOptions,
} from './types/tax'

/**
 * Calc
 */
export {
  calcSaleAmt,
  calcBusinessTax,
  calcSecondGenerationNHISupplementaryPremium,
} from './types/calc'

/**
 * Invoice
 */
export type { InvoiceInfo, InvoiceParser } from './types/invoice'

/**
 * Valid
 */
export type { TaxIdResult } from './types/valid'
export { validateTaxid } from './types/valid'

/**
 * Convert
 */
export { convertAmtToTaxAmt, convertTaxAmtToAmt } from './types/convert'

/**
 * Utils
 */
export { toLocaleString, getDoubleDigitSum } from './types/utils'
