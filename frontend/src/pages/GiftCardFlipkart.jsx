import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useSEO } from '../hooks/useSEO'
import { ChevronDown } from 'lucide-react'

const fallbackFlipkartVouchers = [
  { _id: 'flipkart-100', name: 'Flipkart Gift Card - ₹100', price: 89, originalPrice: 100, brand: 'Flipkart', category: 'gift-cards', images: ['/products/flipkart.avif'], description: '₹100 Flipkart Gift Card at just ₹89', stockQuantity: 50 },
  { _id: 'flipkart-200', name: 'Flipkart Gift Card - ₹200', price: 178, originalPrice: 200, brand: 'Flipkart', category: 'gift-cards', images: ['/products/flipkart.avif'], description: '₹200 Flipkart Gift Card at just ₹178', stockQuantity: 50 },
  { _id: 'flipkart-500', name: 'Flipkart Gift Card - ₹500', price: 440, originalPrice: 500, brand: 'Flipkart', category: 'gift-cards', images: ['/products/flipkart.avif'], description: '₹500 Flipkart Gift Card at just ₹440', stockQuantity: 50 },
  { _id: 'flipkart-1000', name: 'Flipkart Gift Card - ₹1000', price: 875, originalPrice: 1000, brand: 'Flipkart', category: 'gift-cards', images: ['/products/flipkart.avif'], description: '₹1000 Flipkart Gift Card at just ₹875', stockQuantity: 50 },
  { _id: 'flipkart-2000', name: 'Flipkart Gift Card - ₹2000', price: 1750, originalPrice: 2000, brand: 'Flipkart', category: 'gift-cards', images: ['/products/flipkart.avif'], description: '₹2000 Flipkart Gift Card at just ₹1750', stockQuantity: 50 },
]

const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
const calculateDiscount = (original, current) => { if (!original || original <= current) return 0; return Math.round(((original - current) / original) * 100) }

const GiftCardFlipkart = () => {
  const { BACKEND_URL, isAuthenticated } = useContext(AppContext)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [dbProducts, setDbProducts] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    const fetchFlipkartProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/category/gift-cards?brand=Flipkart&limit=200`)
        const data = await res.json()
        if (data.success && data.data && data.data.length > 0) {
          const active = data.data.filter(p => p.isActive !== false)
          setDbProducts(active)
        }
      } catch (err) {
        console.error('Error fetching Flipkart products:', err)
      }
    }
    fetchFlipkartProducts()
  }, [BACKEND_URL])

  // Extract unique brands dynamically from DB products
  const availableBrands = Array.from(new Set(
    dbProducts.map(p => p.brand).filter(b => b && b.toLowerCase().includes('flipkart'))
  ))

  const brandOptions = availableBrands.length > 0 
    ? availableBrands 
    : ['Flipkart']

  const currentBrand = selectedBrand && brandOptions.includes(selectedBrand) 
    ? selectedBrand 
    : brandOptions[0]

  // Filter products from DB for the selected brand
  const filteredFromDb = dbProducts.filter(p => p.brand === currentBrand)

  const currentVouchers = filteredFromDb.length > 0 
    ? filteredFromDb.map(p => ({
        ...p,
        name: p.seoTitle || p.name || `${p.brand} - ₹${p.originalPrice || p.price}`,
        brand: p.brand || currentBrand
      })).sort((a, b) => (a.price || 0) - (b.price || 0))
    : fallbackFlipkartVouchers

  useSEO({
    title: 'Flipkart Gift Cards | Buy Online & Save | GCHub',
    description: 'Get Flipkart gift card codes instantly. Save up to 15% on Flipkart vouchers with instant digital delivery via email on GCHub.',
    keywords: 'buy flipkart gift card, flipkart voucher, cheap flipkart codes, flipkart redeem codes, GCHub',
    structuredData: { "@context": "https://schema.org", "@type": "ItemList", "name": "Flipkart Gift Cards on GCHub", "numberOfItems": currentVouchers.length, "itemListElement": currentVouchers.map((v, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": v.name, "description": v.description, "offers": { "@type": "Offer", "priceCurrency": "INR", "price": v.price, "availability": v.stockQuantity === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" } } })) }
  })

  const handleAddToCart = (voucher) => { if (voucher.stockQuantity <= 0) { toast.error('Out of stock'); return }; addToCart(voucher); toast.success('Added to cart!') }
  const handleBuyNow = (voucher) => { if (voucher.stockQuantity <= 0) return; if (!isAuthenticated) { navigate('/login'); return }; addToCart(voucher); navigate('/checkout') }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-800 mb-3">
            Flipkart{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {currentBrand}
            </span>
          </h1>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">Get Flipkart codes at the best prices. Instant delivery via email.</p>
        </div>

        {/* Dropdown Selection if multiple variants exist */}
        {brandOptions.length > 1 && (
          <div className="max-w-md mx-auto mb-8 sm:mb-10 px-4">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 text-center">
              Select Flipkart Variant
            </label>
            <div className="relative">
              <select
                value={currentBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 text-slate-800 font-bold text-sm sm:text-base py-3 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 appearance-none cursor-pointer transition-all"
              >
                {brandOptions.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {brandOptions.map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentBrand === b
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {currentVouchers.map((voucher) => {
            const discountPercent = calculateDiscount(voucher.originalPrice, voucher.price)
            const savings = (voucher.originalPrice || voucher.price) - voucher.price

            return (
              <div key={voucher._id} onClick={() => navigate('/gift-card/flipkart/detail')} className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 flex flex-col cursor-pointer">
                {discountPercent > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">-{discountPercent}% OFF</div>
                  </div>
                )}

                <div className="aspect-[1/1] sm:aspect-[6/5] w-full overflow-hidden bg-slate-100 flex items-center justify-center relative">
                  <img src={voucher.images?.[0] || '/products/flipkart.avif'} alt={voucher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${voucher.stockQuantity === 0 ? 'from-slate-900/80 via-slate-900/20' : 'from-black/40 via-transparent'} to-transparent`}></div>
                  
                  {voucher.stockQuantity === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-slate-900/80 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase shadow-xl transform border border-slate-700">Out of Stock</div>
                    </div>
                  ) : (
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm hidden sm:flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                      Instant
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1 text-sm sm:text-base leading-tight group-hover:text-emerald-600 transition-colors">{voucher.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] sm:text-xs tracking-wider font-extrabold text-emerald-600 uppercase">
                        {voucher.brand}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col gap-1 border-t border-slate-100 pt-3 mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">{formatPrice(voucher.price)}</span>
                        {voucher.originalPrice > voucher.price && <span className="text-xs sm:text-sm text-slate-400 line-through">{formatPrice(voucher.originalPrice)}</span>}
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] sm:text-xs"><span>Save {formatPrice(savings)} ({discountPercent}%)</span></div>
                    </div>

                    {voucher.stockQuantity === 0 ? (
                      <div className="flex flex-col gap-2">
                        <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-2.5 px-4 rounded-lg cursor-not-allowed text-xs sm:text-sm flex items-center justify-center gap-2">Out of Stock</button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleBuyNow(voucher) }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-xs sm:text-sm">Buy Now</button>
                        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(voucher) }} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-xs sm:text-sm">Add to Cart</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GiftCardFlipkart
