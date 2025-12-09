import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/spotlight'
import { Sparkles, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/routes'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative flex min-h-[40rem] w-full overflow-hidden bg-black/[0.96] antialiased py-24 md:items-center md:justify-center md:py-40">
      {/* Grid Pattern Background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
      
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-4 w-4" />
            <span>Protect • Personalize • Perfect</span>
          </div>
          
          <h1 className="bg-opacity-50 bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Premium Phone Skins
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg font-normal leading-8 text-neutral-200 md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Protect and personalize your phone with high-quality, precision-cut skins. 
            Available for a wide range of brands and models.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button asChild size="lg" className="group text-base px-8 py-6 h-auto bg-white text-black hover:bg-neutral-100 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-semibold">
              <Link to={ROUTES.PRODUCTS}>
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-base px-8 py-6 h-auto text-white hover:bg-white/10 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 font-medium">
              <Link to={ROUTES.PRODUCTS}>Browse Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

