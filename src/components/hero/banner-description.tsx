'use client'

import { motion } from 'framer-motion'
import { Banner } from '@/types/banner'

interface BannerDescriptionProps {
  banner: Banner
}

export function BannerDescription({ banner }: BannerDescriptionProps) {
  return (
    <motion.p
      key={banner.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8"
    >
      {banner.description}
    </motion.p>
  )
} 