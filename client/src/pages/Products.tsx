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
  
  const { products, loading } = useProducts()
  const { addItem } = useCart()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedBrand && product.brand !== selectedBrand) return false
      if (selectedModel && product.model !== selectedModel) return false
      return true
    })
  }, [products, selectedBrand, selectedModel])

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

  const hasActiveFilters = Boolean(selectedBrand || selectedModel)

  // Show loading state
  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center animate-pulse">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Products</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection of premium phone skins
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium">Brand</Label>
              <Select
                value={selectedBrand || undefined}
                onValueChange={handleBrandChange}
              >
                <SelectTrigger id="brand" className="h-11">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  {BRANDS.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value}>
                      {brand.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="model" className="text-sm font-medium">Model</Label>
              <Select
                value={selectedModel || undefined}
                onValueChange={handleModelChange}
                disabled={!selectedBrand}
              >
                <SelectTrigger id="model" className="h-11" disabled={!selectedBrand}>
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {hasActiveFilters && (
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="h-11"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Active filters display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedBrand && (
                <Badge variant="secondary" className="gap-1">
                  Brand: {BRANDS.find(b => b.value === selectedBrand)?.text}
                  <button
                    onClick={() => handleBrandChange(undefined)}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedModel && (
                <Badge variant="secondary" className="gap-1">
                  Model: {selectedModel}
                  <button
                    onClick={() => handleModelChange(undefined)}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <Alert>
              <AlertDescription className="text-lg">
                No products found. Try adjusting your filters.
              </AlertDescription>
            </Alert>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <Link to={ROUTES.PRODUCT_DETAIL(product.id)} className="relative">
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                </Link>
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-lg leading-tight">{product.name}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{product.model}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-end">
                  <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="flex gap-2 pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1"
                  >
                    <Link to={ROUTES.PRODUCT_DETAIL(product.id)}>View</Link>
                  </Button>
                  <Button
                    className="flex-1 group/btn"
                    onClick={() => addItem(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

