'use client'

import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AnimatedBannerElement } from './hero/animated-banner-element'
import { BannerDots } from './hero/banner-dots'
import { BannerCTA } from './hero/banner-cta'
import { Banner } from '@/types/banner'

// Define the banner data
const banners: Banner[] = [
  {
    id: 1,
    title: "We're changing the way people connect",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    image: "https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
  },
  {
    id: 2,
    title: "Innovation at your fingertips",
    description: "Transform your business with our cutting-edge solutions and expert guidance.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
  },
  {
    id: 3,
    title: "Building tomorrow, today",
    description: "Join us in creating a future where technology empowers everyone.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
  },
]

export default function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const banner = banners[currentBanner]

  // Auto-advance the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 6000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <AnimatePresence mode="wait">
              <AnimatedBannerElement type="title" id={banner.id}>
                {banner.title}
              </AnimatedBannerElement>
            </AnimatePresence>
            
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <AnimatePresence mode="wait">
                <AnimatedBannerElement type="description" id={banner.id}>
                  {banner.description}
                </AnimatedBannerElement>
              </AnimatePresence>
              <BannerCTA />
            </div>

            <AnimatePresence mode="wait">
              <AnimatedBannerElement type="image" id={banner.id}>
                {banner.image}
              </AnimatedBannerElement>
            </AnimatePresence>

            <BannerDots
              banners={banners}
              currentBanner={currentBanner}
              setCurrentBanner={setCurrentBanner}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  )
}