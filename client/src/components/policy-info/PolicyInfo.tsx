import { motion } from 'framer-motion'
import { Package, Truck, RotateCcw } from 'lucide-react'
import { StaggerContainer, AnimatedItem, scaleIn, iconSpinIn, ANIMATION_CONFIG, cardHover } from '@/components/animations'

export default function PolicyInfo() {
  const policies = [
    {
      icon: Package,
      title: 'Free Shipping',
      description: 'Free Shipping only on orders worth ₹499 and above.',
    },
    {
      icon: Truck,
      title: 'Smooth Delivery',
      description: 'Orders usually ship within 24 hours, but during busy times, it might take up to 2-3 business days.',
    },
    {
      icon: RotateCcw,
      title: 'Cancellation Policy',
      description: "You can cancel your order from your AM account as long as it hasn't been packed for shipping.",
      colSpan: 'sm:col-span-2 md:col-span-1',
    },
  ]

  return (
    <section className="dark bg-black text-white py-12 sm:py-14 md:py-16 px-3 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        <StaggerContainer
          staggerDelay={ANIMATION_CONFIG.stagger.slow}
          delayChildren={0.2}
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12"
        >
          {policies.map((policy, index) => {
            const IconComponent = policy.icon
            return (
              <AnimatedItem
                key={index}
                variants={scaleIn}
                className={`flex flex-col items-center text-center space-y-3 sm:space-y-4 ${'colSpan' in policy ? policy.colSpan : ''}`}
                whileHover={cardHover}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-1 sm:mb-2 relative"
                  variants={iconSpinIn}
                >
                  <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} fill="none" />
                </motion.div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {policy.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto px-2">
                  {policy.description}
                </p>
              </AnimatedItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

