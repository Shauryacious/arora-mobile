import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, Smartphone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HoveredLink, Menu as NavMenu, MenuItem } from '@/components/ui/navbar-menu'
import { useCart } from '@/hooks/useCart'
import { ROUTES, ROUTE_NAMES } from '@/routes'
import { cn } from '@/lib/utils'

export default function Header() {
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full bg-black shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center space-x-3 group transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-black group-hover:bg-white/90 transition-colors">
              <Smartphone className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-white">
              Arora Mobiles
            </span>
          </Link>
          <div className="hidden md:block">
            <NavMenu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item={ROUTE_NAMES.HOME} href={ROUTES.HOME}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink to={ROUTES.HOME}>Home</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item={ROUTE_NAMES.PRODUCTS} href={ROUTES.PRODUCTS}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink to={ROUTES.PRODUCTS}>All Products</HoveredLink>
                  <HoveredLink to={ROUTES.PRODUCTS}>Browse Collection</HoveredLink>
                </div>
              </MenuItem>
            </NavMenu>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to={ROUTES.CART} className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative h-10 w-10 hover:bg-white/10 text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold animate-in zoom-in-50"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span>Menu</span>
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                <Link
                  to={ROUTES.HOME}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-all rounded-md",
                    isActive(ROUTES.HOME)
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {ROUTE_NAMES.HOME}
                </Link>
                <Link
                  to={ROUTES.PRODUCTS}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-all rounded-md",
                    isActive(ROUTES.PRODUCTS)
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {ROUTE_NAMES.PRODUCTS}
                </Link>
                <Link
                  to={ROUTES.CART}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-all rounded-md flex items-center justify-between",
                    isActive(ROUTES.CART)
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                      {itemCount}
                    </Badge>
                  )}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

