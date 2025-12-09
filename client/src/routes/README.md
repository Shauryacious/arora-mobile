# Routes Configuration

This directory contains the routing configuration for the application.

## Files

- `index.tsx` - Main routes configuration using React Router's `RouteObject[]`
- `constants.ts` - Route path constants and route names for easy maintenance
- `types.ts` - TypeScript types for routes (for future enhancements like protected routes)

## Usage

### In Components

```tsx
import { Link } from 'react-router-dom'
import { ROUTES, ROUTE_NAMES } from '@/routes'

// Using route constants
<Link to={ROUTES.PRODUCTS}>Products</Link>
<Link to={ROUTES.PRODUCT_DETAIL(productId)}>View Product</Link>
```

### Route Constants

All route paths are centralized in `constants.ts`:

- `ROUTES.HOME` - `/`
- `ROUTES.PRODUCTS` - `/products`
- `ROUTES.PRODUCT_DETAIL(id)` - `/products/:id` (function that takes product ID)
- `ROUTES.CART` - `/cart`
- `ROUTES.CHECKOUT` - `/checkout`

### Route Names

Route names are available for breadcrumbs, page titles, etc.:

- `ROUTE_NAMES.HOME` - "Home"
- `ROUTE_NAMES.PRODUCTS` - "Products"
- etc.

## Adding New Routes

1. Add the route path to `constants.ts`:
```tsx
export const ROUTES = {
  // ... existing routes
  ABOUT: '/about',
} as const
```

2. Add the route name:
```tsx
export const ROUTE_NAMES = {
  // ... existing names
  ABOUT: 'About',
} as const
```

3. Add the route to `index.tsx`:
```tsx
import About from '@/pages/About'

export const routes: RouteObject[] = [
  // ... existing routes
  {
    path: ROUTES.ABOUT,
    element: <About />,
    handle: {
      name: ROUTE_NAMES.ABOUT,
    },
  },
]
```

## Benefits

- **Type Safety**: All routes are typed and checked at compile time
- **Maintainability**: Change a route path in one place, updates everywhere
- **Refactoring**: Easy to rename or restructure routes
- **Consistency**: Ensures all components use the same route paths

