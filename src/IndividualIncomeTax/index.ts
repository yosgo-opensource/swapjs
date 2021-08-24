/**
 * 稅務相關金額
 *
 * 110.8更新
 */
import type { DefaultAmout } from '../../index'
export class IndividualIncomeTax {
  static defaultAmount: DefaultAmout
  constructor() {}

  calcSpecialDeductionOfSalary(salary: number, salaryFromPartTime: number) {
    let amount = 0
    if (
      salary + salaryFromPartTime >=
      IndividualIncomeTax.defaultAmount.specialDeductionOfSalary
    ) {
      amount = IndividualIncomeTax.defaultAmount.specialDeductionOfSalary
    } else {
      amount = salary + salaryFromPartTime
    }
    return amount
  }

  calcExemption(dependentsUnder70: number, dependentsAbove70: number) {
    return (
      dependentsUnder70 * IndividualIncomeTax.defaultAmount.dependentsUnder70 +
      dependentsAbove70 * IndividualIncomeTax.defaultAmount.dependentsAbove70
    )
  }

  calcStandardDeduction(marriage: 'single' | 'married') {
    return (
      IndividualIncomeTax.defaultAmount.standardDeduction *
      (marriage === 'single' ? 1 : 2)
    )
  }

  calcBasicLivingExpenseDifference(
    dependentsUnder70: number,
    dependentsAbove70: number,
    marriage: 'single' | 'married'
  ) {
    let amount = 0
    const basicLivingExpense =
      IndividualIncomeTax.defaultAmount.basicLivingExpense *
      (dependentsUnder70 + dependentsAbove70)
    const StandardDeductionPlusExemption =
      this.calcStandardDeduction(marriage) +
      this.calcExemption(dependentsUnder70, dependentsAbove70)

    if (basicLivingExpense > StandardDeductionPlusExemption) {
      amount = basicLivingExpense - StandardDeductionPlusExemption
    } else {
      amount = 0
    }
    return amount
  }

  calcProfessionalPractice9ATotal(amount: {
    [key: number]: { value: number; expenseRatio: number }
  }) {
    let total = 0
    for (let i = 0; i < Object.keys(amount).length; i++) {
      total += Math.round(amount[i].value * (1 - amount[i].expenseRatio))
    }
    return total
  }

  calcProfessionalPractice9BTotal(self: number, non_self: number) {
    let exemptionOf9B = 0,
      total = 0
    const exem =
      IndividualIncomeTax.defaultAmount.professionalPractice9B.exemptionOf9B
    const self_ratio =
      IndividualIncomeTax.defaultAmount.professionalPractice9B.ratio.self
    const non_self_ratio =
      IndividualIncomeTax.defaultAmount.professionalPractice9B.ratio.non_self

    if (non_self >= exem) {
      exemptionOf9B = exem
      total =
        Math.round((non_self - exem) * (1 - non_self_ratio)) +
        Math.round(self * (1 - self_ratio))
    } else if (non_self < exem) {
      if (self >= exem - non_self) {
        exemptionOf9B = exem
        total = Math.round((self - (exem - non_self)) * (1 - self_ratio))
      } else if (self < exem - non_self) {
        exemptionOf9B = self + non_self
        total = 0
      }
    }
    return { exemptionOf9B, total }
  }

  taxBrackets(netAmount: number) {
    let level = {
      amount: 0,
      rate: 0,
      progressiveDifference: 0,
    }
    const d = IndividualIncomeTax.defaultAmount.taxBrackets
    switch (true) {
      case netAmount >= d.level1.amount && netAmount < d.level2.amount:
        return (level = d.level1)
      case netAmount >= d.level2.amount && netAmount < d.level3.amount:
        return (level = d.level2)
      case netAmount >= d.level3.amount && netAmount < d.level4.amount:
        return (level = d.level3)
      case netAmount >= d.level4.amount && netAmount < d.level5.amount:
        return (level = d.level4)
      case netAmount >= d.level5.amount:
        return (level = d.level5)
    }
    return level
  }

  calcTotalIncomeTax(
    marriage: 'single' | 'married',
    salary: number,
    salaryFromPartTime: number,
    professionalPractice9ATotal: number,
    professionalPractice9BTotal: number,
    dependentsUnder70: number,
    dependentsAbove70: number
  ) {
    const salaryAmount =
      salary +
      salaryFromPartTime -
      this.calcSpecialDeductionOfSalary(salary, salaryFromPartTime)
    const professionalPracticeAmount =
      professionalPractice9ATotal + professionalPractice9BTotal
    const netAmount =
      salaryAmount +
      professionalPracticeAmount -
      this.calcExemption(dependentsUnder70, dependentsAbove70) -
      this.calcStandardDeduction(marriage) -
      this.calcBasicLivingExpenseDifference(
        dependentsUnder70,
        dependentsAbove70,
        marriage
      )
    const level = this.taxBrackets(netAmount)
    const total =
      Math.round(netAmount * level.rate) - level.progressiveDifference
    return total < 0 ? 0 : total
  }
}

IndividualIncomeTax.defaultAmount = {
  specialDeductionOfSalary: 200000,
  professionalPractice9B: {
    exemptionOf9B: 180000,
    ratio: {
      self: 0.75,
      non_self: 0.3,
    },
  },
  dependentsUnder70: 88000,
  dependentsAbove70: 132000,
  standardDeduction: 120000,
  basicLivingExpense: 182000,
  taxBrackets: {
    level1: { amount: 0, rate: 0.05, progressiveDifference: 0 },
    level2: { amount: 540001, rate: 0.12, progressiveDifference: 37800 },
    level3: { amount: 1210001, rate: 0.2, progressiveDifference: 134600 },
    level4: { amount: 2420001, rate: 0.3, progressiveDifference: 376600 },
    level5: { amount: 4530001, rate: 0.4, progressiveDifference: 829600 },
  },
}
