/**
 * Route path constants
 * Centralized route paths for easy maintenance and refactoring
 */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
} as const

/**
 * Route names for navigation and breadcrumbs
 */
export const ROUTE_NAMES = {
  HOME: 'Home',
  PRODUCTS: 'Products',
  PRODUCT_DETAIL: 'Product Details',
  CART: 'Shopping Cart',
  CHECKOUT: 'Checkout',
} as const

