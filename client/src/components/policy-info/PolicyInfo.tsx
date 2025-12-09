import { Package, Truck, RotateCcw } from 'lucide-react'

export default function PolicyInfo() {
  return (
    <section className="dark bg-background text-foreground py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Free Shipping */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <Package className="w-14 h-14 text-foreground" strokeWidth={1.5} fill="none" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Free Shipping
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Free Shipping only on orders worth ₹999 and above.
            </p>
          </div>

          {/* Smooth Delivery */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center mb-2 relative">
              <Truck className="w-14 h-14 text-foreground" strokeWidth={1.5} fill="none" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Smooth Delivery
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Orders usually ship within 24 hours, but during busy times, it might take up to 2-3 business days.
            </p>
          </div>

          {/* Cancellation Policy */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <RotateCcw className="w-14 h-14 text-foreground" strokeWidth={1.5} fill="none" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Cancellation Policy
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              You can cancel your order from your Layers account as long as it hasn't been packed for shipping.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

