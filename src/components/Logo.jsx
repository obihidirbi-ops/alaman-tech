import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function Logo({ className = "h-12", showText = true, variant = "default" }) {
  const { isRTL } = useLanguage ? useLanguage() : { isRTL: true };
  const { settings } = useData ? useData() : { settings: {} };

  // If a custom logo image was uploaded from Admin settings, display it directly!
  if (settings && settings.custom_logo_url) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={settings.custom_logo_url}
          alt="شعار شركة تقنية الأمان الأولى المحدودة"
          className="h-full object-contain max-h-14 drop-shadow-sm"
        />
      </div>
    );
  }

  // Otherwise, render the exact official logo graphic design matching the attachment
  const arabicTextColor = variant === "white" 
    ? "text-white" 
    : "text-[#E31E24] [text-shadow:_0_1px_2px_rgba(0,0,0,0.15)]";
    
  const englishTextColor = variant === "white" 
    ? "text-slate-300" 
    : "text-[#2B3990] [text-shadow:_0_1px_2px_rgba(0,0,0,0.15)]";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem Symbol */}
      <div className={`relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${isRTL ? 'order-last' : 'order-first'}`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <path d="M 38 98 A 72 72 0 0 1 162 98" stroke="#E31E24" strokeWidth="14" strokeLinecap="round" />
          <path d="M 162 102 A 72 72 0 0 1 38 102" stroke="#2B3990" strokeWidth="14" strokeLinecap="round" />
          <path d="M 100 34 L 132 105 L 115 105 L 100 68 L 85 105 L 68 105 Z" fill="#E31E24" />
          <path d="M 44 124 L 156 76 L 144 68 L 32 116 Z" fill="#2B3990" />
          <path d="M 80 115 L 100 78 L 120 115 L 136 154 L 116 154 L 100 120 L 84 154 L 64 154 Z" fill="#2B3990" />
          <path d="M 112 86 L 142 86 L 134 92 L 112 92 Z" fill="#E31E24" />
          <path d="M 125 72 L 148 72 L 142 77 L 125 77 Z" fill="#E31E24" />
        </svg>
      </div>

      {/* Typography Text */}
      {showText && (
        <div className={`flex flex-col leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`font-black text-base sm:text-lg tracking-tight font-cairo ${arabicTextColor}`}>
            شركة تقنية الأمان الأولى المحدودة
          </span>
          <span className={`font-extrabold text-[10px] sm:text-xs tracking-wider font-inter ${englishTextColor}`}>
            AL- Aman AL Awal CO.LTD
          </span>
        </div>
      )}
    </div>
  );
}
