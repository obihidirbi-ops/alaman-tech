import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import ServiceIcon from '../components/ServiceIcon';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ServicesCatalog() {
  const { t, lang, isRTL } = useLanguage();
  const { services } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const activeServices = services.filter(s => s.is_active);

  const filteredServices = activeServices.filter(s => {
    const title = lang === 'ar' ? s.title_ar : s.title_en;
    const desc = lang === 'ar' ? s.short_desc_ar : s.short_desc_en;
    return title.toLowerCase().includes(searchTerm.toLowerCase()) || desc.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-10 sm:p-14 rounded-3xl space-y-4">
        <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-950 px-3 py-1 rounded-md border border-red-800">
          {t('servicesBadge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cairo">
          {t('servicesTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
          {t('servicesSubtitle')}
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن خدمة...' : 'Search for a service...'}
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-xl py-3 px-10 border border-slate-700 focus:outline-none focus:border-[#E31E24]"
            />
            <Search className="w-5 h-5 text-slate-400 absolute start-3 top-3.5" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((serv) => (
          <div
            key={serv.id}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={serv.image_url}
                alt={lang === 'ar' ? serv.title_ar : serv.title_en}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
              />
              <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                <ServiceIcon name={serv.icon_name} className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#2B3990] transition-colors">
                  {lang === 'ar' ? serv.title_ar : serv.title_en}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {lang === 'ar' ? serv.short_desc_ar : serv.short_desc_en}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/services/${serv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E31E24] hover:text-[#2B3990] transition-colors"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/request-quote?service=${serv.slug}`}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline"
                >
                  {t('heroCtaQuote')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
