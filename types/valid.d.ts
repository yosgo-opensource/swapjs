export interface TaxIdResult {
  error: boolean
  code: number
}

export function validateTaxid(taxId: string): TaxIdResult
