'use client'

import { motion } from 'framer-motion'
import { Banner } from '@/types/banner'

interface BannerTitleProps {
  banner: Banner
}

export function BannerTitle({ banner }: BannerTitleProps) {
  return (
    <motion.h1
      key={banner.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto"
    >
      {banner.title}
    </motion.h1>
  )
} 