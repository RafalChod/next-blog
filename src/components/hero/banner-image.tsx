'use client'

import { motion } from 'framer-motion'
import { Banner } from '@/types/banner'

interface BannerImageProps {
  banner: Banner
}

export function BannerImage({ banner }: BannerImageProps) {
  return (
    <motion.img
      key={banner.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      alt=""
      src={banner.image}
      className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
    />
  )
} 