// maybe add some test for this function
export const getDoubleDigitSum = (number: string | number) => {
  if (Number(number) > 9) {
    const s = number + ''
    const n1: string = s.substring(0, 1)
    const n2: string = s.substring(1, 2)
    number = String(Number(n1) + Number(n2))
  }
  return number
}
