import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { loadProductsFromMetadata } from '@/lib/products'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const loadedProducts = await loadProductsFromMetadata()
        setProducts(loadedProducts)
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  return { products, loading }
}

