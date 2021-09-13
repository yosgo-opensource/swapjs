import type { Code } from './common'

/**
 * 含稅轉未稅 (deprecated)
 * @param code - Code
 * @param value - number
 */
export function convertTaxAmtToAmt(code: Code, value: number): number

/**
 * 未稅轉含稅 (deprecated)
 * @param code - Code
 * @param value - number
 */
export function convertAmtToTaxAmt(code: Code, value: number): number

/**
 * 含稅轉勞務服務金額
 * @param code - Code
 * @param value - number
 */
export function taxedAmountToTaxAnd2ndNHIExcluded(
  code: Code,
  value: number
): number

/**
 * 勞務服務金額轉含稅
 * @param code - Code
 * @param value - number
 */
export function taxAnd2ndNHIExcludedToTaxedAmount(
  code: Code,
  value: number
): number
