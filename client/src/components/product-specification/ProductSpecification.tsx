import { motion } from 'framer-motion'
import { scaleIn } from '@/components/animations'
import { Phone, Mail, MapPin, Building2, Package } from 'lucide-react'

export default function ProductSpecification() {
  const specifications = [
    {
      label: 'Brand',
      value: 'Arora Mobile',
      icon: Building2,
    },
    {
      label: 'Category',
      value: 'Mobile Accessories',
      icon: Package,
    },
    {
      label: 'Net Quantity',
      value: '1 Unit',
      icon: Package,
    },
  ]

  const netContents = [
    '1 x Premium Mobile Case',
    '1 x Screen Protector',
    '1 x Premium Microfibre Cloth',
    '1 x Installation Guide',
  ]

  return (
    <section className="dark bg-black text-white py-12 sm:py-14 md:py-16 px-3 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div variants={scaleIn} className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center pb-6">
            Product Specifications
          </h2>
          <div className="space-y-6">
              {/* Main Specifications - Top Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {specifications.map((spec, index) => {
                  const IconComponent = spec.icon
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-start space-y-2 p-4 sm:p-5 rounded-lg bg-black/50 border border-white/10"
                    >
                      <div className="flex items-center gap-2 text-gray-400">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
                          {spec.label}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm sm:text-base">
                        {spec.value}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Two Column Layout - Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Net Contents */}
                  <div className="p-5 rounded-lg bg-black/50 border border-white/10">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Package className="w-5 h-5" />
                      Net Contents
                    </h3>
                    <ul className="space-y-2">
                      {netContents.map((item, index) => (
                        <li
                          key={index}
                          className="text-gray-300 text-sm sm:text-base flex items-start gap-2"
                        >
                          <span className="text-gray-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Country of Origin */}
                  <div className="p-5 rounded-lg bg-black/50 border border-white/10">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5" />
                      Country of Origin
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">India</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Consumer Complaints */}
                  <div className="p-5 rounded-lg bg-black/50 border border-white/10">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Phone className="w-5 h-5" />
                      For Consumer Complaints
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm sm:text-base">+08 9229 8228</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm sm:text-base">support@aroramobile.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="p-5 rounded-lg bg-black/50 border border-white/10">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5" />
                      Address
                    </h3>
                    <div className="text-gray-300 text-sm sm:text-base space-y-1">
                      <p>Arora Mobile Pvt Ltd</p>
                      <p>16TH Office No 1617, Logix City Centre Sector</p>
                      <p>32, Noida, Gautam Buddha Nagar Uttar</p>
                      <p>Pradesh, 201301</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manufactured By - Full Width Bottom */}
              <div className="p-5 rounded-lg bg-black/50 border border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5" />
                  Manufactured By
                </h3>
                <div className="text-gray-300 text-sm sm:text-base space-y-1">
                  <p>Arora Mobile Pvt Ltd</p>
                  <p>F-304, Basement, Sector 63</p>
                  <p>Noida, (UP) 201301</p>
                </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

