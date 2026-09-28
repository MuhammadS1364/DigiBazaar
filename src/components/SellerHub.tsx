import React, { useState } from 'react';
import { SellerOrder, InventoryItem } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRightLeft, 
  Truck, 
  CreditCard, 
  ArrowRight, 
  TrendingUp, 
  Landmark, 
  Package, 
  AlertTriangle, 
  Printer, 
  MoreVertical, 
  QrCode, 
  Pencil, 
  Plus, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface SellerHubProps {
  orders: SellerOrder[];
  inventory: InventoryItem[];
  onGenerateLabel: (order: SellerOrder) => void;
  onHandoverScan: (order: SellerOrder) => void;
  onRestock: (item: InventoryItem) => void;
  onSwitchRole: () => void;
}

export const SellerHub: React.FC<SellerHubProps> = ({
  orders,
  inventory,
  onGenerateLabel,
  onHandoverScan,
  onRestock,
  onSwitchRole,
}) => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto pb-28 min-h-screen bg-[#F8F9FF] text-[#0B1C30]">
      {/* 1. Storefront Header Card */}
      <div className="p-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Store Avatar */}
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-amber-50 flex-shrink-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=150&q=80"
                  alt="Himalayan Organics"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-base font-display font-extrabold text-slate-900 leading-tight">
                  Himalayan Organics
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Seller</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                  <span className="font-bold text-slate-800">4.8 ★</span>
                  <span className="text-[11px] text-slate-600">(1,420 reviews)</span>
                  <span className="text-slate-600">•</span>
                  <span className="font-semibold text-emerald-700">99.4% On-time</span>
                </div>
              </div>
            </div>

            {/* Quick Role switch button */}
            <button
              onClick={onSwitchRole}
              title="Switch role mode"
              className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 text-[#ac2d00] flex items-center justify-center hover:bg-orange-100 transition-colors shadow-xs flex-shrink-0"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Regional Hub status */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
              <Truck className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="truncate">Split-Order Hub: <strong>Kashmir Regional Node</strong></span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold flex-shrink-0">
              SLAs Intact
            </span>
          </div>
        </div>
      </div>

      {/* 2. Instant Payout Card */}
      <div className="px-4 pb-3">
        <div
          onClick={() => setShowPayoutModal(true)}
          className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#ac2d00]/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-[#ac2d00] flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-display font-extrabold text-slate-900 tabular-nums">
                  ₹48,200
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Payout Tomorrow
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Direct Credit to HDFC Bank (•••• 4921)
              </p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. 30-Day Operational Health */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            30-Day Operational Health
          </h3>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE SYNC
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Total Sales */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Total Sales
              </span>
              <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              ₹3,84,520
            </p>
            <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
              <span>↗</span> +14.2% MoM
            </p>
          </div>

          {/* Net Earnings */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Net Earnings
              </span>
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Landmark className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              ₹3,26,842
            </p>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5 truncate">
              After fees & returns
            </p>
          </div>

          {/* Orders Pending */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Orders Pending
              </span>
              <div className="w-6 h-6 rounded-lg bg-orange-50 text-[#ac2d00] flex items-center justify-center">
                <Package className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              18 <span className="text-xs font-normal text-slate-500">to ship</span>
            </p>
            <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> 6 Express Priority
            </p>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Low Stock Alert
              </span>
              <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-lg font-display font-extrabold text-rose-600 tabular-nums">
              3 SKUs
            </p>
            <p className="text-[11px] text-rose-600 font-semibold mt-0.5">
              Below safe limit
            </p>
          </div>
        </div>
      </div>

      {/* 4. Orders Needing Action */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Orders Needing Action
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#ac2d00] text-white text-[10px] font-bold">
              2 Due
            </span>
          </div>
          <button
            onClick={() => setShowAllOrdersModal(true)}
            className="text-xs font-bold text-[#ac2d00] hover:underline flex items-center gap-0.5"
          >
            <span>View All (18)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {orders.map((order) => {
            const isPackNow = order.status === 'confirmed_pack';
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs"
              >
                {/* Header row */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-mono text-xs font-bold border border-sky-200/60">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-700 font-medium">
                      • {order.customerName}
                    </span>
                  </div>

                  {isPackNow ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Confirmed • Pack Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                      <span>🕒</span>
                      Ready for Pickup
                    </span>
                  )}
                </div>

                {/* Item Details */}
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.quantity}x {item.productName}
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          {order.hubPackageNote}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-display font-extrabold text-slate-900 tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Sub-info if courier assigned */}
                {order.courier && order.status === 'ready_for_pickup' && (
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Courier assigned: <strong>{order.courier}</strong></span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#ac2d00]">
                      {order.trackingId}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                {isPackNow ? (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onGenerateLabel(order)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#ac2d00] hover:bg-[#8f2500] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Generate Shipping Label</span>
                    </button>
                    <button 
                      aria-label="More order actions"
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="text-xs text-slate-500 font-medium flex-1">
                      Tracking ID: <strong className="text-slate-800">{order.trackingId}</strong>
                    </div>
                    <button
                      onClick={() => onHandoverScan(order)}
                      className="py-2 px-3 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Handover Scan</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Inventory Health */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Inventory Health
            </h3>
          </div>
          <button className="text-xs font-bold text-[#ac2d00] hover:underline flex items-center gap-1">
            <span>Manage SKUs (48)</span>
            <span>⇋</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {inventory.map((item) => {
            const isLow = item.status === 'low_stock';
            return (
              <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {isLow ? (
                        <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[9px] font-bold border border-rose-200">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                          Healthy
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-mono">
                        SKU: {item.sku}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className={`text-[10px] font-bold ${isLow ? 'text-rose-600' : 'text-slate-700'}`}>
                        {item.unitsAvailable} {isLow ? 'units left' : 'units available'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div>
                  {isLow ? (
                    <button
                      onClick={() => onRestock(item)}
                      className="py-1.5 px-3 rounded-xl bg-[#ac2d00] hover:bg-[#8f2500] text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Restock
                    </button>
                  ) : (
                    <button
                      onClick={() => onRestock(item)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payout Details Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Automated Merchant Settlement</h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              DigiBazar executes T+1 Escrow payouts automatically once courier tracking confirms delivery SLAs without disputes.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Dispatch Value:</span>
                <span className="font-bold">₹51,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Platform Commission (5.5%):</span>
                <span className="text-rose-600 font-semibold">-₹2,800</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="font-bold text-slate-800">Net Credit (HDFC Bank):</span>
                <span className="font-extrabold text-emerald-600">₹48,200</span>
              </div>
            </div>
            <button
              onClick={() => setShowPayoutModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
