import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/routes'
import { AnimatedContainer, fadeInLeft, fadeInRight, ANIMATION_CONFIG } from '@/components/animations'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { products } = useProducts()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container py-12 sm:py-16 md:py-20 text-center space-y-4 bg-black px-3 sm:px-4">
        <Alert variant="destructive" className="bg-black/50 border-white/10">
          <AlertTitle className="text-xl sm:text-2xl font-bold text-white">Product not found</AlertTitle>
          <AlertDescription className="mt-2 text-sm sm:text-base text-gray-300">
            The product you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-6 text-sm sm:text-base h-10 sm:h-11 touch-manipulation">
          <Link to={ROUTES.PRODUCTS}>Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-8 md:py-10 bg-black px-3 sm:px-4">
      <AnimatedContainer direction="left" className="mb-4 sm:mb-6 md:mb-8">
        <Button asChild variant="ghost" className="group text-sm sm:text-base h-9 sm:h-10 touch-manipulation">
          <Link to={ROUTES.PRODUCTS}>
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Link>
        </Button>
      </AnimatedContainer>

      <div className="grid gap-6 sm:gap-8 md:gap-12 lg:grid-cols-2">
        {/* Images */}
        <AnimatedContainer
          variants={fadeInLeft}
          duration={ANIMATION_CONFIG.duration.normal}
          className="space-y-3 sm:space-y-4"
        >
          <div className="aspect-square overflow-hidden rounded-lg sm:rounded-xl border-2 border-white/10 bg-black/50 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="eager"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all active:scale-105 touch-manipulation ${
                    selectedImage === index
                      ? 'border-white ring-2 ring-white/20'
                      : 'border-white/10 active:border-white/30'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </AnimatedContainer>

        {/* Product Info */}
        <AnimatedContainer
          variants={fadeInRight}
          duration={ANIMATION_CONFIG.duration.normal}
          delay={0.2}
          className="space-y-4 sm:space-y-6"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs sm:text-sm">{product.brand}</Badge>
              <Badge variant="outline" className="border-white/20 text-gray-300 text-xs sm:text-sm">{product.model}</Badge>
              {product.inStock ? (
                <Badge variant="default" className="bg-white text-black text-xs sm:text-sm">In Stock</Badge>
              ) : (
                <Badge variant="destructive" className="text-xs sm:text-sm">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white leading-tight">{product.name}</h1>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              ₹{product.price}
            </p>
          </div>

          <Card className="bg-black/50 border-white/10">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-lg sm:text-xl text-white">Description</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <CardDescription className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {product.description || 'Premium phone skin with high-quality materials and precision fit.'}
              </CardDescription>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              className="flex-1 text-sm sm:text-base h-11 sm:h-12 touch-manipulation"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1 text-sm sm:text-base h-11 sm:h-12 touch-manipulation">
              Buy Now
            </Button>
          </div>

          <Card className="bg-black/50 border-white/10">
            <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-lg sm:text-xl text-white">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm sm:text-base px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex justify-between py-1">
                <span className="text-gray-300">Brand:</span>
                <span className="font-medium text-white">{product.brand}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-300">Model:</span>
                <span className="font-medium text-white">{product.model}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-300">Availability:</span>
                <span className="font-medium text-white">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  )
}

