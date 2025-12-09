import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { Variants } from 'framer-motion'
import { createStaggerContainer, ANIMATION_CONFIG } from '@/lib/animations'

interface StaggerContainerProps extends Omit<MotionProps, 'variants' | 'initial' | 'animate'> {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
  viewport?: {
    once?: boolean
    margin?: string
  }
}

/**
 * Container that animates children in a staggered fashion
 */
export function StaggerContainer({
  children,
  staggerDelay = ANIMATION_CONFIG.stagger.normal,
  delayChildren = 0.1,
  className,
  viewport = ANIMATION_CONFIG.viewport,
  ...props
}: StaggerContainerProps) {
  const variants = createStaggerContainer(staggerDelay, delayChildren)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

