import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { 
  MapPin, 
  Bell, 
  Search, 
  QrCode, 
  Mic, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Heart, 
  ShoppingCart, 
  ChevronRight, 
  Flame, 
  SlidersHorizontal,
  CheckCircle2,
  X
} from 'lucide-react';

interface CustomerShopProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CustomerShop: React.FC<CustomerShopProps> = ({
  products,
  cart,
  onAddToCart,
  onOpenCart,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'prod-saffron': true,
    'prod-diya': true,
  });
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('Priya • Mumbai 400001');

  const categories = [
    { id: 'All', label: 'All', icon: '🛍️' },
    { id: 'Electronics', label: 'Electronics', icon: '💻' },
    { id: 'Ethnic Fashion', label: 'Ethnic Fashion', icon: '👗' },
    { id: 'Handicrafts', label: 'Handicrafts', icon: '🏺' },
    { id: 'Spices', label: 'Spices', icon: '🌿' },
    { id: 'Teas', label: 'Teas', icon: '☕' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const uniqueSellersCount = new Set(cart.map((item) => item.product.sellerId)).size;

  return (
    <div className="w-full max-w-lg mx-auto pb-28 min-h-screen bg-[#F8F9FF] text-[#0B1C30]">
      {/* 1. Location Bar & Notification */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3 bg-white/80 border-b border-slate-100">
        <button
          onClick={() => setShowAddressPicker(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-[#ac2d00] transition-colors py-1 px-2.5 rounded-full bg-slate-50 border border-slate-200/80 max-w-[85%] truncate"
        >
          <MapPin className="w-3.5 h-3.5 text-[#ac2d00] flex-shrink-0" />
          <span className="truncate">Deliver to {currentAddress}</span>
          <span className="text-[10px] text-slate-600">▾</span>
        </button>

        <div className="relative">
          <button 
            aria-label="View notifications"
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ac2d00] rounded-full ring-2 ring-white"></span>
          </button>
        </div>
      </div>

      {/* 2. Search & Scan Bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-xs px-3 py-2.5 focus-within:border-[#ac2d00] focus-within:ring-2 focus-within:ring-[#ac2d00]/15 transition-all">
          <Search className="w-4 h-4 text-slate-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search spices, craft items, electronics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium placeholder:text-slate-600 focus:outline-none bg-transparent"
          />
          <div className="flex items-center gap-2 border-l border-slate-200 pl-2 flex-shrink-0 text-slate-600">
            <button 
              aria-label="Scan QR code"
              className="hover:text-slate-900 transition-colors"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button 
              aria-label="Voice search"
              className="hover:text-slate-900 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Horizontal Pills */}
      <div className="px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-[#ac2d00] text-white shadow-[#ac2d00]/25'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Festival Mega Bazaar Hero Banner */}
      <div className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E64A19] via-[#D84315] to-[#BF360C] text-white p-4 shadow-md shadow-[#E64A19]/20">
          {/* Decorative festive star sparkles */}
          <div className="absolute top-2 right-3 text-amber-200/40 pointer-events-none">
            <Sparkles className="w-20 h-20 opacity-30 rotate-12" />
          </div>

          <div className="relative z-10">
            {/* Pill */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider text-amber-100 mb-1.5 border border-white/20">
              <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Festival Special</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-white mb-1">
              Festival Mega Bazaar
            </h2>

            <p className="text-xs text-orange-100/90 max-w-[80%] leading-snug mb-3">
              Up to 60% Off from verified local artisans & authentic heritage brands across India.
            </p>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button 
                onClick={() => setSelectedCategory('Handicrafts')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#BF360C] text-xs font-bold hover:bg-amber-50 shadow-xs transition-transform active:scale-95"
              >
                <span>Explore Deals</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-[11px] font-medium text-amber-100/90 flex items-center gap-2">
                <span>Ends in <strong>03h 42m</strong></span>
                <div className="flex gap-1">
                  <span className="w-2 h-1 rounded-full bg-white"></span>
                  <span className="w-1 h-1 rounded-full bg-white/50"></span>
                  <span className="w-1 h-1 rounded-full bg-white/50"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Trust Badge */}
      <div className="px-4 py-2">
        <div className="rounded-xl bg-emerald-50/80 border border-emerald-200/80 px-3 py-2 flex items-center justify-center gap-2 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-[11px] font-semibold text-emerald-900">
            100% Genuine Products • Direct from Verified Sellers
          </p>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600/70 hidden sm:inline flex-shrink-0" />
        </div>
      </div>

      {/* 6. Curated For You Grid */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500 font-bold">✪</span>
            <h3 className="text-sm font-display font-extrabold text-slate-900">Curated For You</h3>
          </div>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-[#ac2d00] hover:underline flex items-center gap-0.5"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Column Product Cards */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const isFav = !!favorites[product.id];
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Left Badge */}
                  {product.discountBadge && (
                    <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#ac2d00] text-white shadow-xs">
                      {product.discountBadge}
                    </span>
                  )}

                  {/* Favorite Heart */}
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-500 shadow-xs transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Seller Name */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-0.5 truncate">
                      {product.sellerVerified && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      )}
                      <span className="truncate">{product.sellerName}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#ac2d00] transition-colors">
                      {product.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-800">{product.rating}</span>
                      <span className="text-[10px] text-slate-600">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Pricing & Quick Add */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-sm font-display font-extrabold text-slate-900 tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-slate-600 line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full py-1.5 px-2 rounded-xl bg-sky-50/80 hover:bg-sky-100 text-sky-900 border border-sky-200/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors active:scale-98"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Floating Multi-Vendor Cart Drawer Trigger */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-14 left-0 right-0 z-20 px-3 py-1 flex justify-center animate-in slide-in-from-bottom duration-200 pointer-events-none">
          <div className="w-full max-w-md bg-[#0F172A] text-white rounded-2xl p-2.5 shadow-xl flex items-center justify-between gap-3 border border-slate-700/80 pointer-events-auto">
            {/* Left: Total & Multi-Vendor breakdown */}
            <div className="flex items-center gap-2.5 pl-1.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-[#ac2d00] text-white flex items-center justify-center font-bold text-xs">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#ac2d00] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-display font-extrabold text-white tabular-nums">
                    ₹{totalCartAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium">
                    • {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-[10px] text-orange-200 font-medium tracking-tight">
                  From {uniqueSellersCount} {uniqueSellersCount === 1 ? 'seller' : 'sellers'} (Consolidated checkout)
                </p>
              </div>
            </div>

            {/* Right: View Cart Button */}
            <button
              onClick={onOpenCart}
              className="py-2 px-3.5 rounded-xl bg-[#ac2d00] hover:bg-[#8f2500] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-[#ac2d00]/30 transition-transform active:scale-95 flex-shrink-0"
            >
              <span>View Cart</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Address Picker Modal */}
      {showAddressPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Select Delivery Location</h3>
              <button 
                onClick={() => setShowAddressPicker(false)}
                className="text-slate-600 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {[
                'Priya • Mumbai 400001 (Default)',
                'Priya • Bandra West, Mumbai 400050',
                'Priya Office • Nariman Point, Mumbai 400021',
              ].map((addr) => (
                <button
                  key={addr}
                  onClick={() => {
                    setCurrentAddress(addr.replace(' (Default)', ''));
                    setShowAddressPicker(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                    currentAddress.includes(addr.slice(0, 15))
                      ? 'border-[#ac2d00] bg-orange-50/60 font-bold text-[#ac2d00]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span>{addr}</span>
                  {currentAddress.includes(addr.slice(0, 15)) && <CheckCircle2 className="w-4 h-4 text-[#ac2d00]" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddressPicker(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
