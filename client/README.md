# Arora Mobiles - E-Commerce Frontend

A modern e-commerce website for selling phone skins, built with React, Vite, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Features

- 🛍️ **Product Catalog** - Browse phone skins by brand and model
- 🛒 **Shopping Cart** - Add items to cart with real-time updates
- 💳 **Checkout Process** - Complete checkout flow
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Modern UI** - Built with shadcn/ui components
- ⚡ **Fast Performance** - Powered by Vite and Tailwind CSS v4

## Tech Stack

- **React 18** - UI library
- **Vite 6** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4.1** - Latest utility-first CSS framework with @theme directive
- **shadcn/ui** - High-quality component library (new-york style)
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   └── layout/      # Layout components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   ├── lib/             # Utility functions
│   └── App.tsx          # Main app component
├── components.json      # shadcn/ui configuration
├── public/              # Static assets
└── package.json         # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Product Catalog
- Filter products by brand and model
- Responsive grid layout
- Product cards with images and details

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculation
- Persistent cart state

### Checkout
- Shipping information form
- Order summary
- Order confirmation

## Tailwind CSS v4

This project uses **Tailwind CSS v4.1** with the new `@theme` directive and Vite plugin:

- **Simplified Setup**: Uses `@import "tailwindcss"` instead of separate directives
- **Vite Plugin**: First-party `@tailwindcss/vite` plugin for optimal performance
- **Theme Configuration**: Uses `@theme` directive in CSS for better performance
- **No Config File**: No `tailwind.config.js` needed - everything is in CSS

## shadcn/ui Setup

This project uses shadcn/ui with the "new-york" style:

- Components are in `src/components/ui/`
- Configuration in `components.json`
- Uses CSS variables for theming
- Compatible with Tailwind CSS v4

## Customization

### Adding Products

Products are currently using mock data in `src/hooks/useProducts.tsx`. To connect to a real API:

1. Update the `useProducts` hook to fetch from your API
2. Update the product type definitions in `src/types/product.ts` if needed

### Styling

The app uses Tailwind CSS v4 with a custom theme. Modify colors and styles in:
- `src/index.css` - Theme variables using `@theme` directive
- Components use `hsl(var(--color-*))` for colors

### Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
