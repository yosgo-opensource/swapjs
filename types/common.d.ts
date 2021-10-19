export interface Month {
  left: number
  right: number
}

export type Code = '50' | '9A' | '9B'

export type IdCardOrientation = 'front' | 'back'

export type IdCardData = {
  id: string
  name: string
  address: string
}

export type ImageType = 'id_front' | 'id_back' | 'bank' | null
