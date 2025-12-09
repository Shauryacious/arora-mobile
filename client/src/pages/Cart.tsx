import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useCart } from '@/hooks/useCart'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { ROUTES } from '@/routes'
import { AnimatedContainer, StaggerContainer, AnimatedItem, listItemVariants, fadeInRight, ANIMATION_CONFIG } from '@/components/animations'

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container py-12 sm:py-16 md:py-20 bg-black px-3 sm:px-4">
        <div className="mx-auto max-w-md text-center space-y-4">
          <ShoppingBag className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
          <Alert className="bg-black/50 border-white/10">
            <AlertTitle className="text-xl sm:text-2xl font-bold text-white">Your cart is empty</AlertTitle>
            <AlertDescription className="mt-2 text-sm sm:text-base text-gray-300">
              Start shopping to add items to your cart
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
      <AnimatedContainer direction="down" className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">Shopping Cart</h1>
        <p className="text-sm sm:text-base text-gray-300">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </AnimatedContainer>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <StaggerContainer
          staggerDelay={ANIMATION_CONFIG.stagger.normal}
          className="lg:col-span-2 space-y-3 sm:space-y-4"
        >
          <AnimatePresence>
            {items.map((item) => (
              <AnimatedItem
                key={item.id}
                variants={listItemVariants}
                exit="exit"
                layout
              >
                <Card className="bg-black/50 border-white/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base text-white line-clamp-2">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 mb-2">
                      {item.brand} • {item.model}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
              </AnimatedItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>

        <AnimatedContainer
          variants={fadeInRight}
          delay={0.2}
          className="lg:col-span-1"
        >
          <Card className="sticky top-16 sm:top-20 bg-black/50 border-white/10">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-lg sm:text-xl text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-white text-xs sm:text-sm">Calculated at checkout</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex justify-between font-semibold text-base sm:text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-white">₹{total}</span>
                </div>
              </div>
              <Button asChild className="w-full text-sm sm:text-base h-11 sm:h-12 touch-manipulation" size="lg">
                <Link to={ROUTES.CHECKOUT}>Proceed to Checkout</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full text-sm sm:text-base h-10 sm:h-11 touch-manipulation"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  )
}

