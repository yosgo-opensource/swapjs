import type { Code } from './common'

/**
 * 含稅轉未稅
 * @param code - Code
 * @param value - number
 */
export function convertTaxAmtToAmt(code: Code, value: number): number

/**
 * 未稅轉含稅
 * @param code - Code
 * @param value - number
 */
export function convertAmtToTaxAmt(code: Code, value: number): number
