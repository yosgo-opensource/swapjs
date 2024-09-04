import { getDoubleDigitSum } from '../utils/getDoubleDigitSum'
import type { TaxIdResult } from '../../index'

/**
 * @param taxId - company tax ID
 */
export const taxid = (taxId: string): TaxIdResult => {
  const cx = new Array()
  cx[0] = 1
  cx[1] = 2
  cx[2] = 1
  cx[3] = 2
  cx[4] = 1
  cx[5] = 2
  cx[6] = 4
  cx[7] = 1

  let sum = 0
  const cnum = taxId.split('')

  if (taxId.length !== 8) {
    return {
      error: true,
      code: 1,
    }
  } else {
    for (let i = 0; i < 8; i++) {
      if (taxId.charCodeAt(i) < 48 || taxId.charCodeAt(i) > 57) {
        return {
          error: true,
          code: 2,
        }
      }
      sum += Number(getDoubleDigitSum(String(Number(cnum[i]) * cx[i])))
    }

    if (sum % 5 == 0 || (cnum[6] == '7' && (sum + 1) % 5 == 0)) {
      return {
        error: false,
        code: 0,
      }
    } else {
      return {
        error: true,
        code: 2,
      }
    }
  }
}
