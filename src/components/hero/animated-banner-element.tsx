'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  type: 'title' | 'description' | 'image'
  id: number
}

const animations = {
  title: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  },
  description: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.5, delay: 0.2 }
  },
  image: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.5 }
  }
}

const elementClasses = {
  title: "max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto",
  description: "text-pretty text-lg font-medium text-gray-500 sm:text-xl/8",
  image: "mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
}

export function AnimatedBannerElement({ children, type, id }: AnimatedElementProps) {
  const Element = type === 'image' ? motion.img : motion[type === 'title' ? 'h1' : 'p']
  
  return (
    <Element
      key={id}
      {...animations[type]}
      className={elementClasses[type]}
      {...(type === 'image' ? { alt: "" } : {})}
    >
      {children}
    </Element>
  )
} 