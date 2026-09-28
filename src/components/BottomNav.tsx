import React from 'react';
import { ActiveTab } from '../types';
import { Store, Building2, Shield, ReceiptText, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  pendingAlertsCount?: number;
  ordersCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  pendingAlertsCount = 2,
  ordersCount = 2,
}) => {
  const tabs = [
    {
      id: 'shop' as ActiveTab,
      label: 'Shop',
      icon: Store,
      badge: 0,
    },
    {
      id: 'seller_hub' as ActiveTab,
      label: 'Seller Hub',
      icon: Building2,
      badge: 2, // 2 due orders needing action
    },
    {
      id: 'admin' as ActiveTab,
      label: 'Admin',
      icon: Shield,
      badge: pendingAlertsCount,
    },
    {
      id: 'orders' as ActiveTab,
      label: 'Orders',
      icon: ReceiptText,
      badge: ordersCount,
    },
    {
      id: 'profile' as ActiveTab,
      label: 'Profile',
      icon: User,
      badge: 0,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#ac2d00] font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#ac2d00] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
