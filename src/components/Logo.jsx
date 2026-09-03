import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function Logo({ className = "h-12", showText = true, variant = "default" }) {
  const { isRTL } = useLanguage ? useLanguage() : { isRTL: true };
  const { settings } = useData ? useData() : { settings: {} };

  const logoSrc = settings?.custom_logo_url || '/logo.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="شعار شركة تقنية الأمان الأولى المحدودة"
        className="h-full object-contain max-h-14 sm:max-h-16 filter drop-shadow-sm transition-transform duration-200 hover:scale-105"
      />
    </div>
  );
}
