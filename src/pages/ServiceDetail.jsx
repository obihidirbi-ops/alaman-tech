import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import ServiceIcon from '../components/ServiceIcon';
import { CheckCircle, ArrowRight, ArrowLeft, MessageSquare, FileText } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t, lang, isRTL } = useLanguage();
  const { services, settings } = useData();
  const navigate = useNavigate();

  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">الخدمة غير موجودة</h2>
        <Link to="/services" className="text-sm font-bold text-[#E31E24] hover:underline">
          العودة لصفحة الخدمات
        </Link>
      </div>
    );
  }

  const title = lang === 'ar' ? service.title_ar : service.title_en;
  const desc = lang === 'ar' ? (service.full_desc_ar || service.short_desc_ar) : (service.full_desc_en || service.short_desc_en);
  const features = lang === 'ar' ? service.features_ar : service.features_en;
  const systems = lang === 'ar' ? service.systems_ar : service.systems_en;

  const relatedServices = services.filter(s => s.id !== service.id && s.is_active).slice(0, 3);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const whatsappMessage = lang === 'ar'
    ? `مرحبًا، أرغب في الاستفسار عن خدمة: (${service.title_ar})`
    : `Hello, I would like to inquire about: (${service.title_en})`;
  const whatsappUrl = `https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-slate-900">{t('home')}</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-slate-900">{t('services')}</Link>
        <span>/</span>
        <span className="text-[#E31E24]">{title}</span>
      </div>

      {/* Main Service Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#E31E24] px-4 py-2 rounded-xl text-xs font-bold w-fit">
            <ServiceIcon name={service.icon_name} className="w-5 h-5" />
            <span>{title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-cairo">
            {title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={`/request-quote?service=${service.slug}`}
              className="px-6 py-3.5 bg-[#E31E24] hover:bg-[#C41419] text-white font-bold text-sm rounded-xl shadow-md text-center transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{t('requestThisService')}</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md text-center transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('heroCtaWhatsapp')}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative bg-slate-900 min-h-[300px]">
          <img
            src={service.image_url}
            alt={title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* Included Systems & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Systems Included */}
        {systems && systems.length > 0 && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-cairo border-b pb-3 border-slate-100">
              {t('serviceIncludedSystems')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {systems.map((sys, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200"
                >
                  {sys}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features List */}
        {features && features.length > 0 && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-cairo border-b pb-3 border-slate-100">
              {t('serviceFeatures')}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Related Services */}
      <div className="space-y-6 pt-6">
        <h3 className="text-2xl font-bold text-slate-900 font-cairo">
          {t('relatedServices')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <Link
              key={rel.id}
              to={`/services/${rel.slug}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#E31E24] transition-all space-y-2 group"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#E31E24] transition-colors text-sm">
                {lang === 'ar' ? rel.title_ar : rel.title_en}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                {lang === 'ar' ? rel.short_desc_ar : rel.short_desc_en}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
