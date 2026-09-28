import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
    lg: 'w-11 h-11 text-lg',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Squircle */}
      <div
        className={`${iconSizes[size]} bg-gradient-to-br from-[#FF5722] to-[#E64A19] rounded-2xl flex items-center justify-center p-1.5 shadow-sm shadow-[#E64A19]/25 flex-shrink-0`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Handle */}
          <path
            d="M17 19V14C17 10.134 20.134 7 24 7C27.866 7 31 10.134 31 14V19"
            stroke="white"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          {/* Bag Body */}
          <path
            d="M13 18H35V33C35 39.0751 30.0751 44 24 44C17.9249 44 13 39.0751 13 33V18Z"
            stroke="white"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          {/* Accent dot */}
          <circle cx="24" cy="27" r="3.2" fill="white" />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div className={`font-display font-extrabold tracking-tight leading-none ${textSizes[size]}`}>
          <span className="text-[#0B1C30]">Digi</span>
          <span className="text-[#E64A19]">Bazar</span>
        </div>
      )}
    </div>
  );
};
