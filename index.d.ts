type Code = '50' | '9A' | '9B'

export function echo(msg: string): string

export function convertTaxAmtToAmt(code: Code, value: number): number

export function convertAmtToTaxAmt(code: Code, value: number): number

export function calcBusinessTax(value: number): number

export function calcSaleAmt(value: number): number

export function calcSecondGenerationNHISupplementaryPremium(
  value: number
): number

interface InvoiceInfo {
  InvoiceNumber: string
  CreateTime: string
  RandomNum: string
  TotalAmt: number
  BarCode: string
  QRcodeL: string
  QRcodeR: string
}

interface Month {
  left: number
  right: number
}

export class InvoiceParser {
  constructor(invoiceInfoText: string)
  getTotalAmtLocaleString(): string
  InvoiceNumber: string | undefined
  TotalAmt: number | undefined
  CreateTime: string | undefined
  RandomNum: string | undefined
  BarCode: string | undefined
  QRcodeL: string | undefined
  QRcodeR: string | undefined
  year: number
  month: Month
}

interface DefaultAmout {
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
