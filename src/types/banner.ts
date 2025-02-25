export interface Banner {
  id: number
  title: string
  description: string
  image: string
}

export interface BannerData {
  banners: Banner[]
  currentBanner: number
  setCurrentBanner: (index: number) => void
} 