import React from 'react';
import { UserRole } from '../types';
import { Avatar } from './Avatar';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Key, 
  User, 
  Store, 
  Shield, 
  LogOut, 
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ProfileViewProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentRole,
  onRoleChange,
  onLogout,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto pb-28 min-h-screen bg-[#F8F9FF] text-[#0B1C30] p-4">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs mb-4 text-center">
        <div className="flex justify-center mb-3">
          <Avatar size="lg" statusDot />
        </div>
        <h1 className="text-xl font-display font-extrabold text-slate-900">Priya Sharma</h1>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">+91 98765 43210 • Mumbai, India</p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mt-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>E.164 Phone Verified (Supabase Auth)</span>
        </div>
      </div>

      {/* Role Switcher Sandbox */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
          Active RBAC Role Simulator
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          Switch roles to see how permissions and UI views adapt dynamically:
        </p>

        <div className="space-y-2">
          {[
            {
              role: 'customer' as UserRole,
              label: 'Customer / Everyday Shopper',
              desc: 'Storefront catalog, reviews, and consolidated checkout',
              icon: User,
              color: 'text-emerald-600',
            },
            {
              role: 'merchant' as UserRole,
              label: 'Merchant / Himalayan Organics',
              desc: 'Packing slips, Delhivery handover scans, SKU restock',
              icon: Store,
              color: 'text-[#ac2d00]',
            },
            {
              role: 'admin' as UserRole,
              label: 'Superadmin / Governance Portal',
              desc: 'GSTIN vetting, price anomaly audits, escrow arbitration',
              icon: Shield,
              color: 'text-indigo-600',
            },
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = currentRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => onRoleChange(item.role)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'border-[#ac2d00] bg-orange-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#ac2d00] text-white">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Supabase RLS Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Row-Level Security (RLS) Inspection
          </h3>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
            <span className="text-slate-400 block text-[10px]">AUTH UUID:</span>
            <span className="font-bold text-slate-900">8b2f91-4c12-990a-a9f8-bba91024</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
            <span className="text-slate-400 block text-[10px]">ACTIVE RLS POLICIES:</span>
            <ul className="mt-1 space-y-1 text-[11px]">
              <li className="text-emerald-700">✓ SELECT on products FOR ANYONE</li>
              <li className="text-emerald-700">✓ UPDATE on merchant_inventory FOR owner_id = auth.uid()</li>
              <li className="text-emerald-700">✓ ALL on platform_audits FOR superadmin_bypass()</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={onLogout}
        className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Return to Passwordless Gateway</span>
      </button>
    </div>
  );
};
