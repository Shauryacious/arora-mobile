import { Variants } from 'framer-motion'

/**
 * Animation Configuration
 * Centralized timing and easing values for consistent animations across the app
 */
export const ANIMATION_CONFIG = {
  // Durations (in seconds)
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    slower: 1.2,
  },
  
  // Easing functions (cubic-bezier curves)
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    bounce: [0.34, 1.56, 0.64, 1] as const,
    easeOut: [0.16, 1, 0.3, 1] as const,
    easeIn: [0.7, 0, 0.84, 0] as const,
  },
  
  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  
  // Viewport settings
  viewport: {
    once: true,
    margin: '-100px' as const,
  },
} as const

/**
 * Common Animation Variants
 * Reusable animation variants for consistent behavior
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

export const scaleInWithRotate: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0, 
    rotate: -180 
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.bounce,
    },
  },
}

/**
 * Container Variants
 * For staggered animations of child elements
 */
export const createStaggerContainer = (
  staggerDelay: number = ANIMATION_CONFIG.stagger.normal,
  delayChildren: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
})

/**
 * Page Transition Variants
 */
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

/**
 * Card Hover Animation
 */
export const cardHover = {
  y: -5,
  transition: { 
    duration: ANIMATION_CONFIG.duration.fast,
    ease: ANIMATION_CONFIG.easing.smooth,
  },
}

/**
 * Icon Animation Variants
 */
export const iconSpinIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0, 
    rotate: -180 
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

/**
 * List Item Variants (for cart, products, etc.)
 */
export const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

/**
 * Product Card Variants
 */
export const productCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
}

