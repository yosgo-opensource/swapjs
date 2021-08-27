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
