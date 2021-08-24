/**
 * 稅務相關金額
 *
 * 110.8更新
 */
const default_amount = {
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

function CalcSpecialDeductionOfSalary(
  salary: number,
  salaryFromPartTime: number
) {
  let amount = 0
  if (salary + salaryFromPartTime >= default_amount.specialDeductionOfSalary) {
    amount = default_amount.specialDeductionOfSalary
  } else {
    amount = salary + salaryFromPartTime
  }
  return amount
}

function CalcExemption(dependentsUnder70: number, dependentsAbove70: number) {
  return (
    dependentsUnder70 * default_amount.dependentsUnder70 +
    dependentsAbove70 * default_amount.dependentsAbove70
  )
}

function CalcStandardDeduction(marriage: 'single' | 'married') {
  return default_amount.standardDeduction * (marriage === 'single' ? 1 : 2)
}

function CalcBasicLivingExpenseDifference(
  dependentsUnder70: number,
  dependentsAbove70: number,
  marriage: 'single' | 'married'
) {
  let amount = 0
  const basicLivingExpense =
    default_amount.basicLivingExpense * (dependentsUnder70 + dependentsAbove70)
  const StandardDeductionPlusExemption =
    CalcStandardDeduction(marriage) +
    CalcExemption(dependentsUnder70, dependentsAbove70)

  if (basicLivingExpense > StandardDeductionPlusExemption) {
    amount = basicLivingExpense - StandardDeductionPlusExemption
  } else {
    amount = 0
  }
  return amount
}

function CalcProfessionalPractice9ATotal(amount: {
  [key: number]: { value: number; expenseRatio: number }
}) {
  let total = 0
  for (let i = 0; i < Object.keys(amount).length; i++) {
    total += Math.round(amount[i].value * (1 - amount[i].expenseRatio))
  }
  return total
}

function CalcProfessionalPractice9BTotal(self: number, non_self: number) {
  let exemptionOf9B = 0,
    total = 0
  const exem = default_amount.professionalPractice9B.exemptionOf9B
  const self_ratio = default_amount.professionalPractice9B.ratio.self
  const non_self_ratio = default_amount.professionalPractice9B.ratio.non_self

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

function taxBrackets(netAmount: number) {
  let level = {
    amount: 0,
    rate: 0,
    progressiveDifference: 0,
  }
  const d = default_amount.taxBrackets
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

function CalcTotalIncomeTax(
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
    CalcSpecialDeductionOfSalary(salary, salaryFromPartTime)
  const professionalPracticeAmount =
    professionalPractice9ATotal + professionalPractice9BTotal
  const netAmount =
    salaryAmount +
    professionalPracticeAmount -
    CalcExemption(dependentsUnder70, dependentsAbove70) -
    CalcStandardDeduction(marriage) -
    CalcBasicLivingExpenseDifference(
      dependentsUnder70,
      dependentsAbove70,
      marriage
    )
  const level = taxBrackets(netAmount)
  const total = Math.round(netAmount * level.rate) - level.progressiveDifference
  return total < 0 ? 0 : total
}

export const IndividualIncomeTax = {
  CalcSpecialDeductionOfSalary,
  CalcProfessionalPractice9BTotal,
  CalcExemption,
  CalcStandardDeduction,
  CalcBasicLivingExpenseDifference,
  CalcTotalIncomeTax,
  taxBrackets,
  CalcProfessionalPractice9ATotal,
  default_amount,
}
