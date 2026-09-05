import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import ServiceIcon from '../components/ServiceIcon';
import { 
  ShieldCheck, 
  FileCheck2, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Filter,
  ChevronRight,
  ChevronLeft,
  FileText
} from 'lucide-react';

export default function Home() {
  const { t, lang, isRTL } = useLanguage();
  const { services, projects, clients, settings } = useData();

  const [projectFilter, setProjectFilter] = useState('all');

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const activeServices = services.filter(s => s.is_active);
  const publishedProjects = projects.filter(p => p.is_published);

  const filteredProjects = projectFilter === 'all' 
    ? publishedProjects 
    : publishedProjects.filter(p => p.services_used.some(s => s.includes(projectFilter) || s.toLowerCase().includes(projectFilter.toLowerCase())));

  // Dynamic Hero Slideshow Configuration (Static images, 5-Second Interval)
  const heroSlides = [
    {
      image: settings.hero_slide_1 || settings.hero_image_url || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1920&q=80",
      title_ar: settings.hero_title_ar || "الحلول المتكاملة للأنظمة التقنية وأنظمة السلامة في المملكة",
      title_en: settings.hero_title_en || "Integrated Technical Systems & Safety Solutions in KSA"
    },
    {
      image: settings.hero_slide_2 || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
      title_ar: "أنظمة مكافحة وإطفاء الحريق والإنذار المبكر المعتمدة",
      title_en: "Certified Fire Protection & Early Warning Systems"
    },
    {
      image: settings.hero_slide_3 || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
      title_ar: "بنية تحتية متطورة لشبكات تقنية المعلومات والأنظمة الأمنية",
      title_en: "Advanced IT Infrastructure & Security CCTV Systems"
    },
    {
      image: settings.hero_slide_4 || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
      title_ar: "اعتماد المخططات الهندسية وتراخيص الدفاع المدني للمنشآت",
      title_en: "Civil Defense accredited engineering drawings & licensing"
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Automated 5-Second Timer Effect for Static Slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : heroSlides.length - 1));
  };

  const currentSlide = heroSlides[currentSlideIndex];

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      
      {/* AUTOMATED 5-SECOND HERO SLIDESHOW SECTION (STATIC BACKGROUND IMAGES) */}
      <section className="relative bg-slate-950 text-white min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden">
        
        {/* Full-bleed Static Background Image Stack (No Motion/Zoom) */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlideIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt="Alaman Tech Hero Slide"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}

          {/* Smooth Dark Navy Gradient Overlay Direction: Right to Left for Arabic Readability */}
          <div className={`absolute inset-0 z-10 ${
            isRTL 
              ? 'bg-gradient-to-l from-slate-950 via-slate-950/90 via-45% to-slate-950/20' 
              : 'bg-gradient-to-r from-slate-950 via-slate-950/90 via-45% to-slate-950/20'
          }`}></div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
          <div className="max-w-2xl space-y-6 text-start">
            
            {/* Slide Badge Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-slate-200">
              <span className="flex h-2 w-2 rounded-full bg-[#E31E24] animate-ping"></span>
              <span>{lang === 'ar' ? 'شريككم الهندسـي الأول في المملكة' : 'Your Premier Engineering Partner in KSA'}</span>
            </div>

            {/* Dynamic Animated Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-cairo drop-shadow-lg transition-all duration-500 min-h-[120px] sm:min-h-[150px] flex items-center">
              {lang === 'ar' ? currentSlide.title_ar : currentSlide.title_en}
            </h1>

            {/* CTA Buttons: Red Consultation Button + Company Profile Button Side by Side */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/request-quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-bold text-white bg-[#E31E24] hover:bg-[#C41419] rounded-xl shadow-lg hover:shadow-red-600/40 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shrink-0"
              >
                <span>{t('heroCtaConsultation')}</span>
                <ArrowIcon className="w-5 h-5" />
              </Link>

              <a
                href={settings.company_profile_url || '/about'}
                target={settings.company_profile_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-bold text-white bg-[#2B3990] hover:bg-[#1E286C] border border-blue-400/40 rounded-xl shadow-xl hover:shadow-blue-900/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shrink-0"
                title={lang === 'ar' ? 'تصفح البروفايل التعريفي للشركة (PDF)' : 'Company Profile PDF'}
              >
                <FileText className="w-5 h-5 text-amber-400" />
                <span>{lang === 'ar' ? 'تصفح البروفايل التعريفي' : 'Company Profile'}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Slideshow Controls & Progress Indicator (Bottom Corner) */}
        <div className="absolute bottom-6 start-4 sm:start-8 z-30 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-2xl shadow-xl">
          {/* Slide Dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all ${
                  currentSlideIndex === idx
                    ? 'w-6 h-2.5 bg-[#E31E24] rounded-full'
                    : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400 rounded-full'
                }`}
                title={`صورة ${idx + 1}`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          {/* Manual Arrow Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevSlide}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

      {/* 12 CORE SERVICES (BENTO GRID LAYOUT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-md">
            {t('servicesBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-cairo">
            {t('servicesTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((serv) => (
            <div
              key={serv.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              {/* Image & Icon Overlay */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={serv.image_url}
                  alt={lang === 'ar' ? serv.title_ar : serv.title_en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70"></div>
                <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                  <ServiceIcon name={serv.icon_name} className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2B3990] transition-colors font-cairo">
                    {lang === 'ar' ? serv.title_ar : serv.title_en}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
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
      </section>

      {/* FEATURED PORTFOLIO SECTION WITH FILTERS */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-950 border border-red-800 px-3 py-1 rounded-md">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-cairo">
                {t('projectsTitle')}
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                {t('projectsSubtitle')}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
                { id: 'إطفاء', label: lang === 'ar' ? 'إطفاء' : 'Fire Protection' },
                { id: 'كاميرات', label: lang === 'ar' ? 'كاميرات' : 'CCTV & Security' },
                { id: 'شبكات', label: lang === 'ar' ? 'شبكات' : 'Networks & IT' },
                { id: 'مصاعد', label: lang === 'ar' ? 'مصاعد' : 'Elevators' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setProjectFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    projectFilter === f.id
                      ? 'bg-[#E31E24] text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700 shadow-lg hover:border-slate-500 transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={proj.image_url}
                    alt={lang === 'ar' ? proj.title_ar : proj.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 end-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                    {proj.year}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400">
                      {lang === 'ar' ? proj.location_ar : proj.location_en}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#E31E24] transition-colors font-cairo">
                      {lang === 'ar' ? proj.title_ar : proj.title_en}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {lang === 'ar' ? proj.description_ar : proj.description_en}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.services_used.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl border border-slate-700 transition-colors"
            >
              <span>{lang === 'ar' ? 'عرض كافة المشاريع والسابقة الكاملة' : 'View All Projects Portfolio'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US & LIVE STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 relative overflow-hidden space-y-10">
          <div className="absolute top-0 start-0 w-3 h-full bg-gradient-to-b from-[#E31E24] to-[#2B3990]"></div>

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 font-cairo">
              {t('whyChooseUsTitle')}
            </h2>
            <p className="text-slate-600 text-sm">
              {lang === 'ar'
                ? 'لماذا نعتبر الخيار الأول للشركات في أنظمة السلامة والحلول التقنية الهندسية؟'
                : 'Committed to rigorous engineering standards and rapid execution.'}
            </p>
          </div>

          {/* Live Statistic Counters */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl sm:text-4xl font-black text-[#E31E24] font-cairo mb-1">
                +{settings.stat_clients || 250}
              </div>
              <div className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'عميل وشركة' : 'Clients & Companies'}
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl sm:text-4xl font-black text-[#2B3990] font-cairo mb-1">
                +{settings.stat_projects || 500}
              </div>
              <div className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'مشروع منشور' : 'Projects Delivered'}
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-black text-[#E31E24] font-cairo mb-1">
                12
              </div>
              <div className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'فريق فني تخصصي' : 'Specialized Tech Teams'}
              </div>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-xs">
                  {lang === 'ar' ? 'التزام بالجودة' : 'Quality Commitment'}
                </div>
                <div className="text-[11px] text-emerald-700">
                  {lang === 'ar' ? 'التزام بالمعايير العالمية ISO' : 'ISO International Standards'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900">
              <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <div className="font-bold text-xs">
                  {lang === 'ar' ? 'كوادر مؤهلة' : 'Qualified Team'}
                </div>
                <div className="text-[11px] text-blue-700">
                  {lang === 'ar' ? 'إشراف مهندسين بمؤهلات عالية' : 'Supervised by Qualified Engineers'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
              <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold text-xs">
                  {lang === 'ar' ? 'اعتمادات حكومية' : 'Government Accreditation'}
                </div>
                <div className="text-[11px] text-amber-700">
                  {lang === 'ar' ? 'اعتمادات الدفاع المدني للسلامة' : 'Civil Defense Safety Approvals'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CLIENTS LOGO SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-md">
            Clients Logo Grid
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cairo">
            {t('clientsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.filter(c => c.is_active).map((client) => (
            <div
              key={client.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-blue-300 transition-colors"
            >
              <img
                src={client.logo_url}
                alt={lang === 'ar' ? client.name_ar : client.name_en}
                className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
              <span className="text-xs font-bold text-slate-700 text-center">
                {lang === 'ar' ? client.name_ar : client.name_en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SOLID CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-14 text-white text-center sm:text-start flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-slate-800 border-s-8 border-s-[#E31E24]">
          <div className="space-y-4 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cairo text-white">
              {lang === 'ar' ? 'الحلول المتكاملة للأمان والسلامة في المملكة' : 'Turnkey Safety & Security Solutions in the Kingdom'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'تواصل مع مهندسينا اليوم للحصول على دراسة فنية واستشارة مجانية وعرض سعر مخصص.'
                : 'Contact our engineering team today for technical consultation and a customized proposal.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <Link
              to="/request-quote"
              className="px-8 py-4 bg-[#E31E24] hover:bg-[#C41419] text-white font-extrabold text-sm rounded-xl shadow-lg text-center transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{t('heroCtaConsultation')}</span>
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg text-center transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageSquare className="w-5 h-5 text-white" />
              <span>{t('heroCtaWhatsapp')}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
