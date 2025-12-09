import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { Variants } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

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
        visible: typeof variants.visible === 'object' && variants.visible !== null
          ? {
              ...variants.visible,
              transition: {
                ...('transition' in variants.visible && typeof variants.visible.transition === 'object'
                  ? variants.visible.transition
                  : {}),
                delay,
              },
            }
          : variants.visible,
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

