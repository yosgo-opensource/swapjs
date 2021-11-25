import { IdCardOrientation } from '../../types/common'

// front: returns name and id
// back: returns address

export const parseIdCard = (
  idCardOrientation: IdCardOrientation,
  dataString: string
) => {
  // id card front string example: "中華民國國民身分證TPER?姓名陳鮭頭ANTAL出生民國68年3月12日年月日發證日期民國98年1月10日(北市)補發TA性別男統一的F123067888"
  // name = the string between '姓名' and '出生'
  // id number = (1 uppercase English letter + 9 consecutive numbers)

  // id card back string example: "父張天賜母陳玉蒸父配偶吳家变役别常兵備役出生地臺灣省彪化縣住址台北市內湖區東林里新湖二路429年8樓1493938505"
  // address = the string between '住址' and the 10 consecutive serial number

  if (idCardOrientation === 'front') {
    const stringWithOnlyChineseLetters = dataString.replace(
      /([[\]&\-=/\\!^#,+()$~%.'":*?<>{}_;]|[A-Za-z0-9])|@/g,
      ''
    )
    // List of possible 2-character keywords that could appear in the ocr string
    // Use the list of keywords that are actually in the string to determine where the Name ends
    // Keywords with 2 or more characters preferred, to prevent the situation where the name actually includes the keyword from happening
    // Generally ocr reads from top to bottom, left to right, so the keywords '中華民國身分證' and '姓名' can be ignored
    const keyWords = [
      '出生',
      '性別',
      '性别',
      '别男',
      '别女',
      '別男',
      '別女',
      '發證',
      '發證日',
      '證日',
      '出生',
      '年月日',
      '年月',
      '月日',
      '日期',
      '日民國',
      '出年',
      '生日',
      '月日民國',
      '出生民國',
      '生民國',
      '統一編號',
      '統一',
      '一編號',
      '月日發證',
      '月日發',
      '日發證',
      '編號',
      '初發',
      '補發',
      '換發',
    ]
    // To return an array of the indexes of keywords that actually include in the ocr string ( to prevent -1 from appearing from indexOf )
    // Then use this array to find the smallest index, to determine where the Name ends
    const indexOfExistingKeywords = keyWords.reduce(
      (accumulator: number[], currentValue: string) => {
        if (stringWithOnlyChineseLetters.includes(currentValue)) {
          accumulator.push(stringWithOnlyChineseLetters.indexOf(currentValue))
        }
        return accumulator
      },
      []
    )

    // const indexOfNameStart = dataString.indexOf('姓名') + '姓名'.length
    const indexOfNameStart = (string: string) => {
      if (string.includes('姓名')) {
        return string.indexOf('姓名') + '姓名'.length
      } else if (string.includes('姓')) {
        return string.indexOf('姓') + '姓X'.length
      } else if (string.includes('名')) {
        return string.indexOf('名') + '名'.length
      } else {
        return -1
      }
    }
    const indexOfNameEnd = Math.min(...indexOfExistingKeywords)
    const indexOfIdStart = dataString.search(/\d{9}/) - 1 // 9 consecutive numbers + 1 English character before it
    const indexOfIdEnd = indexOfIdStart + 10
    const isEnglishLetter = /^[A-Z]*$/

    const _name = stringWithOnlyChineseLetters.slice(
      indexOfNameStart(stringWithOnlyChineseLetters),
      indexOfNameEnd
    )

    const name = removeNonNameString(_name)

    const id = dataString.slice(indexOfIdStart, indexOfIdEnd)

    const nameAndIdAreValid =
      name !== '' && id !== '' && isEnglishLetter.test(id[0])

    const result = {
      id: id,
      name: name,
      address: '',
    }
    if (nameAndIdAreValid) {
      return result
    }
  }

  if (idCardOrientation === 'back') {
    const addressWithoutAlphabets = dataString.replace(
      /([[\]&\-=/\\!^#,+()$~%.'":*?<>{}_;|。！＠＃＄％＾＆＊（）＿＋『』，？：、“”「」＝｜]|[A-Za-z])|@/g,
      ''
    )
    const indexOfAddressStart = (string: string) => {
      if (string.includes('住址')) {
        return string.indexOf('住址') + '住址'.length
      } else if (string.includes('住')) {
      } else {
        return -1
      }
    }
    const indexOfAddressEnd = addressWithoutAlphabets.search(/\d{10}/)

    const address = addressWithoutAlphabets.slice(
      indexOfAddressStart(addressWithoutAlphabets),
      indexOfAddressEnd
    )

    const addressWithoutLastNumbers =
      checkAndRemoveIfLastIsNumberString(address)

    const addressIsValid = addressWithoutLastNumbers !== ''
    const result = {
      id: '',
      name: '',
      address: addressWithoutLastNumbers,
    }
    if (addressIsValid) {
      return result
    }
  }
}

// In general, the address on ID cards in Taiwan(ROC) should not be ending with numbers => remove all ending numbers
const checkAndRemoveIfLastIsNumberString = (
  string: string
): string | Function => {
  if (isNaN(Number(string[string.length - 1]))) {
    return string
  } else {
    const removed = string.substring(0, string.length - 1)
    return checkAndRemoveIfLastIsNumberString(removed)
  }
}

// Remove listed keywords from name, just in case
const removeNonNameString = (string: string) => {
  const keywordList = ['中華', '民國']
  let cleanString = string
  for (let i = 0; i < keywordList.length; ) {
    if (cleanString.includes(keywordList[i])) {
      cleanString = cleanString.replace(keywordList[i], '')
    } else {
      i++
    }
  }

  return cleanString
}
