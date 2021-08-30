export interface DefaultAmout {
  specialDeductionOfSalary: number
  professionalPractice9B: {
    exemptionOf9B: number
    ratio: {
      self: number
      non_self: number
    }
  }
  dependentsUnder70: number
  dependentsAbove70: number
  standardDeduction: number
  basicLivingExpense: number
  taxBrackets: {
    level1: { amount: number; rate: number; progressiveDifference: number }
    level2: { amount: number; rate: number; progressiveDifference: number }
    level3: { amount: number; rate: number; progressiveDifference: number }
    level4: { amount: number; rate: number; progressiveDifference: number }
    level5: { amount: number; rate: number; progressiveDifference: number }
  }
}

/**
 * 個人所得稅計算
 */
export class IndividualIncomeTax {
  static defaultAmount: DefaultAmout
  calcSpecialDeductionOfSalary: (
    salary: number,
    salaryFromPartTime: number
  ) => number
  calcProfessionalPractice9BTotal: (
    self: number,
    non_self: number
  ) => {
    exemptionOf9B: number
    total: number
  }
  calcExemption: (
    dependentsUnder70: number,
    dependentsAbove70: number
  ) => number
  calcStandardDeduction: (marriage: 'single' | 'married') => number
  calcBasicLivingExpenseDifference: (
    dependentsUnder70: number,
    dependentsAbove70: number,
    marriage: 'single' | 'married'
  ) => number
  calcTotalIncomeTax: (
    marriage: 'single' | 'married',
    salary: number,
    salaryFromPartTime: number,
    professionalPractice9ATotal: number,
    professionalPractice9BTotal: number,
    dependentsUnder70: number,
    dependentsAbove70: number
  ) => number
  taxBrackets: (netAmount: number) => {
    amount: number
    rate: number
    progressiveDifference: number
  }
  calcProfessionalPractice9ATotal: (amount: {
    [key: number]: {
      value: number
      expenseRatio: number
    }
  }) => number
}

/**
 * Individual Tax Code
 * In taiwan freelancer tax code have the three different type `50`, `9A` and `9B`
 */
export type IndividualTaxCode = '9A' | '9B' | '50'
export interface IndividualWithdrawIncomeTaxOptions {
  year: number
  code: IndividualTaxCode | SYMBOL_FIFTY | SYMBOL_NINEA | SYMBOL_NINEB
  value: number
}

/**
 * 50 Symbol
 */
export type SYMBOL_FIFTY = Symbol
/**
 * 9A Symbol
 */
export type SYMBOL_NINEA = Symbol
/**
 * 9B Symbol
 */
export type SYMBOL_NINEB = Symbol
/**
 * withdraw income tax calculate
 */
export class IndividualWithdrawIncomeTax {
  public year: number
  public code: IndividualTaxCode | SYMBOL_FIFTY | SYMBOL_NINEA | SYMBOL_NINEB
  public value: number
  constructor(options: IndividualWithdrawIncomeTaxOptions)
  inComeCalculate(): number
  secondGenerationCalculate(): number
  payTaxWithdrawTotal(): number
}
