import { AnimatedContainer } from '@/components/animations'
import { Hero } from '@/components/hero/Hero'
import { MobileBrandLogoLoop } from '@/components/logo-loop/MobileBrandLogos'
import PolicyInfo from '@/components/policy-info/PolicyInfo'
import ProductSpecification from '@/components/product-specification/ProductSpecification'

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-black">
      <Hero />

      {/* Logo Loop Section */}
      <AnimatedContainer direction="up" delay={0.1}>
        <MobileBrandLogoLoop />
      </AnimatedContainer>

      {/* Policy Info Section */}
      <AnimatedContainer direction="up" delay={0.2}>
        <PolicyInfo />
      </AnimatedContainer>

      {/* Product Specification Section */}
      <AnimatedContainer direction="up" delay={0.3}>
        <ProductSpecification />
      </AnimatedContainer>
    </div>
  )
}

