# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## What's Included

✅ React 18 with TypeScript  
✅ Vite 6 for fast development  
✅ **Tailwind CSS v4.1** - Latest version with @theme directive  
✅ **shadcn/ui** - Latest version with new-york style  
✅ React Router for navigation  
✅ Shopping cart functionality  
✅ Product filtering by brand/model  
✅ Responsive design  

## Latest Updates (November 2025)

### Tailwind CSS v4.1
- Uses `@import "tailwindcss"` syntax
- First-party Vite plugin (`@tailwindcss/vite`)
- `@theme` directive for configuration
- No `tailwind.config.js` needed
- Improved performance (5x faster builds)

### shadcn/ui
- Updated for Tailwind CSS v4 compatibility
- "new-york" style (replaces "default")
- Components use CSS variables with HSL format
- Better TypeScript support

## Next Steps

1. **Connect to Real API**: Update `src/hooks/useProducts.tsx` to fetch from your backend
2. **Add More Products**: Update the mock data or connect to your database
3. **Customize Styling**: Modify `src/index.css` using the `@theme` directive
4. **Add Payment Integration**: Integrate Stripe, PayPal, or your preferred payment gateway
5. **Add Authentication**: Implement user accounts and login
6. **Add More Components**: Use `npx shadcn@latest add [component]` to add more UI components

## Project Structure

- `src/components/ui/` - Reusable UI components (shadcn/ui)
- `src/components/layout/` - Layout components (Header, Footer)
- `src/pages/` - Page components (Home, Products, Cart, Checkout)
- `src/hooks/` - Custom React hooks (useCart, useProducts)
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions
- `components.json` - shadcn/ui configuration
- `src/index.css` - Tailwind CSS v4 theme configuration

## Troubleshooting

If you encounter any issues:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Make sure you're using Node.js 18 or higher
4. Clear Vite cache: `rm -rf node_modules/.vite`

## Adding shadcn/ui Components

To add new components from shadcn/ui:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# etc.
```

Components will be added to `src/components/ui/` automatically.
