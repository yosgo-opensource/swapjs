// to remove spacing and new lines
export const formatString = (dataString: string) => {
  return dataString.replace(/(\r\n|\n|\r|\s)/gm, '')
}
