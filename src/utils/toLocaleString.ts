/**
 * transer number value to locale string
 * @param value - use in price
 * @param maybe - maybe string can tranfer to number
 * @returns
 */
export const toLocaleString = (
  value: number | string,
  maybe: boolean
): string => {
  if (maybe && typeof value === 'string') {
    value = parseFloat(value)
  }
  if (typeof value !== 'number') {
    return 'NaN'
  } else {
    return value.toLocaleString()
  }
}
