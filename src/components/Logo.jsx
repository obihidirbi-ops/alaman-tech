import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function Logo({ className = "h-12", showText = true, variant = "default" }) {
  const { isRTL } = useLanguage ? useLanguage() : { isRTL: true };
  const { settings } = useData ? useData() : { settings: {} };

  const logoSrc = settings?.custom_logo_url || '/logo.png';

  const arabicTextColor = variant === "white" 
    ? "text-white" 
    : "text-[#E31E24] [text-shadow:_0_1px_1px_rgba(0,0,0,0.1)]";
    
  const englishTextColor = variant === "white" 
    ? "text-slate-300" 
    : "text-[#2B3990] [text-shadow:_0_1px_1px_rgba(0,0,0,0.1)]";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem Logo Image */}
      <img
        src={logoSrc}
        alt="شعار شركة تقنية الأمان الأولى المحدودة"
        className="h-full object-contain max-h-12 sm:max-h-14 filter drop-shadow-sm transition-transform duration-200 hover:scale-105 shrink-0"
      />

      {/* Official Company Name Typography in Arabic & English */}
      {showText && (
        <div className={`flex flex-col leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`font-black text-sm sm:text-base lg:text-lg tracking-tight font-cairo ${arabicTextColor}`}>
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
