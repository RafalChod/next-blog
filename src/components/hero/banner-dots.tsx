'use client'

import { BannerData } from '@/types/banner'

export function BannerDots({ banners, currentBanner, setCurrentBanner }: BannerData) {
  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
      {banners.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentBanner(index)}
          className={`h-2 w-2 rounded-full transition-all ${
            currentBanner === index ? 'bg-indigo-600 w-4' : 'bg-indigo-300'
          }`}
        />
      ))}
    </div>
  )
} 