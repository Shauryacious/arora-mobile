export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  brand: string
  model: string
  alt?: string
  inStock: boolean
  category?: string
}

export interface Brand {
  value: string
  text: string
}

export interface Model {
  value: string
  text: string
}

