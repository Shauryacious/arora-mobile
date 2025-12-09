import { Product } from '@/types/product'

interface MetadataImage {
  url: string
  original_url: string
  alt: string
  title: string
  filepath: string
  filename: string
}

interface Metadata {
  images: MetadataImage[]
  brands_models: {
    brands: Array<{ value: string; text: string }>
    models: Record<string, Array<{ value: string; text: string }>>
  }
}

/**
 * Extract brand from filename
 * Examples:
 * - "iPhone_14_Pro_..." -> "apple"
 * - "Samsung_..." -> "samsung"
 */
function extractBrandFromFilename(filename: string): string {
  const lower = filename.toLowerCase()
  
  if (lower.includes('iphone') || lower.includes('apple') || lower.startsWith('phone')) {
    return 'apple'
  }
  if (lower.includes('samsung') || lower.includes('galaxy')) {
    return 'samsung'
  }
  if (lower.includes('google') || lower.includes('pixel')) {
    return 'google'
  }
  if (lower.includes('oneplus')) {
    return 'oneplus'
  }
  if (lower.includes('xiaomi') || lower.includes('redmi') || lower.includes('mi')) {
    return 'xiaomi'
  }
  if (lower.includes('nothing')) {
    return 'nothing'
  }
  if (lower.includes('vivo')) {
    return 'vivo'
  }
  if (lower.includes('oppo')) {
    return 'oppo'
  }
  if (lower.includes('realme')) {
    return 'realme'
  }
  if (lower.includes('motorola')) {
    return 'motorola'
  }
  
  return 'apple' // Default to Apple
}

/**
 * Extract model from filename
 * Examples:
 * - "iPhone_14_Pro_or_pro_max_Slow_Summer" -> "iPhone 14 Pro" (or_pro_max means it works for both)
 * - "iPhone_15_Pro_Next_Gen_Boi" -> "iPhone 15 Pro"
 * - "iPhone_14_Pro_Max_Cosmic_Warrior" -> "iPhone 14 Pro Max"
 * - "iphone-13-pro-max-chaos" -> "iPhone 13 Pro Max"
 */
function extractModelFromFilename(filename: string): string {
  // Remove file extension
  const name = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
  
  // Pattern: Phone_XX_Pro (alternative format)
  const phoneProMatch = name.match(/Phone[_\s]*(\d+)[_\s]*Pro/i)
  if (phoneProMatch) {
    const version = phoneProMatch[1]
    return `iPhone ${version} Pro`
  }
  
  // Pattern: iPhone_XX_Pro_or_pro_max (means it works for both Pro and Pro Max)
  const iphoneOrMaxMatch = name.match(/iPhone[_\s]*(\d+)[_\s]*Pro[_\s]*or[_\s]*pro[_\s]*max/i)
  if (iphoneOrMaxMatch) {
    const version = iphoneOrMaxMatch[1]
    // Default to Pro, but could be either
    return `iPhone ${version} Pro`
  }
  
  // Pattern: iPhone_XX_Pro_Max (explicit Max)
  const iphoneMaxMatch = name.match(/iPhone[_\s]*(\d+)[_\s]*Pro[_\s]*Max/i)
  if (iphoneMaxMatch) {
    const version = iphoneMaxMatch[1]
    return `iPhone ${version} Pro Max`
  }
  
  // Pattern: iPhoneXXPro (no underscores, e.g., "iPhone14Pro")
  const iphoneNoUnderscoreMatch = name.match(/iPhone(\d+)Pro/i)
  if (iphoneNoUnderscoreMatch) {
    const version = iphoneNoUnderscoreMatch[1]
    return `iPhone ${version} Pro`
  }
  
  // Pattern: iPhone_XX_Pro (just Pro)
  const iphoneProMatch = name.match(/iPhone[_\s]*(\d+)[_\s]*Pro/i)
  if (iphoneProMatch) {
    const version = iphoneProMatch[1]
    return `iPhone ${version} Pro`
  }
  
  // Pattern: iphone-XX-pro-max (dash format)
  const iphoneDashMaxMatch = name.match(/iphone[_-](\d+)[_-]pro[_-]max/i)
  if (iphoneDashMaxMatch) {
    const version = iphoneDashMaxMatch[1]
    return `iPhone ${version} Pro Max`
  }
  
  // Pattern: iphone-XX-pro (dash format)
  const iphoneDashProMatch = name.match(/iphone[_-](\d+)[_-]pro/i)
  if (iphoneDashProMatch) {
    const version = iphoneDashProMatch[1]
    return `iPhone ${version} Pro`
  }
  
  // Pattern: Samsung Galaxy SXX
  const samsungMatch = name.match(/galaxy[_\s]*([a-z]?\d+)/i)
  if (samsungMatch) {
    return `Galaxy ${samsungMatch[1]}`
  }
  
  // Pattern: Pixel XX
  const pixelMatch = name.match(/pixel[_\s]*(\d+)/i)
  if (pixelMatch) {
    return `Pixel ${pixelMatch[1]}`
  }
  
  // Default fallback
  return 'iPhone 14 Pro'
}

