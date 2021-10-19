import type { IdCardData, ImageType, IdCardOrientation } from './common'

/**
 * 含稅轉未稅 (deprecated)
 * @param idCardOrientation - front or back
 * @param dataString - string
 */
export function parseIdCard(
  idCardOrientation: IdCardOrientation,
  dataString: string
): IdCardData

export function parseImageType(ocrString: string): ImageType
