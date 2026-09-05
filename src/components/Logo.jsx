import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function Logo({ className = "h-12", showText = true, variant = "default" }) {
  const { isRTL } = useLanguage ? useLanguage() : { isRTL: true };
  const { settings } = useData ? useData() : { settings: {} };

  const arabicTextColor = variant === "white" 
    ? "text-white" 
    : "text-[#E31E24] [text-shadow:_0_1px_1px_rgba(0,0,0,0.15)]";
    
  const englishTextColor = variant === "white" 
    ? "text-slate-300" 
    : "text-[#2B3990] [text-shadow:_0_1px_1px_rgba(0,0,0,0.15)]";

  if (settings?.custom_logo_url) {
    return (
      <img
        src={settings.custom_logo_url}
        alt="Al-Aman Al-Awal Technology Co."
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {showText && (
        <div className={`flex flex-col justify-center leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`font-black text-base sm:text-lg lg:text-xl tracking-tight font-cairo ${arabicTextColor}`}>
            شركة تقنية الأمان الأولى المحدودة
          </span>
          <span className={`font-extrabold text-[11px] sm:text-xs tracking-wider font-inter ${englishTextColor}`}>
            AL- Aman AL Awal CO.LTD
          </span>
        </div>
      )}
    </div>
  );
}
