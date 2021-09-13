import { Code } from '../../types/common'

const sale_tax_percent: number = 0.05
const sale_tax_percent_plusone: number = 1.05
const secondGeneration_NHI_supplementaryPremium: number = 0.0211
const secondGeneration_NHI_supplementaryPremium_plusone: number = 1.0211

export const taxedAmountToTaxAnd2ndNHIExcluded = (
  code: Code,
  value: number
): number => {
  if (code === '50') {
    return Math.round(
      Math.round(Number(value) / sale_tax_percent_plusone) /
        secondGeneration_NHI_supplementaryPremium_plusone
    )
  }
  return Math.round(Number(value) / sale_tax_percent_plusone)
}

export const taxAnd2ndNHIExcludedToTaxedAmount = (
  code: Code,
  value: number
): number => {
  if (code === '50') {
    return Math.round(
      (Number(value) +
        Math.round(Number(value) * secondGeneration_NHI_supplementaryPremium)) *
        sale_tax_percent_plusone
    )
  }
  return Math.round(Number(value) * sale_tax_percent_plusone)
}

export const calcBusinessTax = (value: number): number => {
  return Math.round(
    (Number(value) / sale_tax_percent_plusone) * sale_tax_percent
  )
}

export const calcSaleAmt = (value: number): number => {
  return Math.round(Number(value) / sale_tax_percent_plusone)
}

export const calcSecondGenerationNHISupplementaryPremium = (
  value: number
): number => {
  return Math.round(
    (Math.round(Number(value) / sale_tax_percent_plusone) /
      secondGeneration_NHI_supplementaryPremium_plusone) *
      secondGeneration_NHI_supplementaryPremium
  )
}

// 2021/09/13後 deprecated
export const convertTaxAmtToAmt = (code: Code, value: number): number => {
  if (code === '50') {
    return Math.round(
      Math.round(Number(value) / sale_tax_percent_plusone) /
        secondGeneration_NHI_supplementaryPremium_plusone
    )
  }
  return Math.round(Number(value) / sale_tax_percent_plusone)
}
// 2021/09/13後 deprecated
export const convertAmtToTaxAmt = (code: Code, value: number): number => {
  if (code === '50') {
    return Math.round(
      (Number(value) +
        Math.round(Number(value) * secondGeneration_NHI_supplementaryPremium)) *
        sale_tax_percent_plusone
    )
  }
  return Math.round(Number(value) * sale_tax_percent_plusone)
}
