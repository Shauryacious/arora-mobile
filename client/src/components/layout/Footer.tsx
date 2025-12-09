import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Truck, RotateCcw, FileText, Shield } from 'lucide-react'
import { ROUTES } from '@/routes'

export default function Footer() {
  return (
    <motion.footer
      className="dark border-t border-white/10 bg-black text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/logo.png" 
                alt="Arora Mobiles Logo" 
                className="h-8 w-auto sm:h-10 object-contain flex-shrink-0"
              />
              <h3 className="text-base sm:text-lg font-bold text-white">Arora Mobiles</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Premium phone skins for your device. Protect and personalize your
              phone with our high-quality, precision-cut skins.
            </p>
          </div>

          {/* Shop Section */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">Shop</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <Link
                  to={ROUTES.PRODUCTS}
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/0 group-active:bg-white transition-colors flex-shrink-0" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.PRODUCTS}?brand=apple-copy`}
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/0 group-active:bg-white transition-colors flex-shrink-0" />
                  Apple
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.PRODUCTS}?brand=samsung`}
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/0 group-active:bg-white transition-colors flex-shrink-0" />
                  Samsung
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-active:text-white transition-colors flex-shrink-0" />
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-active:text-white transition-colors flex-shrink-0" />
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-active:text-white transition-colors flex-shrink-0" />
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-active:text-white transition-colors flex-shrink-0" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 active:text-white transition-colors flex items-center gap-2 group touch-manipulation min-h-[32px]"
                >
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-active:text-white transition-colors flex-shrink-0" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-300 text-center md:text-left">
              &copy; {new Date().getFullYear()} Arora Mobiles. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300">
              <span className="hidden sm:inline">Made with ❤️ for your devices</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

