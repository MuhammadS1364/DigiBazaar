import React, { useState } from 'react';
import { SellerOrder, InventoryItem, SystemAlert, Product } from '../types';
import { 
  X, 
  Printer, 
  Check, 
  QrCode, 
  Barcode, 
  Truck, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  DollarSign, 
  Star, 
  ShoppingCart,
  Building2,
  Package
} from 'lucide-react';

// 1. Shipping Label Modal
interface ShippingLabelModalProps {
  order: SellerOrder | null;
  onClose: () => void;
  onConfirmDispatch: (orderId: string) => void;
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({
  order,
  onClose,
  onConfirmDispatch,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-[#ac2d00]" />
            <h3 className="text-sm font-bold text-slate-900">
              Multi-Seller Airway Bill & Packing Slip
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Realistic Airway Bill Card */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 font-mono text-xs space-y-3 mb-4">
          <div className="flex justify-between items-start border-b border-slate-200 pb-2">
            <div>
              <p className="font-extrabold text-sm text-slate-900 tracking-wider">DIGIBAZAR LOGISTICS</p>
              <p className="text-[10px] text-slate-500">Split-Order Node: Kashmir Regional Node</p>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded">
                EXPRESS AIR
              </span>
            </div>
          </div>

          {/* Barcode visual */}
          <div className="py-2 bg-white rounded border border-slate-200 flex flex-col items-center justify-center">
            <div className="h-10 w-4/5 flex items-center justify-center space-x-1">
              {[3, 1, 4, 1, 2, 5, 2, 3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 3, 2, 4].map((w, i) => (
                <div key={i} className="h-full bg-black" style={{ width: `${w * 2}px` }}></div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-slate-700 mt-1">AWB #BLUEDART-882104-IN</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200">
            <div>
              <p className="text-slate-400 uppercase text-[9px]">Shipper:</p>
              <p className="font-bold text-slate-800">Himalayan Organics</p>
              <p className="text-slate-500">Pampore, J&K (192121)</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase text-[9px]">Deliver To:</p>
              <p className="font-bold text-slate-800">{order.customerName}</p>
              <p className="text-slate-500">{order.customerCity}, KA (560001)</p>
            </div>
          </div>

          <div className="bg-amber-100/60 p-2 rounded text-[10px] text-amber-900 border border-amber-200">
            <strong>Package #1 of 2:</strong> {order.items[0]?.quantity}x {order.items[0]?.productName}
          </div>
        </div>

        {/* Action button */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              onConfirmDispatch(order.id);
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#ac2d00] hover:bg-[#8f2500] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Pack & Print Label</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Courier Handover Scan Modal
interface HandoverScanModalProps {
  order: SellerOrder | null;
  onClose: () => void;
  onConfirmHandover: (orderId: string) => void;
}

export const HandoverScanModal: React.FC<HandoverScanModalProps> = ({
  order,
  onClose,
  onConfirmHandover,
}) => {
  const [scanned, setScanned] = useState(false);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-center">
        <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Courier Handover Verification</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanner Simulation */}
        <div className="relative aspect-square w-48 mx-auto my-3 rounded-2xl overflow-hidden border-2 border-[#ac2d00] bg-slate-950 flex flex-col items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ac2d00]/20 to-transparent animate-pulse pointer-events-none" />
          <QrCode className="w-24 h-24 text-white/90" />
          <p className="text-[10px] text-orange-200 mt-2 font-mono">
            {order.trackingId || '#DEL90214'}
          </p>
        </div>

        <p className="text-xs text-slate-600 mb-4">
          Scan the pickup driver barcode from <strong>{order.courier || 'Delhivery'}</strong> to hand over package.
        </p>

        <button
          onClick={() => {
            setScanned(true);
            setTimeout(() => {
              onConfirmHandover(order.id);
              onClose();
            }, 500);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Check className="w-4 h-4" />
          <span>{scanned ? 'Verified & Dispatched!' : 'Complete Handover'}</span>
        </button>
      </div>
    </div>
  );
};

// 3. Restock Modal
interface RestockModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onConfirmRestock: (sku: string, addedUnits: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  item,
  onClose,
  onConfirmRestock,
}) => {
  const [units, setUnits] = useState(20);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Restock Inventory SKU</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4 p-2 bg-slate-50 rounded-xl">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
            <p className="text-[11px] text-slate-500">
              SKU: {item.sku} • Current: <strong>{item.unitsAvailable} units</strong>
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-bold text-slate-800 block mb-1">Add Batch Units</label>
          <div className="flex items-center gap-2">
            {[10, 20, 50, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => setUnits(amt)}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-bold ${
                  units === amt
                    ? 'bg-[#ac2d00] text-white border-[#ac2d00]'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                +{amt}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            onConfirmRestock(item.sku, units);
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-[#ac2d00] text-white text-xs font-bold"
        >
          Confirm Restock (+{units} Units)
        </button>
      </div>
    </div>
  );
};

// 4. Price Anomaly Modal
interface PriceAnomalyModalProps {
  alert: SystemAlert | null;
  onClose: () => void;
  onResolve: () => void;
}

export const PriceAnomalyModal: React.FC<PriceAnomalyModalProps> = ({
  alert,
  onClose,
  onResolve,
}) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Dynamic Pricing Surge Audit</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-3">
          Algorithmic anomaly detection triggered for 3 products adjusted during Festival Mega Bazaar peak traffic:
        </p>

        <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2 text-xs mb-4">
          <div className="flex justify-between font-semibold text-slate-800">
            <span>Kashmiri Mongra Saffron (10g)</span>
            <span className="text-rose-600">₹1,299 → ₹3,117 (+140%)</span>
          </div>
          <p className="text-[10px] text-slate-500">
            Flagged seller: Himalayan Organics • Bot API frequency limit exceeded
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              onResolve();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black"
          >
            Freeze & Revert to Base Price
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Dispute Escalation Modal
interface DisputeModalProps {
  alert: SystemAlert | null;
  onClose: () => void;
  onResolve: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  alert,
  onClose,
  onResolve,
}) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-sm">
            <Scale className="w-4 h-4" />
            <span>Escrow Arbitration Desk</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-3">
          Order <strong>#DB-8799</strong> dispute: Buyer claims transit seal damaged; seller claims courier handover photo verified intact.
        </p>

        <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1.5 text-xs mb-4">
          <div className="flex justify-between">
            <span className="text-slate-600">Escrow Hold Amount:</span>
            <span className="font-bold text-slate-900">₹2,499</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Mediator SLA:</span>
            <span className="font-bold text-amber-600">26h (Exceeded 24h SLA)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onResolve();
              onClose();
            }}
            className="py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
          >
            Approve Buyer Refund
          </button>
          <button
            onClick={() => {
              onResolve();
              onClose();
            }}
            className="py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black"
          >
            Release to Seller
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. Product Detail Modal
interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Image */}
        <div className="relative aspect-square w-full bg-slate-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
          {product.discountBadge && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#ac2d00] text-white text-xs font-bold">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{product.sellerName}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">{product.hubLocation}</span>
            </div>
            <h3 className="text-base font-display font-extrabold text-slate-900">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-400">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Stock Status</p>
              <span className="text-xs font-bold text-emerald-600">
                {product.stockCount} units available
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-[#ac2d00] hover:bg-[#8f2500] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#ac2d00]/25 transition-transform active:scale-98"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Multi-Vendor Basket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
