import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function ClientsPage() {
  const { t, lang } = useLanguage();
  const { clients } = useData();

  const activeClients = clients.filter(c => c.is_active);

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-10 sm:p-14 rounded-3xl space-y-4">
        <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-950 px-3 py-1 rounded-md border border-red-800">
          {t('clientsBadge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cairo">
          {t('clientsTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
          {t('clientsSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeClients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center gap-4 hover:border-[#2B3990] transition-colors"
          >
            <img
              src={client.logo_url}
              alt={lang === 'ar' ? client.name_ar : client.name_en}
              className="h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
            <span className="text-sm font-bold text-slate-800 text-center">
              {lang === 'ar' ? client.name_ar : client.name_en}
            </span>
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full">
              {client.category || 'Corporate'}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
