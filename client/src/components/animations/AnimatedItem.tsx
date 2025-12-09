import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { Variants } from 'framer-motion'
import { fadeInUp, ANIMATION_CONFIG } from '@/lib/animations'

interface AnimatedItemProps extends Omit<MotionProps, 'variants'> {
  children: ReactNode
  variants?: Variants
  delay?: number
  className?: string
}

/**
 * Individual animated item for use within StaggerContainer
 */
export function AnimatedItem({
  children,
  variants = fadeInUp,
  delay,
  className,
  ...props
}: AnimatedItemProps) {
  const customVariants = delay
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay,
          },
        },
      }
    : variants

  return (
    <motion.div
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

