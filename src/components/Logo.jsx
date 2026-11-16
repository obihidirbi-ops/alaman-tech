import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function Logo({ className = "", showText = true, variant = "default" }) {
  const { isRTL, lang } = useLanguage ? useLanguage() : { isRTL: true, lang: 'ar' };
  const { settings } = useData ? useData() : { settings: {} };

  const arabicTextColor = variant === "white" 
    ? "text-white" 
    : "text-[#E31E24] [text-shadow:_0_1px_1px_rgba(0,0,0,0.12)]";
    
  const englishTextColor = variant === "white" 
    ? "text-slate-200" 
    : "text-[#2B3990] [text-shadow:_0_1px_1px_rgba(0,0,0,0.12)]";

  const subtitleColor = variant === "white"
    ? "text-slate-300"
    : "text-slate-600";

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Custom Uploaded Logo Image (if available) */}
      {settings?.custom_logo_url && (
        <img
          src={settings.custom_logo_url}
          alt="Al-Aman Al-Awal Technology Co."
          className="h-10 sm:h-12 object-contain shrink-0"
        />
      )}

      {/* Official Company Name Typography Always Displayed */}
      {showText && (
        <div className={`flex flex-col justify-center leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Arabic Company Name */}
          <span className={`font-black text-xs sm:text-sm lg:text-base tracking-tight font-cairo ${arabicTextColor}`}>
            شركة تقنية الأمان الأولى المحدودة
          </span>
          {/* English Company Name - Same Size as Arabic */}
          <span className={`font-black text-xs sm:text-sm lg:text-base tracking-wide font-inter uppercase ${englishTextColor}`}>
            AL- Aman AL Awal CO.LTD
          </span>
          {/* Subtitle Line: توريد , تركيب , صيانه , معدات سلامه */}
          <span className={`text-[10px] sm:text-xs font-bold leading-tight mt-0.5 ${subtitleColor}`}>
            {lang === 'en'
              ? 'توريد ، تركيب ، صيانة ، معدات سلامة'
              : 'توريد ، تركيب ، صيانة ، معدات سلامة'}
          </span>
        </div>
      )}
    </div>
  );
}
