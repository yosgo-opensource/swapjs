export const parseImageType = (ocrString: string) => {
  const containsIdCardFrontKeywords =
    ocrString.includes('身分證') ||
    (ocrString.includes('中華民國') &&
      ocrString.includes('統一') &&
      ocrString.includes('姓名') &&
      ocrString.includes('出生') &&
      ocrString.search(/\d{9}/) !== -1) // 9 digits of id number

  const containsIdCardBackKeywords =
    (ocrString.includes('役別') || ocrString.includes('役别')) &&
    ocrString.includes('配偶') &&
    ocrString.includes('住址') &&
    ocrString.search(/\d{10}/) !== -1 // 10 digits of serial number
  if (containsIdCardFrontKeywords) {
    return 'id_front'
  } else if (containsIdCardBackKeywords) {
    return 'id_back'
  } else {
    return null
  }
}
