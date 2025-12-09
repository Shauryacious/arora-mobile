import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { Variants } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/lib/animations'

interface AnimatedContainerProps extends Omit<MotionProps, 'variants' | 'initial' | 'animate'> {
  children: ReactNode
  variants?: Variants
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  duration?: number
  className?: string
  viewport?: {
    once?: boolean
    margin?: string
  }
}

/**
 * Reusable animated container component
 * Wraps children with fade-in and slide animations
 */
export function AnimatedContainer({
  children,
  variants,
  direction = 'up',
  delay = 0,
  duration,
  className,
  viewport = ANIMATION_CONFIG.viewport,
  ...props
}: AnimatedContainerProps) {
  const defaultVariants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration || ANIMATION_CONFIG.duration.normal,
          delay,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
      },
    },
    down: {
      hidden: { opacity: 0, y: -30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration || ANIMATION_CONFIG.duration.normal,
          delay,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
      },
    },
    left: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: duration || ANIMATION_CONFIG.duration.normal,
          delay,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: duration || ANIMATION_CONFIG.duration.normal,
          delay,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: duration || ANIMATION_CONFIG.duration.normal,
          delay,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: duration || ANIMATION_CONFIG.duration.normal,
          delay,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
      },
    },
  }

  const animationVariants = variants || defaultVariants[direction]

  return (
    <motion.div
      variants={animationVariants}
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

