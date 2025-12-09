import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Shield, Palette, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/routes'
import { Hero } from '@/components/hero/Hero'
import { MobileBrandLogoLoop } from '@/components/logo-loop/MobileBrandLogos'
import PolicyInfo from '@/components/policy-info/PolicyInfo'

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero />

      {/* Logo Loop Section */}
      <MobileBrandLogoLoop />

      {/* Policy Info Section */}
      <PolicyInfo />
    </div>
  )
}

