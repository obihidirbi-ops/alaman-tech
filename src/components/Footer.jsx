import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import Logo from './Logo';
import { Phone, Mail, MapPin, Clock, Shield, ArrowUpRight, MessageSquare, FileText } from 'lucide-react';

export default function Footer() {
  const { t, isRTL, lang } = useLanguage();
  const { settings, services } = useData();

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t-4 border-[#E31E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile & Social Links */}
          <div className="space-y-5">
            <Logo showText={true} variant="white" className="h-12" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'ar' ? settings.about_text_ar : settings.about_text_en}
            </p>

            {/* Official Social Media Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-300 block">تابعونا على منصات التواصل الاجتماعـي:</span>
              <div className="flex flex-wrap items-center gap-2">
                {settings.tiktok_url && (
                  <a
                    href={settings.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800 hover:bg-[#E31E24] text-white rounded-xl transition-all duration-200 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    title="تيك توك"
                  >
                    <span>TikTok</span>
                  </a>
                )}
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800 hover:bg-[#2B3990] text-white rounded-xl transition-all duration-200 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    title="فيسبوك"
                  >
                    <span>Facebook</span>
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800 hover:bg-pink-600 text-white rounded-xl transition-all duration-200 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    title="إنستغرام"
                  >
                    <span>Instagram</span>
                  </a>
                )}
                {settings.twitter_url && (
                  <a
                    href={settings.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800 hover:bg-sky-500 text-white rounded-xl transition-all duration-200 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    title="تويتر (X)"
                  >
                    <span>X / Twitter</span>
                  </a>
                )}
                {settings.snapchat_url && (
                  <a
                    href={settings.snapchat_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 text-white rounded-xl transition-all duration-200 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    title="سناب شات"
                  >
                    <span>Snapchat</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full w-fit">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{t('heroBadgeSafety')}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-10 after:h-0.5 after:bg-[#E31E24]">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>{t('home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>{t('about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>{t('services')}</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>{t('projects')}</span>
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>{t('clients')}</span>
                </Link>
              </li>
              {settings.company_profile_url && (
                <li>
                  <a
                    href={settings.company_profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 font-bold hover:text-amber-300 hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'ar' ? 'البروفايل التعريفي (PDF)' : 'Company Profile (PDF)'}</span>
                  </a>
                </li>
              )}
              <li>
                <Link to="/request-quote" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E31E24]" />
                  <span>{t('requestQuote')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-10 after:h-0.5 after:bg-[#2B3990]">
              {t('ourServices')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 6).map((serv) => (
                <li key={serv.id}>
                  <Link
                    to={`/services/${serv.slug}`}
                    className="text-slate-300 hover:text-white transition-colors line-clamp-1 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2B3990]"></span>
                    <span>{lang === 'ar' ? serv.title_ar : serv.title_en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-10 after:h-0.5 after:bg-[#E31E24]">
              {t('contact')}
            </h4>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E31E24] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{lang === 'ar' ? settings.address_ar : settings.address_en}</span>
              </div>

              {/* Phones */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2B3990] shrink-0" />
                  <a href={`tel:${settings.phone}`} dir="ltr" className="hover:text-white transition-colors font-mono">
                    {settings.phone}
                  </a>
                </div>
                {settings.phone2 && (
                  <div className="flex items-center gap-3 ps-8">
                    <a href={`tel:${settings.phone2}`} dir="ltr" className="hover:text-white transition-colors font-mono text-xs text-slate-400">
                      {settings.phone2}
                    </a>
                  </div>
                )}
              </div>

              {/* Emails */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#E31E24] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors font-mono">
                    {settings.email}
                  </a>
                </div>
                {settings.email2 && (
                  <div className="flex items-center gap-3 ps-8">
                    <a href={`mailto:${settings.email2}`} className="hover:text-white transition-colors font-mono text-xs text-slate-400">
                      {settings.email2}
                    </a>
                  </div>
                )}
              </div>

              {/* WhatsApp Direct Link */}
              <div className="flex items-center gap-3 pt-1">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors text-xs flex items-center gap-1"
                >
                  <span>واتساب: {settings.whatsapp}</span>
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? settings.working_hours_ar : settings.working_hours_en}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-start">{t('copyright')}</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-slate-200 transition-colors text-slate-500 font-bold">
              {t('adminDashboard')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
