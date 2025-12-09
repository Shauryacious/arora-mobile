import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Filter, X } from 'lucide-react'
import { AnimatedContainer } from '@/components/animations'

const BRANDS = [
  { value: 'apple', text: 'Apple' },
  { value: 'samsung', text: 'Samsung' },
  { value: 'google', text: 'Google' },
  { value: 'oneplus', text: 'OnePlus' },
  { value: 'xiaomi', text: 'Xiaomi' },
  { value: 'nothing', text: 'Nothing' },
  { value: 'vivo', text: 'Vivo' },
  { value: 'oppo', text: 'Oppo' },
  { value: 'realme', text: 'Realme' },
  { value: 'motorola', text: 'Motorola' },
]

interface ProductFiltersProps {
  selectedBrand: string | undefined
  selectedModel: string | undefined
  searchQuery: string | undefined
  availableModels: string[]
  onBrandChange: (brand: string | undefined) => void
  onModelChange: (model: string | undefined) => void
  onClearFilters: () => void
}

export default function ProductFilters({
  selectedBrand,
  selectedModel,
  searchQuery,
  availableModels,
  onBrandChange,
  onModelChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const hasActiveFilters = Boolean(selectedBrand || selectedModel || searchQuery)

  return (
    <AnimatedContainer direction="up" delay={0.1}>
      <Card className="mb-4 sm:mb-6 border-2 border-white/10 bg-black/50">
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            <CardTitle className="text-base sm:text-lg text-white">Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium text-white">Brand</Label>
              <Select
                value={selectedBrand || undefined}
                onValueChange={onBrandChange}
              >
                <SelectTrigger id="brand" className="h-11 sm:h-12 text-base touch-manipulation">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  {BRANDS.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value} className="text-base">
                      {brand.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="model" className="text-sm font-medium text-white">Model</Label>
              <Select
                value={selectedModel || undefined}
                onValueChange={onModelChange}
                disabled={!selectedBrand}
              >
                <SelectTrigger id="model" className="h-11 sm:h-12 text-base touch-manipulation" disabled={!selectedBrand}>
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model} className="text-base">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {hasActiveFilters && (
              <div className="flex items-end sm:flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="h-11 sm:h-12 w-full sm:w-auto text-base touch-manipulation"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Active filters display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
              <span className="text-xs sm:text-sm text-gray-300 w-full sm:w-auto">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 bg-white/10 text-white border-white/20 text-xs sm:text-sm py-1 px-2">
                  Search: {searchQuery}
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.delete('search')
                      setSearchParams(params, { replace: true })
                    }}
                    className="ml-1 active:bg-destructive/20 rounded-full p-1 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedBrand && (
                <Badge variant="secondary" className="gap-1 text-xs sm:text-sm py-1 px-2">
                  Brand: {BRANDS.find(b => b.value === selectedBrand)?.text}
                  <button
                    onClick={() => onBrandChange(undefined)}
                    className="ml-1 active:bg-destructive/20 rounded-full p-1 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedModel && (
                <Badge variant="secondary" className="gap-1 text-xs sm:text-sm py-1 px-2">
                  Model: {selectedModel}
                  <button
                    onClick={() => onModelChange(undefined)}
                    className="ml-1 active:bg-destructive/20 rounded-full p-1 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  )
}

