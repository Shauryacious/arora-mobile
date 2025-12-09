import { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import { ROUTES, ROUTE_NAMES } from './constants'

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
    handle: {
      name: ROUTE_NAMES.HOME,
    },
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Products />,
    handle: {
      name: ROUTE_NAMES.PRODUCTS,
    },
  },
  {
    path: `${ROUTES.PRODUCTS}/:id`,
    element: <ProductDetail />,
    handle: {
      name: ROUTE_NAMES.PRODUCT_DETAIL,
    },
  },
  {
    path: ROUTES.CART,
    element: <Cart />,
    handle: {
      name: ROUTE_NAMES.CART,
    },
  },
  {
    path: ROUTES.CHECKOUT,
    element: <Checkout />,
    handle: {
      name: ROUTE_NAMES.CHECKOUT,
    },
  },
]

// Export route constants for use in components
export { ROUTES, ROUTE_NAMES }

