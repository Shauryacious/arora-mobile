import { Link } from 'react-router-dom'
import { Smartphone, Mail, Truck, RotateCcw, FileText, Shield } from 'lucide-react'
import { ROUTES } from '@/routes'

export default function Footer() {
  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Arora Mobiles</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium phone skins for your device. Protect and personalize your
              phone with our high-quality, precision-cut skins.
            </p>
          </div>

          {/* Shop Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to={ROUTES.PRODUCTS}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.PRODUCTS}?brand=apple-copy`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                  Apple
                </Link>
              </li>
              <li>
                <Link
                  to={`${ROUTES.PRODUCTS}?brand=samsung`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                  Samsung
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <Mail className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <Truck className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <RotateCcw className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <Shield className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <FileText className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Arora Mobiles. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Made with ❤️ for your devices</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

