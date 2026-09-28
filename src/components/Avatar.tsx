import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  statusDot?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  alt = 'Priya Sharma',
  size = 'md',
  className = '',
  statusDot = false,
}) => {
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`relative inline-block flex-shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white ring-1 ring-slate-200/80 shadow-sm bg-slate-100 flex items-center justify-center`}
      >
        {!error ? (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[#0F172A] to-[#1E293B] flex items-center justify-center text-white font-bold text-xs">
            PS
          </div>
        )}
      </div>

      {statusDot && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
};
