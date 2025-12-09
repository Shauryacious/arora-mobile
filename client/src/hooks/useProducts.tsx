import { useState, useEffect } from 'react'
import { Product } from '@/types/product'

// Mock data - in production, this would come from an API
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Latte Bloom',
    description: 'Beautiful floral design with latte tones',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Latte+Bloom',
    images: [
      'https://via.placeholder.com/400x400?text=Latte+Bloom+1',
      'https://via.placeholder.com/400x400?text=Latte+Bloom+2',
    ],
    brand: 'apple-copy',
    model: 'iPhone 14 Pro',
    inStock: true,
  },
  {
    id: '2',
    name: 'Lilac Trip',
    description: 'Mosaic pattern in shades of purple and blue',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Lilac+Trip',
    images: [
      'https://via.placeholder.com/400x400?text=Lilac+Trip+1',
      'https://via.placeholder.com/400x400?text=Lilac+Trip+2',
    ],
    brand: 'apple-copy',
    model: 'iPhone 14 Pro',
    inStock: true,
  },
  {
    id: '3',
    name: 'Espresso Bloom',
    description: 'Dark brown floral pattern',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Espresso+Bloom',
    images: [
      'https://via.placeholder.com/400x400?text=Espresso+Bloom+1',
    ],
    brand: 'apple-copy',
    model: 'iPhone 14 Pro Max',
    inStock: true,
  },
  {
    id: '4',
    name: 'Mint Breeze',
    description: 'Vibrant mint green with white floral pattern',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Mint+Breeze',
    images: [
      'https://via.placeholder.com/400x400?text=Mint+Breeze+1',
    ],
    brand: 'apple-copy',
    model: 'iPhone 15 Pro',
    inStock: true,
  },
  {
    id: '5',
    name: 'Slow Summer',
    description: 'Whimsical summer picnic scene',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Slow+Summer',
    images: [
      'https://via.placeholder.com/400x400?text=Slow+Summer+1',
    ],
    brand: 'apple-copy',
    model: 'iPhone 14 Pro',
    inStock: true,
  },
  {
    id: '6',
    name: 'Coastal Mode',
    description: 'Beach and ocean themed design',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Coastal+Mode',
    images: [
      'https://via.placeholder.com/400x400?text=Coastal+Mode+1',
    ],
    brand: 'samsung',
    model: 'Galaxy S24',
    inStock: true,
  },
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS)
      setLoading(false)
    }, 500)
  }, [])

  return { products, loading }
}

