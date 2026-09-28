import React, { useState } from 'react';
import { Logo } from './Logo';
import { Avatar } from './Avatar';
import { UserRole } from '../types';
import { ShieldCheck, ChevronDown, CheckCircle2, User, Store, Shield } from 'lucide-react';

interface TopBarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenProfile: () => void;
  viewMode: 'mobile' | 'responsive' | 'sidebyside';
  onViewModeChange: (mode: 'mobile' | 'responsive' | 'sidebyside') => void;
  isGateway?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentRole,
  onRoleChange,
  onOpenProfile,
  isGateway = false,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roleLabels = {
    customer: 'Customer',
    merchant: 'Seller Hub',
    admin: 'Admin',
  };

  const roleBadges = {
    customer: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      tag: 'Customer',
    },
    merchant: {
      bg: 'bg-orange-50 text-orange-700 border-orange-200',
      dot: 'bg-[#E64A19]',
      tag: 'Merchant',
    },
    admin: {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      dot: 'bg-indigo-600',
      tag: 'Superadmin',
    },
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          {isGateway ? (
            <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-orange-100/70 text-[#ac2d00] border border-orange-200">
              AUTH
            </span>
          ) : null}
        </div>

        {/* Center / Right: Role & Supabase Auth Badge */}
        <div className="flex items-center gap-2">
          {isGateway ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supabase Auth</span>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border bg-slate-50 hover:bg-slate-100 transition-colors shadow-xs"
              >
                <span className={`w-2 h-2 rounded-full ${roleBadges[currentRole].dot} animate-pulse`} />
                <span className="uppercase text-[11px] text-slate-500 font-semibold">ROLE:</span>
                <span className="font-bold text-slate-800">{roleLabels[currentRole]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-left animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-600">
                      Switch Role Simulation
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Simulates server-resolved RBAC policies
                    </p>
                  </div>

                  <button
                    onClick={() => onRoleChange('customer')}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs font-medium hover:bg-slate-50 transition-colors ${
                      currentRole === 'customer' ? 'bg-orange-50/70 text-[#ac2d00] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>Customer Portal</span>
                        {currentRole === 'customer' && <span className="text-[9px] px-1 bg-emerald-100 text-emerald-700 rounded">ACTIVE</span>}
                      </div>
                      <span className="text-[10px] text-slate-600 block">Shopper & multi-vendor basket</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onRoleChange('merchant')}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs font-medium hover:bg-slate-50 transition-colors ${
                      currentRole === 'merchant' ? 'bg-orange-50/70 text-[#ac2d00] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#ac2d00]" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>Merchant Hub</span>
                        {currentRole === 'merchant' && <span className="text-[9px] px-1 bg-orange-100 text-[#ac2d00] rounded">ACTIVE</span>}
                      </div>
                      <span className="text-[10px] text-slate-600 block">Himalayan Organics fulfillment</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onRoleChange('admin')}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs font-medium hover:bg-slate-50 transition-colors ${
                      currentRole === 'admin' ? 'bg-indigo-50/70 text-indigo-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>Governance Portal</span>
                        {currentRole === 'admin' && <span className="text-[9px] px-1 bg-indigo-100 text-indigo-700 rounded">ACTIVE</span>}
                      </div>
                      <span className="text-[10px] text-slate-600 block">RLS policies & seller vetting</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            title="Open Priya's Profile & Supabase Session"
            className="hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#ac2d00]/30 rounded-full"
          >
            <Avatar size="sm" statusDot />
          </button>
        </div>
      </div>
    </header>
  );
};
