import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsapp() {
  const { lang, isRTL } = useLanguage();
  const { settings } = useData();

  // Format phone number for WhatsApp API (remove spaces, pluses, dashes)
  const rawPhone = (settings.whatsapp || '+966500000000').replace(/[^0-9]/g, '');

  const message = lang === 'ar'
    ? 'مرحبًا، أرغب في الاستفسار عن خدمات شركة الأمان الأول للتقنية.'
    : 'Hello, I would like to inquire about Alaman Al-Awal Technology Co. services.';

  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${
        isRTL ? 'left-6' : 'right-6'
      } z-50 group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-600/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95`}
      title="WhatsApp Direct API"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      <span className="hidden sm:inline-block font-bold text-xs tracking-wider font-cairo">
        WhatsApp Direct API
      </span>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
      </span>
    </a>
  );
}
