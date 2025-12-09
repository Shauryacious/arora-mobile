import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { ArrowLeft, ShoppingCart, Check, Package, Shield, Truck } from 'lucide-react'
import { ROUTES } from '@/routes'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { products } = useProducts()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container py-20 text-center space-y-4">
        <Alert variant="destructive">
          <AlertTitle className="text-2xl font-bold">Product not found</AlertTitle>
          <AlertDescription className="mt-2">
            The product you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-6">
          <Link to={ROUTES.PRODUCTS}>Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" className="mb-8 group">
        <Link to={ROUTES.PRODUCTS}>
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl border-2 bg-muted shadow-lg">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedImage === index
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="outline">{product.model}</Badge>
              {product.inStock ? (
                <Badge variant="default">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {product.description || 'Premium phone skin with high-quality materials and precision fit.'}
              </CardDescription>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model:</span>
                <span className="font-medium">{product.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

