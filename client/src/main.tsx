import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from './hooks/useCart'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ErrorPage from './pages/ErrorPage'
import { ROUTES } from './routes'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <Products />,
      },
      {
        path: `${ROUTES.PRODUCTS}/:id`,
        element: <ProductDetail />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: '*',
        element: <Home />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
)

