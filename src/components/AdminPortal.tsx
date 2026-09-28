import React, { useState } from 'react';
import { SellerApplication, SystemAlert, AuditLog, UserRole } from '../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Store, 
  User, 
  TrendingUp, 
  Landmark, 
  Users, 
  AlertCircle, 
  Scale, 
  FileText, 
  Check, 
  HelpCircle, 
  Ban, 
  Search, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface AdminPortalProps {
  applications: SellerApplication[];
  alerts: SystemAlert[];
  auditLogs: AuditLog[];
  onApproveApplication: (id: string) => void;
  onRequestInfoApplication: (id: string) => void;
  onRejectApplication: (id: string) => void;
  onReviewAlert: (alert: SystemAlert) => void;
  onSwitchToRole: (role: UserRole) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  applications,
  alerts,
  auditLogs,
  onApproveApplication,
  onRequestInfoApplication,
  onRejectApplication,
  onReviewAlert,
  onSwitchToRole,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto pb-28 min-h-screen bg-[#F8F9FF] text-[#0B1C30]">
      {/* 1. Simulation Access Mode Banner */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-white rounded-xl border border-slate-200/90 p-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
            <div className="truncate">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Simulating Access Mode
              </span>
              <p className="text-xs font-bold text-slate-900 truncate">Superadmin Control</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => onSwitchToRole('merchant')}
              className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-colors"
            >
              <span>🏪</span>
              <span>Merchant</span>
            </button>
            <button
              onClick={() => onSwitchToRole('customer')}
              className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-colors"
            >
              <span>👤</span>
              <span>Buyer</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Superadmin Tier Hero Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ac2d00] text-white text-[10px] font-extrabold uppercase tracking-wider mb-2 shadow-xs">
                <Shield className="w-3 h-3" />
                <span>Superadmin Tier</span>
              </span>

              <h1 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight">
                DigiBazar Governance Portal
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>RLS Policy Enforcement Active • Multi-Tenant Isolated</span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-slate-300 flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Platform KPI Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2.5">
          {/* GMV */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Platform GMV
              </span>
              <span className="text-[#ac2d00] font-bold text-sm">₹</span>
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              ₹48.2L
            </p>
            <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
              <span>↗</span> +18% Today
            </p>

            {/* Sparkline */}
            <div className="mt-2 h-5 w-full flex items-end">
              <svg viewBox="0 0 120 28" className="w-full h-full stroke-emerald-600 fill-none" strokeWidth="2.5">
                <path d="M 0 24 Q 25 22 45 14 T 85 10 T 120 4" />
              </svg>
            </div>
          </div>

          {/* Net Commission */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Net Commission
              </span>
              <Landmark className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              ₹4.1L
            </p>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">
              Avg. Take-rate: <strong>8.5%</strong>
            </p>

            {/* Progress bar */}
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Active Merchants */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Active Merchants
              </span>
              <Store className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              342
            </p>
            <p className="text-[11px] font-bold text-amber-800 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 12 Pending Queue
            </p>
          </div>

          {/* Active Buyers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                Active Buyers
              </span>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-lg font-display font-extrabold text-slate-900 tabular-nums">
              28,490
            </p>
            <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
              <span>↑</span> 99.4% CSAT Index
            </p>
          </div>
        </div>
      </div>

      {/* 4. Critical System Alerts */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Critical System Alerts
          </h3>
          <span className="text-[11px] font-semibold text-slate-500">
            2 Active Escalations
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Alert 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    Price Surge Anomaly Detected
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-extrabold">
                    Flagged
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  3 products flagged with +140% dynamic price adjustments within 15 mins.
                </p>
                <button
                  onClick={() => onReviewAlert(alerts[0])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#ac2d00] hover:underline mt-2"
                >
                  <span>Review Suspended Products</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Alert 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    Dispute Escalation Hub
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-extrabold">
                    Tier-2
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  2 return dispute appeals pending platform mediator verdict past 24h SLA.
                </p>
                <button
                  onClick={() => onReviewAlert(alerts[1])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#ac2d00] hover:underline mt-2"
                >
                  <span>Open Arbitration Desk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Pending Seller Vetting */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Pending Seller Vetting
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-[#ac2d00] text-white text-[10px] font-extrabold">
            12 in Queue
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">
          KYC verification & statutory compliance review
        </p>

        <div className="space-y-3">
          {/* Application 1: Kaveri Silk Weavers */}
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={app.image}
                  alt={app.businessName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-slate-500">
                      {app.appNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      <Check className="w-3 h-3" />
                      <span>{app.isFssai ? 'FSSAI Certified' : 'Verified GSTIN'}</span>
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                    {app.businessName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {app.category} • {app.location}
                  </p>
                </div>
              </div>

              {/* Statutory details box */}
              {app.gstin && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">GSTIN Status:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {app.gstin} <strong className="text-emerald-600">({app.gstinStatus})</strong>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Documents:</span>
                    <span className="font-medium text-slate-700 truncate">
                      📎 {app.documents.join(' + ')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              {app.id === 'app-402' ? (
                <div className="space-y-2">
                  <button
                    onClick={() => onApproveApplication(app.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#ac2d00] hover:bg-[#8f2500] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Check className="w-4 h-4 stroke-[2.5px]" />
                    <span>Approve & Activate Merchant Store</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onRequestInfoApplication(app.id)}
                      className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Request Info</span>
                    </button>
                    <button
                      onClick={() => onRejectApplication(app.id)}
                      className="py-1.5 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5 text-rose-600" />
                      <span>Reject Seller</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onApproveApplication(app.id)}
                  className="w-full py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Review Application & Warehouse Audit</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 6. Audit Trail (Immutable Ledger) */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Audit Trail (Immutable Ledger)
          </h3>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE SYNC
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-slate-900 truncate">{log.description}</p>
                  <p className="text-[10px] text-slate-500">{log.user}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap flex-shrink-0">
                {log.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
