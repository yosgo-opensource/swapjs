type Code = '50' | '9A' | '9B'

export function echo(msg: string): string

/**
 *
 * @param code
 * @param value
 *
 * @returns number
 */
export function taxAmtToAmt(code: Code, value: number): number

/**
 *
 * @param code
 * @param value
 *
 * @returns number
 */
export function amtToTaxAmt(code: Code, value: number): number
