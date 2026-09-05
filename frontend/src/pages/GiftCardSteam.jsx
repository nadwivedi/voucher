import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useSEO } from '../hooks/useSEO'

const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
const calculateDiscount = (original, current) => { if (!original || original <= current) return 0; return Math.round(((original - current) / original) * 100) }

const GiftCardSteam = () => {
  const { addToCart } = useCart()
  const { isAuthenticated, BACKEND_URL } = useContext(AppContext)
  const navigate = useNavigate()

  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSteamProducts = async () => {
      try {
        setLoading(true)
        let items = []
        const searchRes = await fetch(`${BACKEND_URL}/api/products/search?q=Steam&limit=200`)
        const searchData = await searchRes.json()
        if (searchData.success && searchData.data && searchData.data.length > 0) {
          items = searchData.data
        } else {
          const catRes = await fetch(`${BACKEND_URL}/api/products/category/gift-cards?brand=Steam&limit=200`)
          const catData = await catRes.json()
          if (catData.success && catData.data) {
            items = catData.data
          }
        }

        const active = items.filter(p => p.isActive !== false && p.brand && p.brand.toLowerCase().includes('steam'))
        
        // Deduplicate by denomination
        const denomMap = new Map()
        active.forEach(p => {
          const denom = p.originalPrice || p.price
          if (!denomMap.has(denom)) {
            denomMap.set(denom, p)
          } else {
            const existing = denomMap.get(denom)
            if ((p.stockQuantity || 0) > (existing.stockQuantity || 0) || new Date(p.updatedAt || p.createdAt || 0) > new Date(existing.updatedAt || existing.createdAt || 0)) {
              denomMap.set(denom, p)
            }
          }
        })

        const mapped = Array.from(denomMap.values()).map(p => {
          const denom = p.originalPrice || p.price
          return {
            ...p,
            name: p.seoTitle || p.name || `Steam Wallet Code - ₹${denom}`,
            brand: 'Steam'
          }
        }).sort((a, b) => (a.price || 0) - (b.price || 0))

        setVouchers(mapped)
      } catch (err) {
        console.error('Error fetching Steam products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSteamProducts()
  }, [BACKEND_URL])

  useSEO({
    title: 'Steam Wallet Codes | Buy Online & Save | GCHub',
    description: 'Get Steam wallet codes instantly. Save on Steam vouchers with instant digital delivery via email on GCHub.',
    keywords: 'buy steam wallet code, steam voucher, cheap steam codes, steam redeem codes, GCHub',
    structuredData: { "@context": "https://schema.org", "@type": "ItemList", "name": "Steam Wallet Codes on GCHub", "numberOfItems": vouchers.length, "itemListElement": vouchers.map((v, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": v.name, "description": v.description, "offers": { "@type": "Offer", "priceCurrency": "INR", "price": v.price, "availability": v.stockQuantity === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" } } })) }
  })

  const handleAddToCart = (voucher) => { if (voucher.stockQuantity <= 0) { toast.error('Out of stock'); return }; addToCart(voucher); toast.success('Added to cart!') }
  const handleBuyNow = (voucher) => { if (voucher.stockQuantity <= 0) return; if (!isAuthenticated) { navigate('/login'); return }; addToCart(voucher); navigate('/checkout') }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-800 mb-4">
            Steam{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Wallet Codes</span>
          </h1>
          <p className="text-base sm:text-base text-slate-500 max-w-2xl mx-auto">Get Steam wallet codes at the best prices. Instant delivery via email.</p>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
          </div>
        ) : vouchers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">No Variants Available</h3>
            <p className="text-sm text-slate-500">No Steam wallet code variants are currently available. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {vouchers.map((voucher) => {
              const discountPercent = calculateDiscount(voucher.originalPrice, voucher.price)
              const savings = (voucher.originalPrice || voucher.price) - voucher.price

              return (
                <div key={voucher._id} onClick={() => navigate('/gift-card/steam/detail')} className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 flex flex-col cursor-pointer">
                  {discountPercent > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">-{discountPercent}% OFF</div>
                    </div>
                  )}

                  <div className="aspect-[4/3] sm:aspect-[1.6/1] w-full overflow-hidden bg-slate-100 flex items-center justify-center relative">
                    <img src={voucher.images?.[0] || '/products/steam.avif'} alt={voucher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${voucher.stockQuantity === 0 ? 'from-slate-900/80 via-slate-900/20' : 'from-black/40 via-transparent'} to-transparent`}></div>
                    
                    {voucher.stockQuantity === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-slate-900/80 text-white px-4 py-2 rounded-lg font-bold tracking-wider uppercase shadow-xl transform border border-slate-700">Out of Stock</div>
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
                        <span className="text-[10px] sm:text-xs tracking-wider font-extrabold text-emerald-600 uppercase">Steam Code</span>
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
        )}
      </div>
    </div>
  )
}

export default GiftCardSteam
