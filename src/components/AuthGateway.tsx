import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  MessageSquare, 
  Check, 
  Key, 
  Database, 
  ShoppingBag, 
  Store, 
  ShieldAlert, 
  ArrowRight, 
  Clock, 
  Lock,
  UserCheck
} from 'lucide-react';

interface AuthGatewayProps {
  onSuccess: (role: UserRole) => void;
  initialRole?: UserRole;
}

export const AuthGateway: React.FC<AuthGatewayProps> = ({ onSuccess, initialRole = 'customer' }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [phoneNumber, setPhoneNumber] = useState('98765 43210');
  const [otp, setOtp] = useState(['7', '4', '9', '2', '8', '3']);
  const [resendSeconds, setResendSeconds] = useState(25);
  const [isVerifying, setIsVerifying] = useState(false);

  // Sync phone number based on role simulation for realistic demo
  useEffect(() => {
    if (selectedRole === 'customer') {
      setPhoneNumber('98765 43210');
      setOtp(['7', '4', '9', '2', '8', '3']);
    } else if (selectedRole === 'merchant') {
      setPhoneNumber('98450 88712');
      setOtp(['5', '2', '0', '9', '1', '4']);
    } else if (selectedRole === 'admin') {
      setPhoneNumber('97110 00199');
      setOtp(['9', '1', '8', '3', '7', '2']);
    }
  }, [selectedRole]);

  // Countdown timer
  useEffect(() => {
    if (resendSeconds > 0) {
      const timer = setTimeout(() => setResendSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendSeconds]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess(selectedRole);
    }, 400);
  };

  const roleDetails = {
    customer: {
      uuid: '8b2f91-4c12-990a-a9f8',
      portalTitle: 'Customer / Everyday Shopper',
      portalBadge: 'CONSUMER',
      buttonText: 'Verify & Continue as Customer',
      icon: ShoppingBag,
      profileQuery: 'public.profiles (rls_check_user_role)',
    },
    merchant: {
      uuid: '3e1104-9a88-4e1b-b2c4',
      portalTitle: 'Himalayan Organics (Seller)',
      portalBadge: 'MERCHANT',
      buttonText: 'Verify & Continue to Seller Hub',
      icon: Store,
      profileQuery: 'public.merchant_tenants (rls_seller_isolate)',
    },
    admin: {
      uuid: '00a44f-1299-4401-cc87',
      portalTitle: 'Platform Governance Superadmin',
      portalBadge: 'SUPERADMIN',
      buttonText: 'Verify & Access Superadmin Portal',
      icon: ShieldAlert,
      profileQuery: 'public.admin_roles (rls_superadmin_bypass)',
    },
  };

  const activeInfo = roleDetails[selectedRole];
  const ActiveIcon = activeInfo.icon;

  return (
    <div className="w-full max-w-lg mx-auto bg-white min-h-[92vh] flex flex-col justify-between p-4 sm:p-6 shadow-sm border border-slate-200/60 rounded-2xl">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-orange-100 text-[#ac2d00] border border-orange-200/80">
              AUTH
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Auth</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-0.5">
              Passwordless Gateway
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0B1C30] tracking-tight">
              Welcome to DigiBazar
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Fast sign-in with phone OTP. Your role and permissions are securely resolved server-side.
            </p>
          </div>
          <button className="p-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 mb-5">
          {/* Phone Input */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-slate-800">
                Phone Number <span className="text-[#ac2d00]">*</span>
              </label>
              <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3px]" /> SMS Sent
              </span>
            </div>

            <div className="flex rounded-xl border border-slate-300 bg-white overflow-hidden shadow-xs focus-within:border-[#ac2d00] focus-within:ring-2 focus-within:ring-[#ac2d00]/20 transition-all">
              <button
                type="button"
                className="px-3 py-2 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <span>🇮🇳</span>
                <span>+91</span>
                <span className="text-[10px] text-slate-600">▾</span>
              </button>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold text-slate-900 tracking-wide focus:outline-none"
                placeholder="Enter 10-digit number"
              />
            </div>
          </div>

          {/* OTP Code Boxes */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-slate-800">Enter 6-Digit Code</label>
              <span className="text-slate-600 text-[11px] font-medium">Time-based OTP</span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {otp.map((digit, idx) => (
                <div
                  key={idx}
                  className={`h-12 rounded-xl border flex items-center justify-center text-lg font-bold font-display shadow-xs transition-all ${
                    idx === 4
                      ? 'border-[#ac2d00] bg-orange-50/40 text-[#ac2d00] ring-2 ring-[#ac2d00]/20'
                      : 'border-slate-200 bg-slate-50/60 text-slate-800'
                  }`}
                >
                  {digit}
                </div>
              ))}
            </div>

            {/* Resend info */}
            <div className="flex items-center justify-between text-xs mt-2 text-slate-600">
              <div className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  Resend code in <strong className="text-slate-900">00:{resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds}</strong>
                </span>
              </div>
              <button
                onClick={() => setResendSeconds(30)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>

        {/* Supabase RLS Enforced Card */}
        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/90 flex items-start gap-2.5 mb-5 shadow-xs">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lock className="w-3.5 h-3.5 stroke-[2.4px]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950">
              Supabase Row-Level Security (RLS) Enforced
            </h4>
            <p className="text-[11px] text-emerald-800/90 leading-relaxed mt-0.5">
              Bank-grade 256-bit encryption. Roles are resolved strictly via database authorization policies, never client-selected.
            </p>
          </div>
        </div>

        {/* Automated RBAC Pipeline */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#ac2d00]" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Automated RBAC Pipeline
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200/60">
              Server Verification
            </span>
          </div>

          <div className="space-y-2">
            {/* Step 1 */}
            <div className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Phone OTP Verified</p>
                  <p className="text-[11px] text-slate-600 font-mono">E.164 standard (+91 {phoneNumber})</p>
                </div>
              </div>
              <Check className="w-4 h-4 text-emerald-600 stroke-[2.5px]" />
            </div>

            <div className="flex justify-center -my-1 text-slate-600 text-xs">↓</div>

            {/* Step 2 */}
            <div className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Supabase Auth UUID Generated</p>
                  <p className="text-[11px] text-slate-600 font-mono">auth.users: {activeInfo.uuid}</p>
                </div>
              </div>
              <Key className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center -my-1 text-slate-600 text-xs">↓</div>

            {/* Step 3 */}
            <div className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Database Profile Lookup</p>
                  <p className="text-[11px] text-slate-600 font-mono">{activeInfo.profileQuery}</p>
                </div>
              </div>
              <Database className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center -my-1 text-slate-600 text-xs">↓</div>

            {/* Resolved Role Card */}
            <div className="p-3 rounded-xl bg-[#FFF3EC] border border-[#FFD0BA] flex items-center justify-between transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ac2d00]/10 text-[#ac2d00] flex items-center justify-center">
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#ac2d00] block">
                    Resolved Portal Access
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{activeInfo.portalTitle}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#ac2d00]/10 text-[#ac2d00] border border-[#ac2d00]/20 tracking-wider">
                {activeInfo.portalBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Sandbox Role Picker */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>⚖️</span> Interactive Sandbox Role Picker
            </span>
            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
              Demo Mode
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mb-2.5">
            Simulate how Supabase assigns views dynamically based on the verified phone record:
          </p>

          <div className="grid grid-cols-3 gap-2">
            {/* Customer */}
            <button
              onClick={() => handleRoleSelect('customer')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                selectedRole === 'customer'
                  ? 'bg-[#ac2d00] text-white border-[#ac2d00] shadow-sm shadow-[#ac2d00]/30 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs">Customer</span>
            </button>

            {/* Merchant */}
            <button
              onClick={() => handleRoleSelect('merchant')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                selectedRole === 'merchant'
                  ? 'bg-[#ac2d00] text-white border-[#ac2d00] shadow-sm shadow-[#ac2d00]/30 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
              }`}
            >
              <Store className="w-4 h-4" />
              <span className="text-xs">Merchant</span>
            </button>

            {/* Admin */}
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-[#ac2d00] text-white border-[#ac2d00] shadow-sm shadow-[#ac2d00]/30 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary CTA & Terms */}
      <div className="pt-2">
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#ac2d00] hover:from-[#E64A19] hover:to-[#8f2500] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#ac2d00]/25 transition-all transform active:scale-[0.99] disabled:opacity-60"
        >
          <span>{activeInfo.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-slate-600 mt-3 leading-snug">
          By continuing, you agree to DigiBazar's{' '}
          <a href="#terms" className="text-[#ac2d00] underline font-medium">
            Terms of Service
          </a>{' '}
          &{' '}
          <a href="#privacy" className="text-[#ac2d00] underline font-medium">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
