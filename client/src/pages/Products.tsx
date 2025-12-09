import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { ROUTES } from '@/routes'
import { ShoppingCart, Filter, X, Search } from 'lucide-react'
import { AnimatedContainer, StaggerContainer, AnimatedItem, productCardVariants, cardHover, fadeIn, ANIMATION_CONFIG } from '@/components/animations'

const BRANDS = [
  { value: 'apple-copy', text: 'Apple' },
  { value: 'samsung', text: 'Samsung' },
  { value: 'google', text: 'Google' },
  { value: 'oneplus', text: 'OnePlus' },
  { value: 'xiaomi', text: 'Xiaomi' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Derive state directly from URL params (single source of truth)
  const selectedBrand = searchParams.get('brand') || undefined
  const selectedModel = searchParams.get('model') || undefined
  const searchQuery = searchParams.get('search') || undefined
  
  const { products, loading } = useProducts()
  const { addItem } = useCart()

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
    <div className="container py-6 sm:py-8 md:py-10 bg-black px-3 sm:px-4">
      <AnimatedContainer direction="down" className="mb-6 sm:mb-8 md:mb-10 space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">Products</h1>
        <p className="text-base sm:text-lg text-gray-300">
          Browse our collection of premium phone skins
        </p>
      </AnimatedContainer>

      {/* Filters */}
      <AnimatedContainer direction="up" delay={0.1}>
        <Card className="mb-6 sm:mb-8 border-2 border-white/10 bg-black/50">
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
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <AnimatedItem
                key={product.id}
                variants={productCardVariants}
                whileHover={cardHover}
              >
                <Card 
                  className="flex flex-col overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all hover:shadow-lg group bg-black/50 h-full"
                >
                <Link to={ROUTES.PRODUCT_DETAIL(product.id)} className="relative touch-manipulation">
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
                </Link>
                <CardHeader className="space-y-2 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-base sm:text-lg leading-tight text-white">{product.name}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-300">{product.brand}</Badge>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-300">{product.model}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-end px-4 sm:px-6 pb-2">
                  <p className="text-xl sm:text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="flex gap-2 pt-2 pb-4 sm:pb-6 px-4 sm:px-6">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 text-sm sm:text-base h-10 sm:h-11 touch-manipulation"
                  >
                    <Link to={ROUTES.PRODUCT_DETAIL(product.id)}>View</Link>
                  </Button>
                  <Button
                    className="flex-1 group/btn text-sm sm:text-base h-10 sm:h-11 touch-manipulation"
                    onClick={() => addItem(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </CardFooter>
              </Card>
              </AnimatedItem>
            ))}
          </StaggerContainer>
        </>
      )}
    </div>
  )
}

