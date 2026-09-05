import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import Logo from './Logo';
import { Menu, X, Globe, Phone, Mail, FileText } from 'lucide-react';

export default function Navbar() {
  const { t, lang, toggleLanguage, isRTL } = useLanguage();
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/services', label: t('services') },
    { path: '/about', label: t('about') },
    { path: '/projects', label: t('projects') },
    { path: '/contact', label: t('contact') },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Right Side: Official Brand Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Logo className="h-12" />
        </Link>

        {/* Center: Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-bold transition-all duration-200 ${
                  active
                    ? 'text-[#E31E24] font-extrabold'
                    : 'text-slate-700 hover:text-[#2B3990]'
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 start-0 w-full h-0.5 bg-[#E31E24] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Left Side: Controls & Action Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Quick Icons */}
          <div className="flex items-center gap-2.5 text-slate-500 border-e border-slate-200 pe-3">
            <a
              href={`tel:${settings.phone}`}
              className="p-1.5 hover:text-[#E31E24] hover:bg-slate-100 rounded-lg transition-colors"
              title="اتصل بنا"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="p-1.5 hover:text-[#2B3990] hover:bg-slate-100 rounded-lg transition-colors"
              title="البريد الإلكتروني"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={toggleLanguage}
              className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="تغيير اللغة"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>

          {/* Language Pill Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => lang !== 'ar' && toggleLanguage()}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'ar' ? 'bg-white text-[#E31E24] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              AR
            </button>
            <button
              onClick={() => lang !== 'en' && toggleLanguage()}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'en' ? 'bg-white text-[#2B3990] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* Company Profile PDF Button (Always Visible) */}
          <a
            href={settings.company_profile_url || '/about'}
            target={settings.company_profile_url ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#2B3990] hover:bg-[#1E286C] rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
            title={lang === 'ar' ? 'تصفح البروفايل التعريفي للشركة (PDF)' : 'Company Profile PDF'}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'البروفايل التعريفي' : 'Profile PDF'}</span>
          </a>

          {/* Red Solid CTA Button */}
          <Link
            to="/request-quote"
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#E31E24] hover:bg-[#C41419] rounded-xl shadow-sm hover:shadow-red-600/30 transition-all active:scale-95 shrink-0"
          >
            {t('requestQuote')}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Globe className="w-4 h-4 text-[#2B3990]" />
            <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.path)
                    ? 'text-[#E31E24] bg-red-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href={settings.company_profile_url || '/about'}
              target={settings.company_profile_url ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#2B3990] text-white font-bold text-xs text-center rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'تصفح البروفايل التعريفي (PDF)' : 'Company Profile (PDF)'}</span>
            </a>

            <Link
              to="/request-quote"
              className="w-full py-3 bg-[#E31E24] text-white font-bold text-xs text-center rounded-xl shadow-md block"
            >
              {t('requestQuote')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
