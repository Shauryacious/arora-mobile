import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useCart } from '@/hooks/useCart'
import { ArrowLeft, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes'
import { AnimatedContainer, StaggerContainer, AnimatedItem, iconSpinIn, fadeInUp, fadeInLeft, fadeInRight, ANIMATION_CONFIG } from '@/components/animations'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleCheckout = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
    clearCart()
  }

  if (isComplete) {
    return (
      <div className="container py-12 sm:py-16 md:py-20 bg-black px-3 sm:px-4">
        <StaggerContainer
          staggerDelay={ANIMATION_CONFIG.stagger.normal}
          delayChildren={0.1}
          className="mx-auto max-w-md text-center"
        >
          <motion.div
            className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/10"
            variants={iconSpinIn}
          >
            <Check className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </motion.div>
          <AnimatedItem variants={fadeInUp} delay={0.2}>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Order Placed!
            </h1>
          </AnimatedItem>
          <AnimatedItem variants={fadeInUp} delay={0.3}>
            <p className="text-sm sm:text-base text-gray-300 mb-6 px-4">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </AnimatedItem>
          <AnimatedItem variants={fadeInUp} delay={0.4}>
            <Button asChild className="text-sm sm:text-base h-10 sm:h-11 touch-manipulation">
              <Link to={ROUTES.PRODUCTS}>Continue Shopping</Link>
            </Button>
          </AnimatedItem>
        </StaggerContainer>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container py-12 sm:py-16 md:py-20 bg-black px-3 sm:px-4">
        <div className="mx-auto max-w-md text-center space-y-4">
          <Alert className="bg-black/50 border-white/10">
            <AlertTitle className="text-xl sm:text-2xl font-bold text-white">Your cart is empty</AlertTitle>
            <AlertDescription className="mt-2 text-sm sm:text-base text-gray-300">
              Add items to your cart before checkout
            </AlertDescription>
          </Alert>
          <Button asChild className="mt-6 text-sm sm:text-base h-10 sm:h-11 touch-manipulation">
            <Link to={ROUTES.PRODUCTS}>Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-8 md:py-10 bg-black px-3 sm:px-4">
      <AnimatedContainer direction="left" className="mb-4 sm:mb-6">
        <Button asChild variant="ghost" className="text-sm sm:text-base h-9 sm:h-10 touch-manipulation">
          <Link to={ROUTES.CART}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </AnimatedContainer>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <AnimatedContainer
          variants={fadeInLeft}
          duration={ANIMATION_CONFIG.duration.normal}
          className="lg:col-span-2 space-y-4 sm:space-y-6"
        >
          <Card className="bg-black/50 border-white/10">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-lg sm:text-xl text-white">Shipping Information</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-300">
                Enter your shipping details to complete your order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm sm:text-base text-white">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-11 sm:h-12 text-base touch-manipulation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm sm:text-base text-white">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-11 sm:h-12 text-base touch-manipulation" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base text-white">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="h-11 sm:h-12 text-base touch-manipulation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm sm:text-base text-white">Address</Label>
                <Input id="address" placeholder="123 Main St" className="h-11 sm:h-12 text-base touch-manipulation" />
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm sm:text-base text-white">City</Label>
                  <Input id="city" placeholder="New York" className="h-11 sm:h-12 text-base touch-manipulation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm sm:text-base text-white">State</Label>
                  <Input id="state" placeholder="NY" className="h-11 sm:h-12 text-base touch-manipulation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-sm sm:text-base text-white">ZIP</Label>
                  <Input id="zip" placeholder="10001" className="h-11 sm:h-12 text-base touch-manipulation" />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer
          variants={fadeInRight}
          duration={ANIMATION_CONFIG.duration.normal}
          delay={0.2}
          className="lg:col-span-1"
        >
          <Card className="sticky top-16 sm:top-20 bg-black/50 border-white/10">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-lg sm:text-xl text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-300 line-clamp-1 pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-white font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between font-semibold text-base sm:text-lg">
                <span className="text-white">Total</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full text-sm sm:text-base h-11 sm:h-12 touch-manipulation"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  )
}

