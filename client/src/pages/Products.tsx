import { useMemo, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { Filter, X, Search } from 'lucide-react'
import { AnimatedContainer, StaggerContainer, AnimatedItem, productCardVariants, cardHover, fadeIn, ANIMATION_CONFIG, fadeInLeft, fadeInRight } from '@/components/animations'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types/product'

const BRANDS = [
  { value: 'apple', text: 'Apple' },
  { value: 'samsung', text: 'Samsung' },
  { value: 'google', text: 'Google' },
  { value: 'oneplus', text: 'OnePlus' },
  { value: 'xiaomi', text: 'Xiaomi' },
  { value: 'nothing', text: 'Nothing' },
  { value: 'vivo', text: 'Vivo' },
  { value: 'oppo', text: 'Oppo' },
  { value: 'realme', text: 'Realme' },
  { value: 'motorola', text: 'Motorola' },
]

// Reusable Product Detail View Component
function ProductDetailView({ product, selectedImage, onImageChange }: { product: Product; selectedImage: number; onImageChange: (index: number) => void }) {
  const { addItem } = useCart()

  return (
    <div className="space-y-2 flex flex-col">
      {/* Images */}
      <AnimatedContainer
        variants={fadeInLeft}
        duration={ANIMATION_CONFIG.duration.normal}
        className="space-y-3 flex-shrink-0"
      >
        <div className="w-full aspect-square overflow-hidden rounded-lg bg-black/50 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="eager"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-1.5">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageChange(index)}
                className={`aspect-square overflow-hidden rounded border-2 transition-all active:scale-105 touch-manipulation ${
                  selectedImage === index
                    ? 'border-white ring-1 ring-white/20'
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
        className="space-y-2 flex-1 flex flex-col min-h-0"
      >
        <div className="flex-shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">{product.brand}</Badge>
            <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">{product.model}</Badge>
            {product.inStock ? (
              <Badge variant="default" className="bg-white text-black text-xs">In Stock</Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
            )}
          </div>
          <h1 className="text-lg sm:text-xl font-bold mb-1 text-white leading-tight">{product.name}</h1>
          <p className="text-xl sm:text-2xl font-bold text-white">
            ₹499
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <Button
            size="lg"
            className="flex-1 text-xs sm:text-sm h-9 sm:h-10 touch-manipulation"
            onClick={() => addItem(product)}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
          <Button size="lg" variant="outline" className="flex-1 text-xs sm:text-sm h-9 sm:h-10 touch-manipulation">
            Buy Now
          </Button>
        </div>

        <Card className="bg-black/50 border-0 flex-shrink-0">
          <CardHeader className="px-4 pt-2.5 pb-2">
            <CardTitle className="text-sm sm:text-base text-white">Description</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-2.5">
            <CardDescription className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
              {product.description || 'Premium phone skin with high-quality materials and precision fit.'}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-0 flex-shrink-0">
          <CardHeader className="px-4 pt-2.5 pb-2">
            <CardTitle className="text-sm sm:text-base text-white">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs sm:text-sm px-4 pb-2.5">
            <div className="flex justify-between py-0.5">
              <span className="text-gray-300">Brand:</span>
              <span className="font-medium text-white">{product.brand}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-300">Model:</span>
              <span className="font-medium text-white">{product.model}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-300">Availability:</span>
              <span className="font-medium text-white">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  
  // Derive state directly from URL params (single source of truth)
  const selectedBrand = searchParams.get('brand') || undefined
  const selectedModel = searchParams.get('model') || undefined
  const searchQuery = searchParams.get('search') || undefined
  
  const { products, loading } = useProducts()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.model.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }
      // Brand filter
      if (selectedBrand && product.brand !== selectedBrand) return false
      // Model filter
      if (selectedModel && product.model !== selectedModel) return false
      return true
    })
  }, [products, selectedBrand, selectedModel, searchQuery])

  const availableModels = useMemo(() => {
    const models = new Set<string>()
    products
      .filter((p) => !selectedBrand || p.brand === selectedBrand)
      .forEach((p) => models.add(p.model))
    return Array.from(models).sort()
  }, [products, selectedBrand])

  // Auto-select first product when filtered products change
  useEffect(() => {
    if (filteredProducts.length > 0 && !selectedProduct) {
      setSelectedProduct(filteredProducts[0])
    } else if (filteredProducts.length > 0 && selectedProduct) {
      // If current selected product is not in filtered list, select first filtered product
      const isStillAvailable = filteredProducts.some(p => p.id === selectedProduct.id)
      if (!isStillAvailable) {
        setSelectedProduct(filteredProducts[0])
        setSelectedImage(0)
      }
    } else if (filteredProducts.length === 0) {
      setSelectedProduct(null)
    }
  }, [filteredProducts])

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImage(0)
  }, [selectedProduct?.id])

  // Match left panel height to right panel height
  useEffect(() => {
    const updateLeftPanelHeight = () => {
      if (leftPanelRef.current && rightPanelRef.current && window.innerWidth >= 1024) {
        const rightHeight = rightPanelRef.current.offsetHeight
        leftPanelRef.current.style.height = `${rightHeight}px`
      } else if (leftPanelRef.current && window.innerWidth < 1024) {
        leftPanelRef.current.style.height = 'auto'
      }
    }

    updateLeftPanelHeight()
    
    // Update on window resize
    window.addEventListener('resize', updateLeftPanelHeight)
    
    // Update when product changes (right panel content changes)
    const timeoutId = setTimeout(updateLeftPanelHeight, 100)
    
    return () => {
      window.removeEventListener('resize', updateLeftPanelHeight)
      clearTimeout(timeoutId)
    }
  }, [selectedProduct, selectedImage])

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setSelectedImage(0)
    // Open mobile sheet on small screens
    if (window.innerWidth < 1024) {
      setMobileSheetOpen(true)
    }
  }

  const handleBrandChange = (brand: string | undefined) => {
    const params = new URLSearchParams(searchParams)
    if (brand) {
      params.set('brand', brand)
    } else {
      params.delete('brand')
    }
    params.delete('model') // Reset model when brand changes
    setSearchParams(params, { replace: true })
  }

  const handleModelChange = (model: string | undefined) => {
    const params = new URLSearchParams(searchParams)
    if (model) {
      params.set('model', model)
    } else {
      params.delete('model')
    }
    setSearchParams(params, { replace: true })
  }
  
  const handleClearFilters = () => {
    setSearchParams({}, { replace: true })
  }

  const hasActiveFilters = Boolean(selectedBrand || selectedModel || searchQuery)

  // Show loading state
  if (loading) {
    return (
      <div className="container py-12 sm:py-16 md:py-20 text-center bg-black px-3 sm:px-4">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
            <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />
          </div>
          <p className="text-base sm:text-lg text-gray-300">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black flex flex-col">
      {/* Header */}
      <div className="container py-4 sm:py-6 px-3 sm:px-4 flex-shrink-0 border-b border-white/10">
        <AnimatedContainer direction="down" className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">Products</h1>
          <p className="text-sm sm:text-base text-gray-300">
          Browse our collection of premium phone skins
        </p>
      </AnimatedContainer>
      </div>

      {/* Filters - Separate Section */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <div className="container py-4 sm:py-6 px-3 sm:px-4">
          <AnimatedContainer direction="up" delay={0.1}>
            <Card className="border-2 border-white/10 bg-black/50">
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  <CardTitle className="text-base sm:text-lg text-white">Filters</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="brand" className="text-sm font-medium text-white">Brand</Label>
                    <Select
                      value={selectedBrand || undefined}
                      onValueChange={handleBrandChange}
                    >
                      <SelectTrigger id="brand" className="h-11 sm:h-12 text-base touch-manipulation">
                        <SelectValue placeholder="All Brands" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANDS.map((brand) => (
                          <SelectItem key={brand.value} value={brand.value} className="text-base">
                            {brand.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium text-white">Model</Label>
                    <Select
                      value={selectedModel || undefined}
                      onValueChange={handleModelChange}
                      disabled={!selectedBrand}
                    >
                      <SelectTrigger id="model" className="h-11 sm:h-12 text-base touch-manipulation" disabled={!selectedBrand}>
                        <SelectValue placeholder="All Models" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model} value={model} className="text-base">
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {hasActiveFilters && (
                    <div className="flex items-end sm:flex-shrink-0">
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        className="h-11 sm:h-12 w-full sm:w-auto text-base touch-manipulation"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Active filters display */}
                {hasActiveFilters && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                    <span className="text-xs sm:text-sm text-gray-300 w-full sm:w-auto">Active filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1 bg-white/10 text-white border-white/20 text-xs sm:text-sm py-1 px-2">
                        Search: {searchQuery}
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams)
                            params.delete('search')
                            setSearchParams(params, { replace: true })
                          }}
                          className="ml-1 active:bg-destructive/20 rounded-full p-1 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedBrand && (
                      <Badge variant="secondary" className="gap-1 text-xs sm:text-sm py-1 px-2">
                        Brand: {BRANDS.find(b => b.value === selectedBrand)?.text}
                        <button
                          onClick={() => handleBrandChange(undefined)}
                          className="ml-1 active:bg-destructive/20 rounded-full p-1 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedModel && (
                      <Badge variant="secondary" className="gap-1 text-xs sm:text-sm py-1 px-2">
                        Model: {selectedModel}
                        <button
                          onClick={() => handleModelChange(undefined)}
                          className="ml-1 active:bg-destructive/20 rounded-full p-1 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
          
      {/* Main Content - Split View */}
      <div className="flex flex-col lg:flex-row lg:items-start">
        {/* Left Side - Product List */}
        <div ref={leftPanelRef} className="w-full lg:w-1/2 border-r border-white/10 lg:overflow-y-auto">
          <div className="container py-4 sm:py-6 px-3 sm:px-4">

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 sm:py-16 md:py-20 text-center bg-black px-3 sm:px-4">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />
            </div>
            <Alert className="bg-black/50 border-white/10">
              <AlertDescription className="text-base sm:text-lg text-white">
                No products found. Try adjusting your filters.
              </AlertDescription>
            </Alert>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="text-sm sm:text-base h-10 sm:h-11 touch-manipulation"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <AnimatedContainer variants={fadeIn} className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-300 px-1">
            Showing <span className="font-semibold text-white">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </AnimatedContainer>
          <StaggerContainer
            staggerDelay={ANIMATION_CONFIG.stagger.fast}
            delayChildren={0.1}
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <AnimatedItem
                key={product.id}
                variants={productCardVariants}
                whileHover={cardHover}
              >
                <Card 
                  className={`flex flex-col overflow-hidden border-2 transition-all hover:shadow-lg group bg-black/50 h-full cursor-pointer ${
                    selectedProduct?.id === product.id 
                      ? 'border-white/50 ring-2 ring-white/20' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="relative touch-manipulation">
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="destructive" className="text-xs sm:text-sm">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  </div>
                <CardHeader className="space-y-2 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-base sm:text-lg leading-tight text-white">{product.name}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
              </AnimatedItem>
            ))}
          </StaggerContainer>
        </>
      )}
          </div>
        </div>

        {/* Right Side - Product Detail (Desktop) */}
        <div ref={rightPanelRef} className="hidden lg:flex lg:w-1/2 bg-black/30">
          <div className="w-full py-6 px-6 sm:px-8 flex flex-col">
            {selectedProduct ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductDetailView 
                    product={selectedProduct} 
                    selectedImage={selectedImage} 
                    onImageChange={setSelectedImage} 
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-300" />
                  </div>
                  <p className="text-lg text-gray-300">Select a product to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sheet for Product Details */}
      <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto bg-black border-t border-white/10">
          {selectedProduct && (
            <ProductDetailView 
              product={selectedProduct} 
              selectedImage={selectedImage} 
              onImageChange={setSelectedImage} 
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