/**
 * Extract product name from filename or alt text
 */
function extractProductName(filename: string, alt: string): string {
  // Use alt text if available and meaningful
  if (alt && alt.trim() && !alt.toLowerCase().includes('skin-detail') && alt.length > 2) {
    return alt.trim()
  }
  
  // Extract from filename
  const name = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
  
  // Remove brand and model prefixes
  let productName = name
    .replace(/^Phone[_\s]*\d+[_\s]*Pro[_\s]*/i, '') // Phone_15_Pro format
    .replace(/^iPhone[_\s]*\d+[_\s]*Pro[_\s]*(?:or[_\s]*pro[_\s]*max|Max|max)?[_\s]*/i, '')
    .replace(/^iPhone[_\s]*\d+[_\s]*Pro[_\s]*Max[_\s]*/i, '')
    .replace(/^iPhone\d+Pro/i, '') // iPhone14Pro format
    .replace(/^iphone[_-]\d+[_-]pro[_-]?(max)?[_-]/i, '')
    .replace(/^Samsung[_\s]*Galaxy[_\s]*[a-z]?\d+[_\s]*/i, '')
    .replace(/^Google[_\s]*Pixel[_\s]*\d+[_\s]*/i, '')
    .replace(/^[a-z]+[_-]/i, '') // Remove any remaining brand prefix
  
  // Remove UUIDs and hashes (long alphanumeric strings)
  productName = productName.replace(/[a-f0-9]{8,}/gi, '')
  
  // Clean up underscores and format
  // Handle camelCase (e.g., "Baadshah" from "iPhone14ProBaadshah")
  productName = productName
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .split(/[_\s-]+/)
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  
  // If empty, use a default
  if (!productName || productName.trim().length === 0) {
    return 'Premium Skin'
  }
  
  return productName.trim()
}

/**
 * Check if image is a product image (not a banner, feature, or other)
 */
function isProductImage(image: MetadataImage): boolean {
  const filename = image.filename.toLowerCase()
  const alt = image.alt.toLowerCase()
  
  // Skip banners, features, and other non-product images
  if (
    filename.includes('banner') ||
    filename.includes('feature') ||
    filename.includes('ga-audiences') ||
    filename.includes('3m-skin') ||
    filename.includes('ultra-thin') ||
    filename.includes('zero-glue') ||
    alt.includes('skin-detail_image') ||
    alt.includes('banner') ||
    alt.includes('image loading') ||
    filename.length < 10 // Too short to be a product image
  ) {
    return false
  }
  
  // Must have a meaningful alt text or contain product name patterns
  if (!alt || alt.trim().length === 0 || alt === 'image loading') {
    // Check if filename suggests it's a product
    const hasProductPattern = 
      filename.includes('iphone') ||
      filename.includes('samsung') ||
      filename.includes('pixel') ||
      filename.includes('galaxy') ||
      filename.includes('phone')
    
    if (!hasProductPattern) {
      return false
    }
  }
  
  return true
}

/**
 * Generate a unique ID from filename
 */
function generateId(filename: string): string {
  // Extract UUID if present, otherwise use filename hash
  const uuidMatch = filename.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i)
  if (uuidMatch) {
    return uuidMatch[0]
  }
  
  // Use filename as ID (sanitized)
  return filename
    .replace(/\.(png|jpg|jpeg|webp)$/i, '')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()
}

/**
 * Parse metadata and generate products
 */
export async function loadProductsFromMetadata(): Promise<Product[]> {
  try {
    // Load metadata from public directory
    const response = await fetch('/metadata.json')
    if (!response.ok) {
      throw new Error('Failed to load metadata')
    }
    
    const metadata: Metadata = await response.json()
    
    // Group images by product (same name, brand, model)
    const productMap = new Map<string, Product>()
    
    for (const image of metadata.images) {
      if (!isProductImage(image)) {
        continue
      }
      
      const brand = extractBrandFromFilename(image.filename)
      const model = extractModelFromFilename(image.filename)
      const name = extractProductName(image.filename, image.alt)
      
      // Create a key for grouping (brand + model + name)
      const productKey = `${brand}::${model}::${name}`
      
      // Get image path (relative to public directory)
      const imagePath = `/scraped_images/${image.filename}`
      
      if (productMap.has(productKey)) {
        // Add image to existing product
        const product = productMap.get(productKey)!
        if (!product.images.includes(imagePath)) {
          product.images.push(imagePath)
        }
      } else {
        // Create new product
        const product: Product = {
          id: generateId(image.filename),
          name,
          description: `Premium ${brand === 'apple' ? 'iPhone' : brand} skin with ${name} design. High-quality materials and precision fit.`,
          price: 499, // Default price
          image: imagePath,
          images: [imagePath],
          brand,
          model,
          inStock: true,
          alt: image.alt || name,
        }
        productMap.set(productKey, product)
      }
    }
    
    return Array.from(productMap.values())
  } catch (error) {
    console.error('Error loading products from metadata:', error)
    return []
  }
}

