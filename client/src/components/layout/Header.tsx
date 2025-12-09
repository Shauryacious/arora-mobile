import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SearchBar } from '@/components/ui/search-bar'
import { LoginModal } from '@/components/auth/LoginModal'
import { useCart } from '@/hooks/useCart'
import { ROUTES } from '@/routes'
import { cn } from '@/lib/utils'
import { fadeInDown } from '@/components/animations'

export default function Header() {
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-black border-b border-white/10 shadow-sm"
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
    >
      <div className="container flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 flex-shrink-0 min-w-0">
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 min-w-0"
          >
            <img 
              src="/logo.png" 
              alt="Arora Mobiles Logo" 
              className="h-8 w-auto sm:h-10 md:h-14 object-contain flex-shrink-0"
            />
            <span className="text-base sm:text-xl md:text-2xl font-bold text-white font-sans truncate">
              <span className="hidden xs:inline">Arora Mobiles</span>
              <span className="xs:hidden">Arora Mobiles</span>
            </span>
          </Link>
        </div>
        
        {/* Search Bar - Centered */}
        <div className="hidden md:flex flex-1 justify-center max-w-2xl mx-4">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 hover:bg-white/10 text-white touch-manipulation"
            onClick={() => setLoginModalOpen(true)}
          >
            <User className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
          <Link to={ROUTES.CART} className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 hover:bg-white/10 text-white touch-manipulation"
            >
              <ShoppingCart className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
                    >
                      {itemCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </Link>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 text-white hover:bg-white/10 touch-manipulation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[400px] bg-black border-l border-white/10">
              <SheetHeader className="pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center space-x-2 text-white font-sans">
                    <img 
                      src="/logo.png" 
                      alt="Arora Mobiles Logo" 
                      className="h-6 w-auto object-contain"
                    />
                    <span className="font-sans text-base sm:text-lg">Menu</span>
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-10 w-10 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </SheetHeader>
              {/* Mobile Search Bar */}
              <div className="mt-4 mb-4">
                <SearchBar />
              </div>
              <nav className="mt-6 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setLoginModalOpen(true)
                  }}
                  className={cn(
                    "px-4 py-3.5 text-base font-medium transition-all rounded-md flex items-center gap-3 text-left touch-manipulation min-h-[44px]",
                    "text-gray-300 active:text-white active:bg-white/10"
                  )}
                >
                  <User className="h-5 w-5 flex-shrink-0" />
                  <span>Login / Sign Up</span>
                </button>
                <Link
                  to={ROUTES.CART}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3.5 text-base font-medium transition-all rounded-md flex items-center justify-between touch-manipulation min-h-[44px]",
                    isActive(ROUTES.CART)
                      ? "text-white bg-white/10"
                      : "text-gray-300 active:text-white active:bg-white/10"
                  )}
                >
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <Badge variant="destructive" className="h-6 min-w-6 px-2 text-xs flex-shrink-0">
                      {itemCount}
                    </Badge>
                  )}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </motion.header>
  )
}

