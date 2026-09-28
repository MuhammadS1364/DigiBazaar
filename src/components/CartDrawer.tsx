import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('FESTIVAL60');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Group items by seller
  const sellerGroups = cart.reduce((groups, item) => {
    const seller = item.product.sellerName;
    if (!groups[seller]) {
      groups[seller] = {
        sellerName: seller,
        hubLocation: item.product.hubLocation,
        items: [],
      };
    }
    groups[seller].items.push(item);
    return groups;
  }, {} as Record<string, { sellerName: string; hubLocation: string; items: CartItem[] }>);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal > 1000 ? 0 : 99;
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckout();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100/80 text-[#ac2d00] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-display font-extrabold text-slate-900">
                Consolidated Checkout
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} • Multi-Seller Split Order
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-[1.2] mb-3 text-slate-300" />
              <p className="font-semibold text-slate-700">Your basket is empty</p>
              <p className="text-xs text-slate-500 mt-1">Explore authentic artisan items</p>
            </div>
          ) : (
            <>
              {/* Info Pill */}
              <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200/80 text-xs text-sky-950 flex items-start gap-2">
                <Truck className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Single Payment • Smart Split Hub Fulfillment</strong>
                  <span className="text-[11px] text-sky-900/80">
                    Items are dispatched directly from verified regional nodes to minimize transit times.
                  </span>
                </div>
              </div>

              {/* Grouped by Seller */}
              {Object.values(sellerGroups).map((group, idx) => (
                <div
                  key={group.sellerName}
                  className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs space-y-3"
                >
                  {/* Seller Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <span className="w-2 h-2 rounded-full bg-[#ac2d00]" />
                      <span>Package #{idx + 1} from {group.sellerName}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {group.hubLocation}
                    </span>
                  </div>

                  {/* Items in this seller package */}
                  {group.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          SKU: {item.product.sku}
                        </p>
                        <p className="text-xs font-display font-bold text-[#ac2d00] mt-0.5 tabular-nums">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded text-slate-600 hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded text-slate-600 hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Promo Code Input */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs font-bold uppercase focus:outline-none focus:border-[#ac2d00]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 10% Festival Discount Applied!
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Festival Coupon Discount</span>
                    <span className="font-semibold tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Multi-Vendor Combined Shipping</span>
                  <span className="font-semibold text-emerald-600">
                    {deliveryFee === 0 ? 'FREE (Festival Special)' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
                  <span>Grand Total</span>
                  <span className="font-display font-extrabold text-[#ac2d00] tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white">
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#ac2d00] hover:from-[#E64A19] hover:to-[#8f2500] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#ac2d00]/25 transition-transform active:scale-98 disabled:opacity-50"
            >
              <span>{isProcessing ? 'Processing Consolidated Escrow...' : `Pay ₹${finalTotal.toLocaleString('en-IN')} & Place Order`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>DigiBazar Buyer Protection • Supabase RLS Escrow</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
