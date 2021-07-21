const sale_tax_percent: number = 0.05
const sale_tax_percent_plusone: number = 1.05
const secondGeneration_NHI_supplementaryPremium: number = 0.0211
const secondGeneration_NHI_supplementaryPremium_plusone: number = 1.0211

// 含稅 => 未稅
export const convertTaxAmtToAmt = (code: string, value: number): number => {
  if (code === '50') {
    return Math.round(
      Math.round(Number(value) / sale_tax_percent_plusone) /
        secondGeneration_NHI_supplementaryPremium_plusone
    )
  }
  return Math.round(Number(value) / sale_tax_percent_plusone)
}
// 未稅 => 含稅
export const convertAmtToTaxAmt = (code: string, value: number): number => {
  if (code === '50') {
    return Math.round(
      (Number(value) +
        Math.round(Number(value) * secondGeneration_NHI_supplementaryPremium)) *
        sale_tax_percent_plusone
    )
  }
  return Math.round(Number(value) * sale_tax_percent_plusone)
}

// 營業稅 5% (稅額)
export const calcBusinessTax = (value: number): number => {
  return Math.round(
    (Number(value) / sale_tax_percent_plusone) * sale_tax_percent
  )
}

// 銷售額
export const calcSaleAmt = (value: number): number => {
  return Math.round(Number(value) / sale_tax_percent_plusone)
}

// 二代健保補充保費
export const calcSecondGenerationNHISupplementaryPremium = (
  value: number
): number => {
  return Math.round(
    (Math.round(Number(value) / sale_tax_percent_plusone) /
      secondGeneration_NHI_supplementaryPremium_plusone) *
      secondGeneration_NHI_supplementaryPremium
  )
}
