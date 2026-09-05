import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, FileCheck2, Building2, Sparkles, FileText, Download } from 'lucide-react';

export default function About() {
  const { t, lang } = useLanguage();
  const { settings } = useData();

  const aboutImgSrc = (settings && settings.about_image_url && settings.about_image_url.trim() !== '') 
    ? settings.about_image_url 
    : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1️⃣ FIRST SECTION AT THE TOP: Main Profile & Image Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Right Column in RTL: Company Bio & Checklist */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'عن الشركة والمسيرة' : 'About Us & Company History'}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-cairo leading-tight">
            {lang === 'ar' ? 'حلول هندسية متكاملة لحماية المنشآت والمشروعات الكبرى' : 'Integrated Engineering Solutions Safeguarding Enterprise Assets'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'ar' ? settings.about_text_ar : settings.about_text_en}
          </p>

          {/* Key Advantages Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'ar' ? 'اعتمادات رسمية مكتملة لدى الدفاع المدني والجهات المختصة' : 'Official Civil Defense approvals & accredited certifications'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'ar' ? 'إشراف كادر هندسي وفني مؤهل ذو خبرة في المشاريع المعقدة' : 'Supervised by qualified engineering teams experienced in complex projects'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'ar' ? 'تغطية شاملة: التصميم والتوريد والتركيب والصيانة الدورية' : 'Turnkey scope: Design, Procurement, Installation & Annual Maintenance'}
              </span>
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Image & Floating Badge */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
            <img
              src={aboutImgSrc}
              alt="شركة تقنية الأمان الأولى"
              className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating Experience Badge */}
          <div className="absolute -bottom-6 start-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] flex items-center justify-center font-black text-xl font-cairo">
              12+
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 font-cairo">
                {lang === 'ar' ? 'سنوات من الخبرة والتميز' : 'Years of Excellence & Innovation'}
              </div>
              <div className="text-xs text-slate-500">
                {lang === 'ar' ? 'في سوق المملكة العربية السعودية' : 'In the Saudi Arabian Market'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2️⃣ SECOND SECTION: Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:border-red-400 transition-colors relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E31E24] flex items-center justify-center font-bold">
            <Eye className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-cairo">
            {t('aboutVisionTitle')}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {lang === 'ar' ? settings.vision_ar : settings.vision_en}
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:border-blue-400 transition-colors relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2B3990] flex items-center justify-center font-bold">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-cairo">
            {t('aboutMissionTitle')}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {lang === 'ar' ? settings.mission_ar : settings.mission_en}
          </p>
        </div>
      </div>

      {/* 3️⃣ THIRD SECTION: Core Institutional Values */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-md">
            {lang === 'ar' ? 'قيمنا ومبادئنا' : 'Our Core Values'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-cairo">
            {t('aboutValuesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-red-300 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-[#E31E24]" />
            <h3 className="text-base font-bold text-slate-900 font-cairo">{t('aboutValue1')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar' ? 'التزام بتوريد أنظمة السلامة والإطفاء وفق أعلى معايير الجودة الدولية ISO.' : 'Committed to supplying safety & fire systems compliant with global ISO standards.'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-[#2B3990]" />
            <h3 className="text-base font-bold text-slate-900 font-cairo">{t('aboutValue2')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar' ? 'استجابة سريعة ودقة تامة في تنفيذ ونشر الفرَق الفنية وعقود الصيانة.' : 'Rapid response and precision in deploying technical teams & maintenance contracts.'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-amber-300 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 font-cairo">{t('aboutValue3')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar' ? 'توفير أحدث التقنيات الذكية وأنظمة المراقبة والتحكم بالدخول المتطورة.' : 'Providing smart security tech, CCTV surveillance & advanced access control.'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-emerald-300 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-cairo">{t('aboutValue4')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar' ? 'الحفاظ على أرواح وممتلكات المنشآت والمجتمعات وفق الرؤية والأنظمة الوطنية.' : 'Safeguarding lives and enterprise assets in alignment with Saudi Vision.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4️⃣ FOURTH SECTION: Company Profile Download CTA Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8 sm:p-10 rounded-3xl text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 text-red-400 border border-red-800/80 rounded-full text-xs font-bold">
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الملف التعريفي الشامل' : 'Company Profile Deck'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cairo">
            {lang === 'ar' ? 'تصفح البروفايل الرسمي لشركة تقنية الأمان الأولى (PDF)' : 'Download Official Company Profile (PDF)'}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            {lang === 'ar' 
              ? 'يتضمن البروفايل جميع التفاصيل الفنية الهندسية، قائمة المشاريع المنفذة، اعتمادات الدفاع المدني، ونطاق الخدمات المتاحة.'
              : 'Explore our complete portfolio, Civil Defense certifications, engineering capabilites, and project showcases.'}
          </p>
        </div>

        {settings.company_profile_url ? (
          <a
            href={settings.company_profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#E31E24] hover:bg-[#C41419] text-white font-extrabold rounded-2xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2 text-sm shrink-0 active:scale-95"
          >
            <Download className="w-5 h-5" />
            <span>{lang === 'ar' ? 'تصفح / تحميل البروفايل (PDF)' : 'Download Profile PDF'}</span>
          </a>
        ) : (
          <div className="px-6 py-3 bg-slate-800 text-slate-400 font-bold text-xs rounded-xl border border-slate-700 shrink-0">
            {lang === 'ar' ? 'يمكنك رفع البروفايل من لوحة التحكم' : 'Upload Profile in Admin Panel'}
          </div>
        )}
      </div>

    </div>
  );
}
