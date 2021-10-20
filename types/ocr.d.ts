import type { IdCardData, ImageType, IdCardOrientation } from './common'

/**
 * @param idCardOrientation - front or back
 * @param dataString - string
 */
export function parseIdCard(
  idCardOrientation: IdCardOrientation,
  dataString: string
): IdCardData

export function parseImageType(ocrString: string): ImageType
