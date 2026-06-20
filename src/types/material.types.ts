export type MaterialType = 'wood' | 'concrete' | 'glass' | 'stone' | 'metal'

export interface MaterialData {
  id: MaterialType
  name: string
  description: string
  applications: string[]
  image: string
}
