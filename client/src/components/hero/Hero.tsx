import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/spotlight'
import { Sparkles, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/routes'
import { cn } from '@/lib/utils'
import { createStaggerContainer, fadeInUp, ANIMATION_CONFIG } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative flex min-h-[32rem] sm:min-h-[36rem] md:min-h-[40rem] w-full overflow-hidden bg-black/[0.96] antialiased py-12 sm:py-16 md:py-24 md:items-center md:justify-center md:py-40 px-3 sm:px-4">
      {/* Grid Pattern Background */}
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:30px_30px] sm:[background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_CONFIG.duration.slower }}
      />
      
      {/* Spotlight Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_CONFIG.duration.slower, ease: ANIMATION_CONFIG.easing.easeOut }}
      >
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
      </motion.div>
      
      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center space-y-4 sm:space-y-6 md:space-y-8"
          variants={createStaggerContainer(ANIMATION_CONFIG.stagger.slow, 0.2)}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium mb-2 sm:mb-4 backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Protect • Personalize • Perfect</span>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="bg-opacity-50 bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight text-transparent px-2"
          >
            Premium Phone Skins
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg font-normal leading-6 sm:leading-7 md:leading-8 text-neutral-200 px-4"
          >
            Protect and personalize your phone with high-quality, precision-cut skins. 
            Available for a wide range of brands and models.
          </motion.p>
          
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4"
          >
            <Button asChild size="lg" className="group w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto bg-white text-black hover:bg-neutral-100 active:bg-neutral-200 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-semibold touch-manipulation">
              <Link to={ROUTES.PRODUCTS}>
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto text-white hover:bg-white/10 active:bg-white/20 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 font-medium touch-manipulation">
              <Link to={ROUTES.PRODUCTS}>Browse Collection</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

