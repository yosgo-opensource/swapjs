export { echo } from './echo'
export {
  convertTaxAmtToAmt,
  convertAmtToTaxAmt,
  calcBusinessTax,
  calcSaleAmt,
  calcSecondGenerationNHISupplementaryPremium,
  taxAnd2ndNHIExcludedToTaxedAmount,
  taxedAmountToTaxAnd2ndNHIExcluded,
} from './TaxCalc'
export { IndividualIncomeTax } from './IndividualIncomeTax'
export { IndividualWithdrawIncomeTax } from './IndividualWithdrawIncomeTax'
export { InvoiceParser } from './Invoice'
export { taxid as validateTaxid } from './validate/taxid'
export { email as validateEmail } from './validate/email'

export { parseIdCard } from './ParseOcrString/parseIdCard'
export { parseImageType } from './ParseOcrString/parseImageType'
export { getDoubleDigitSum } from './utils/getDoubleDigitSum'
export { toLocaleString } from './utils/toLocaleString'
export { b64toBlob } from './utils/b64toBlob'
export { formatString } from './utils/formatString'

export type {
  SYMBOL_NINEA,
  SYMBOL_NINEB,
  SYMBOL_FIFTY,
  TaxIdResult,
  DefaultAmout,
  IndividualWithdrawIncomeTaxOptions,
} from '../index'
