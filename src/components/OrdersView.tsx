import React from 'react';
import { Package, Truck, CheckCircle2, ChevronRight, Clock, ArrowRight } from 'lucide-react';

interface OrdersViewProps {
  onBackToShop: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ onBackToShop }) => {
  const customerOrders = [
    {
      id: 'DB-8921',
      date: 'Sep 27, 2026',
      total: 2048,
      status: 'In Transit',
      itemsCount: 2,
      splitPackages: [
        {
          seller: 'Himalayan Organics',
          hub: 'Kashmir Regional Node',
          courier: 'BlueDart Express',
          tracking: 'BLUEDART-882104-IN',
          item: '2x Kashmiri Mongra Saffron',
          status: 'Dispatched from Srinagar Hub',
          statusStep: 3,
        },
        {
          seller: 'Jaipur Crafts Co.',
          hub: 'Jaipur Western Hub',
          courier: 'Delhivery Surface',
          tracking: 'DEL-990412-IN',
          item: '1x Brass Handcrafted Diya/Lamp',
          status: 'Packed & Awaiting Hub Pickup',
          statusStep: 2,
        },
      ],
    },
    {
      id: 'DB-8512',
      date: 'Sep 18, 2026',
      total: 3850,
      status: 'Delivered',
      itemsCount: 1,
      splitPackages: [
        {
          seller: 'Kaveri Silk Weavers',
          hub: 'Bengaluru Central Hub',
          courier: 'DTDC Priority',
          tracking: 'DTDC-771120-IN',
          item: '1x Chanderi Handloom Silk Saree',
          status: 'Delivered to Mumbai 400001',
          statusStep: 4,
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto pb-28 min-h-screen bg-[#F8F9FF] text-[#0B1C30] p-4">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-display font-extrabold text-slate-900">Your Consolidated Orders</h1>
          <p className="text-xs text-slate-500">Multi-seller orders with real-time regional node tracking</p>
        </div>
        <button
          onClick={onBackToShop}
          className="text-xs font-bold text-[#ac2d00] hover:underline"
        >
          Shop More
        </button>
      </div>

      <div className="space-y-4">
        {customerOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">#{order.id}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{order.date}</span>
                </div>
                <p className="text-xs font-bold text-[#ac2d00] mt-0.5 tabular-nums">
                  ₹{order.total.toLocaleString('en-IN')} • {order.itemsCount} Items
                </p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                order.status === 'Delivered'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {order.status}
              </span>
            </div>

            {/* Split Packages breakdown */}
            <div className="space-y-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Split-Order Hub Packages ({order.splitPackages.length})
              </p>

              {order.splitPackages.map((pkg, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900">{pkg.item}</h4>
                      <p className="text-[11px] text-slate-500">
                        {pkg.seller} • {pkg.hub}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {pkg.tracking}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{pkg.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
