import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Award, 
  CheckCircle2, 
  FileCheck2, 
  Building2, 
  Sparkles, 
  FileText, 
  Download,
  Users,
  HardHat,
  Wrench,
  Network,
  Maximize2,
  X,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BadgeCheck
} from 'lucide-react';

export default function About() {
  const { t, lang } = useLanguage();
  const { settings, certificates = [], accreditationLogos = [], openProfileModal } = useData();
  const [orgChartModalOpen, setOrgChartModalOpen] = useState(false);
  const [activeCertCategory, setActiveCertCategory] = useState('all');
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  const aboutImgSrc = (settings && settings.about_image_url && settings.about_image_url.trim() !== '') 
    ? settings.about_image_url 
    : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80";

  const orgChartImg = (settings && settings.org_chart_image_url && settings.org_chart_image_url.trim() !== '')
    ? settings.org_chart_image_url
    : '/organizational_chart.jpg';

  const currentCert = (selectedCertIndex !== null && certificates && certificates[selectedCertIndex]) 
    ? certificates[selectedCertIndex] 
    : null;

  const handlePrevCert = () => {
    if (selectedCertIndex !== null && certificates && certificates.length > 0) {
      setSelectedCertIndex((selectedCertIndex - 1 + certificates.length) % certificates.length);
    }
  };

  const handleNextCert = () => {
    if (selectedCertIndex !== null && certificates && certificates.length > 0) {
      setSelectedCertIndex((selectedCertIndex + 1) % certificates.length);
    }
  };

  const certCategories = [
    { id: 'all', label_ar: 'جميع الوثائق والاعتمادات', label_en: 'All Documents', count: certificates?.length || 15 },
    { id: 'security_defense', label_ar: 'الأمن الصناعي والدفاع المدني', label_en: 'Industrial Security & Defense', count: (certificates || []).filter(c => c.category === 'security_defense').length },
    { id: 'iso', label_ar: 'شهادات الآيزو (ISO)', label_en: 'ISO Certifications', count: (certificates || []).filter(c => c.category === 'iso').length },
    { id: 'corporate_authorities', label_ar: 'أرامكو وهيئة المقاولين', label_en: 'Aramco & SCA', count: (certificates || []).filter(c => c.category === 'corporate_authorities').length },
    { id: 'commercial_licenses', label_ar: 'التراخيص والسجلات', label_en: 'Commercial Licenses', count: (certificates || []).filter(c => c.category === 'commercial_licenses').length },
  ];

  const filteredCertificates = activeCertCategory === 'all'
    ? (certificates || [])
    : (certificates || []).filter(c => c.category === activeCertCategory);

  const displayedCertificates = (activeCertCategory === 'all' && !showAllCerts)
    ? filteredCertificates.slice(0, 6)
    : filteredCertificates;

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'blue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

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

      {/* 4️⃣ FOURTH SECTION: MANPOWER & TECHNICAL WORKFORCE (القوى العاملة والكوادر الفنية) */}
      {settings.show_manpower_section !== false && (
      <section id="manpower" className="scroll-mt-24 space-y-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-8 relative overflow-hidden">
          <div className="absolute top-0 start-0 w-2.5 h-full bg-gradient-to-b from-[#E31E24] via-[#2B3990] to-emerald-600"></div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 border-slate-100">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-md">
                <Users className="w-3.5 h-3.5" />
                <span>{t('manpowerBadge')}</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-cairo">
                {lang === 'ar' 
                  ? (settings.manpower_title_ar || 'الكوادر البشرية والفرق الفنية المتخصصة')
                  : (settings.manpower_title_en || 'Specialized Engineering & Technical Workforce')}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {lang === 'ar'
                  ? (settings.manpower_desc_ar || 'تضم شركة تقنية الأمان الأولى نخبة رائدة من المهندسين الاستشاريين والفنيين المؤهلين والعمالة المهنية المدربة وفق أعلى معايير السلامة المهنية ومواصفات الدفاع المدني السعودي لتنفيذ وإدارة أضخم المشاريع.')
                  : (settings.manpower_desc_en || 'Al-Aman Al-Awal features a premier team of certified engineers, licensed technicians, and skilled workforce compliant with Saudi Civil Defense and OSHA standards.')}
              </p>
            </div>

            {/* Total Badge Pill */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border border-slate-700 shadow-md shrink-0 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-[#E31E24] flex items-center justify-center font-black text-xl font-cairo border border-red-500/30">
                +{(Number(settings.stat_engineers) || 25) + (Number(settings.stat_technicians) || 60) + (Number(settings.stat_workers) || 120) + (Number(settings.stat_supervisors) || 18)}
              </div>
              <div>
                <div className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">
                  {t('totalManpower')}
                </div>
                <div className="text-sm font-black font-cairo text-white">
                  {lang === 'ar' ? 'كادر هندسي وفني ميداني' : 'Field & Technical Crew'}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Detailed Interactive Counter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Engineers */}
            <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2B3990] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <HardHat className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {lang === 'ar' ? 'معتمدون SCE' : 'SCE Certified'}
                </span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#2B3990] font-cairo">
                  +{settings.stat_engineers || 25}
                </div>
                <div className="font-bold text-sm text-slate-900 font-cairo mt-1">
                  {t('engineersCount')}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'مهندسون استشاريون معتمدون في الميكانيكا، الكهرباء، وهندسة الإطفاء والسلامة لإعداد واعتماد المخططات والإشراف الميداني.'
                  : 'Certified mechanical, electrical, and fire protection engineers handling calculations and on-site technical supervision.'}
              </p>
            </div>

            {/* Card 2: Technicians */}
            <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-400 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E31E24] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  {lang === 'ar' ? 'فحص دوري 24/7' : 'Field Certified'}
                </span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#E31E24] font-cairo">
                  +{settings.stat_technicians || 60}
                </div>
                <div className="font-bold text-sm text-slate-900 font-cairo mt-1">
                  {t('techniciansCount')}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'فنيو تركيب متمرسون في شبكات الرش الآلي، لحام الأنابيب، برمجة لوحات الإنذار المعنونة، كاميرات المراقبة، وصيانة المصاعد.'
                  : 'Specialized technicians in automatic sprinkler piping, addressable alarm panels, CCTV, and elevator preventive maintenance.'}
              </p>
            </div>

            {/* Card 3: Skilled Workers */}
            <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {lang === 'ar' ? 'تدريب سلامة PPE' : 'Safety Trained'}
                </span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-cairo">
                  +{settings.stat_workers || 120}
                </div>
                <div className="font-bold text-sm text-slate-900 font-cairo mt-1">
                  {t('workersCount')}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'عمالة نظامية ماهرة مدربة على تنفيذ الأعمال المدنية والميكانيكية والتركيبات وتمديد الكابلات تحت إشراف هندسي مباشر.'
                  : 'Skilled workforce trained in civil & mechanical safety installations, high-spec cabling, and prompt field delivery.'}
              </p>
            </div>

            {/* Card 4: Site Supervisors & Safety Officers */}
            <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {lang === 'ar' ? 'امتثال OSHA & SBC' : 'OSHA Compliant'}
                </span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-600 font-cairo">
                  +{settings.stat_supervisors || 18}
                </div>
                <div className="font-bold text-sm text-slate-900 font-cairo mt-1">
                  {t('supervisorsCount')}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'ضباط ومشرفو سلامة مهنية يراقبون بيئة العمل لضمان تطبيق اشتراطات الدفاع المدني، كود البناء السعودي، ومعايير NFPA.'
                  : 'OSHA & SBC safety officers auditing work sites to guarantee full compliance with Saudi Building Codes & NFPA standards.'}
              </p>
            </div>

          </div>

          {/* Accreditation Ribbon */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'ar' ? 'فريق فني مرخص ومسجل لدى الهيئة السعودية للمهندسين' : 'Registered with the Saudi Council of Engineers (SCE)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{lang === 'ar' ? 'التزام باشتراطات السلامة المهنية وتراخيص الدفاع المدني' : 'Full compliance with Civil Defense safety regulations'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
              <span>{lang === 'ar' ? 'جاهزية عالية للانتشار الفوري في جميع مناطق المملكة' : 'Rapid nationwide deployment capability across KSA'}</span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 5️⃣ FIFTH SECTION: ORGANIZATIONAL STRUCTURE (الهيكل التنظيمي والإداري) */}
      {settings.show_org_chart_section !== false && (
        <>
          <section id="org-chart" className="scroll-mt-24 space-y-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B3990] uppercase tracking-wider bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-md">
              <Network className="w-3.5 h-3.5" />
              <span>{t('orgChartBadge')}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-cairo">
              {lang === 'ar'
                ? (settings.org_chart_title_ar || 'الهيكل التنظيمي والإداري للشركة')
                : (settings.org_chart_title_en || 'Company Organizational Structure')}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {lang === 'ar'
                ? (settings.org_chart_desc_ar || 'يعكس الهيكل التنظيمي لشركة تقنية الأمان الأولى نموذجاً إدارياً متكاملاً يتسم بالمرونة والسرعة في اتخاذ القرار وتوزيع المسؤوليات لضمان تسليم المشاريع وفق أعلى معايير الجودة والحوكمة المؤسسية.')
                : (settings.org_chart_desc_en || 'Our organizational structure reflects an agile, integrated corporate governance model ensuring swift decision-making and seamless project delivery to the highest industry standards.')}
            </p>
          </div>

          {/* Organizational Chart Image Display */}
          {orgChartImg && (
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-white group shadow-sm hover:shadow-md transition-all">
                <img
                  src={orgChartImg}
                  alt={lang === 'ar' ? 'الهيكل التنظيمي - شركة تقنية الأمان الأولى' : 'Organizational Chart - Al-Aman Al-Awal'}
                  className="w-full max-h-[560px] object-contain p-2 sm:p-4 bg-white cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                  onClick={() => setOrgChartModalOpen(true)}
                />

                {/* Hover overlay with fullscreen button */}
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrgChartModalOpen(true);
                    }}
                    className="pointer-events-auto px-5 py-2.5 bg-[#2B3990] text-white font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 hover:bg-[#E31E24] transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>{t('viewOrgChart')}</span>
                  </button>

                  <a
                    href={orgChartImg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-4 py-2.5 bg-white text-slate-800 font-bold text-xs rounded-xl shadow-xl flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('downloadOrgChart')}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                <span>💡 {lang === 'ar' ? 'اضغط على المخطط لتكبيره بملء الشاشة بجودة فائقة' : 'Click the diagram to expand in full high-resolution modal'}</span>
                <button
                  type="button"
                  onClick={() => setOrgChartModalOpen(true)}
                  className="text-[#2B3990] hover:text-[#E31E24] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t('viewOrgChart')}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* LIGHTBOX MODAL FOR ORGANIZATIONAL CHART */}
      {orgChartModalOpen && orgChartImg && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setOrgChartModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 text-[#E31E24] flex items-center justify-center font-bold">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-cairo">
                    {lang === 'ar'
                      ? (settings.org_chart_title_ar || 'الهيكل التنظيمي والإداري للشركة')
                      : (settings.org_chart_title_en || 'Company Organizational Structure')}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'مخطط الحوكمة المؤسسية لشركة تقنية الأمان الأولى' : 'Corporate Governance Diagram - Al-Aman Al-Awal'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={orgChartImg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'ar' ? 'فتح بحجم كامل' : 'Open Full Size'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOrgChartModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="p-3 sm:p-5 overflow-auto flex items-center justify-center bg-white/95 flex-1">
              <img
                src={orgChartImg}
                alt="الهيكل التنظيمي"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
      </>
      )}

      {/* 6️⃣ SIXTH SECTION: ACCREDITATIONS & TECHNICAL CERTIFICATES (الاعتمادات والتراخيص والشهادات الرسمية) */}
      {settings.show_accreditations_section !== false && (
      <section id="accreditations" className="scroll-mt-24 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 border border-red-200 px-3.5 py-1 rounded-md">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الاعتمادات والتراخيص الرسمية' : 'Official Accreditations & Licenses'}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-cairo">
              {lang === 'ar' ? 'شهادات الجودة والتراخيص والاعتمادات الرسمية' : 'Accreditations, Certifications & Government Licenses'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {lang === 'ar'
                ? 'تعتز شركة تقنية الأمان الأولى بحصولها على نخبة من أرفع التراخيص والاعتمادات الصادرة من الهيئة العليا للأمن الصناعي، المديرية العامة للدفاع المدني، تأهيل أرامكو السعودية، شهادات الآيزو العالمية (ISO 9001, ISO 14001, ISO 45001)، وعضوية الهيئة السعودية للمقاولين.'
                : 'Al-Aman Al-Awal takes pride in holding premier accreditations from HCIS, Civil Defense, Saudi Aramco, ISO Standards, and the Saudi Contractors Authority.'}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-2xl font-black text-[#E31E24] font-cairo">HCIS</div>
              <div className="text-[11px] font-bold text-slate-600 mt-1">
                {lang === 'ar' ? 'معتمد للأمن الصناعي' : 'HCIS Accredited'}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-2xl font-black text-[#2B3990] font-cairo">ISO 9001</div>
              <div className="text-[11px] font-bold text-slate-600 mt-1">
                {lang === 'ar' ? 'جودة وسلامة وبيئة' : 'Quality, Safety & Env'}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-2xl font-black text-emerald-600 font-cairo">أرامكو</div>
              <div className="text-[11px] font-bold text-slate-600 mt-1">
                {lang === 'ar' ? 'مورد معتمد #10115978' : 'Approved Vendor'}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-2xl font-black text-amber-600 font-cairo">سلامة</div>
              <div className="text-[11px] font-bold text-slate-600 mt-1">
                {lang === 'ar' ? 'ترخيص الدفاع المدني' : 'Civil Defense Licensed'}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
            {certCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCertCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeCertCategory === cat.id
                    ? 'bg-[#2B3990] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{lang === 'ar' ? cat.label_ar : cat.label_en}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeCertCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCertificates.map((cert) => {
              const originalIndex = (certificates || []).findIndex(c => c.id === cert.id);
              return (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl border-2 border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Document Thumbnail Preview */}
                  <div
                    className="relative h-56 bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center p-3 border-b border-slate-200/80"
                    onClick={() => setSelectedCertIndex(originalIndex >= 0 ? originalIndex : 0)}
                  >
                    <img
                      src={cert.image_url}
                      alt={lang === 'ar' ? cert.title_ar : cert.title_en}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xs transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge on Top */}
                    <div className="absolute top-3 start-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-md border shadow-xs ${getBadgeStyle(cert.badge_color)}`}>
                        <FileCheck2 className="w-3 h-3" />
                        <span>{lang === 'ar' ? cert.badge_ar : cert.badge_en}</span>
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
                      <span className="px-4 py-2 bg-white/95 text-slate-900 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-[#E31E24]" />
                        <span>{lang === 'ar' ? 'انقر لتكبير الوثيقة' : 'Click to Expand'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug font-cairo line-clamp-2">
                        {lang === 'ar' ? cert.title_ar : cert.title_en}
                      </h3>
                      
                      <div className="flex items-start gap-1.5 text-xs text-slate-600">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-tight">
                          {lang === 'ar' ? cert.authority_ar : cert.authority_en}
                        </span>
                      </div>
                    </div>

                    {/* Reference / License Number Badge */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">
                        {lang === 'ar' ? 'رقم الترخيص / المرجع:' : 'License / Ref:'}
                      </span>
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {cert.license_no}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedCertIndex(originalIndex >= 0 ? originalIndex : 0)}
                        className="w-full py-2 bg-blue-50 hover:bg-[#2B3990] text-[#2B3990] hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'تكبير الوثيقة' : 'View Full'}</span>
                      </button>

                      <a
                        href={cert.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'الأصل' : 'Direct Link'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expand / Collapse Button if viewing 'all' and more than 6 certificates */}
          {activeCertCategory === 'all' && filteredCertificates.length > 6 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-[#2B3990] hover:text-[#E31E24] font-bold text-xs sm:text-sm rounded-2xl border-2 border-slate-200 hover:border-[#2B3990] shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                {showAllCerts ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'عرض أقل' : 'Show Less'}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? `استعراض باقي الشهادات والاعتمادات (+${filteredCertificates.length - 6})`
                        : `View Remaining Certificates (+${filteredCertificates.length - 6})`}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Compact Accredited Authorities Ribbon (شريط أفقي مدمج وأنيق) */}
          {settings.show_accreditation_logos !== false && accreditationLogos && accreditationLogos.length > 0 && (
            <div className="pt-6 border-t border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 font-cairo flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
                  <span>{lang === 'ar' ? 'الجهات والوزارات الحكومية المعتمدين لديها:' : 'Accredited Regulatory Authorities:'}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {accreditationLogos.filter(a => a.is_active !== false).length} {lang === 'ar' ? 'جهة وهيئة رسمية' : 'Accredited Bodies'}
                </span>
              </div>

              {/* Sleek Horizontal Scrolling Strip */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {accreditationLogos.filter(a => a.is_active !== false).map((auth) => (
                  <div
                    key={auth.id}
                    className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all shrink-0 shadow-2xs group cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white p-1 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={auth.logo_url}
                        alt={lang === 'ar' ? auth.name_ar : auth.name_en}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 whitespace-nowrap">
                        {lang === 'ar' ? auth.name_ar : auth.name_en}
                      </div>
                      <div className="text-[10px] text-slate-500 whitespace-nowrap font-medium">
                        {lang === 'ar' ? auth.badge_ar : auth.badge_en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
      )}

      {/* 7️⃣ SEVENTH SECTION: Unified Company Documents & Profile Download Banner */}
      {settings.show_profile_download_section !== false && (
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 text-red-400 border border-red-800/80 rounded-full text-xs font-bold">
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الملفات الرسمية والوثائق المعتمدة (PDF)' : 'Official Certified Documents (PDF)'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-cairo">
            {lang === 'ar' ? 'تحميل البروفايل التعريفي وكتيب وثائق الشركة' : 'Download Company Profile & Complete Document Portfolio'}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            {lang === 'ar' 
              ? 'حمّل مباشرة البروفايل الفني والهندسي أو ملف وثائق الشركة الشامل (43 صفحة) المتضمن كافة التراخيص الحكومية، واعتمادات أرامكو والأمن الصناعي لتقديمها في المناقصات والمشاريع.'
              : 'Download our comprehensive company profile or full 43-page official documents portfolio including HCIS, Civil Defense, and Aramco vendor certifications.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
          <a
            href="/documents/company_documents.pdf"
            download="ملف_وثائق_شركة_تقنية_الأمان_الأولى.pdf"
            className="px-5 py-3.5 bg-gradient-to-r from-[#1E286C] to-[#2B3990] hover:from-[#2B3990] hover:to-[#1E286C] text-white font-bold text-xs rounded-2xl shadow-lg border border-blue-400/40 transition-all flex items-center gap-2 active:scale-95"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'ملف الوثائق (43 صفحة - PDF)' : 'Document Portfolio (43 Pages)'}</span>
          </a>

          {settings.company_profile_url ? (
            <a
              href={settings.company_profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#E31E24] hover:bg-[#C41419] text-white font-bold text-xs rounded-2xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ar' ? 'البروفايل التعريفي (PDF)' : 'Profile Deck (PDF)'}</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={openProfileModal}
              className="px-5 py-3.5 bg-[#E31E24] hover:bg-[#C41419] text-white font-bold text-xs rounded-2xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ar' ? 'البروفايل التعريفي (PDF)' : 'Profile Deck (PDF)'}</span>
            </button>
          )}
        </div>
      </div>
      )}

      {/* LIGHTBOX MODAL FOR CERTIFICATES & ACCREDITATIONS */}
      {currentCert && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedCertIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-[#E31E24] flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getBadgeStyle(currentCert.badge_color)}`}>
                      {lang === 'ar' ? currentCert.badge_ar : currentCert.badge_en}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {currentCert.license_no}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white truncate font-cairo mt-0.5">
                    {lang === 'ar' ? currentCert.title_ar : currentCert.title_en}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={currentCert.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'ar' ? 'فتح بحجم كامل' : 'Open Full'}</span>
                </a>
                <a
                  href={currentCert.image_url}
                  download
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'ar' ? 'تحميل' : 'Download'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCertIndex(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Next/Prev Controls */}
            <div className="relative p-3 sm:p-5 overflow-auto flex items-center justify-center bg-slate-950/80 flex-1">
              <img
                src={currentCert.image_url}
                alt={lang === 'ar' ? currentCert.title_ar : currentCert.title_en}
                className="max-h-[76vh] w-auto max-w-full object-contain rounded-xl shadow-2xl bg-white p-2"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevCert}
                className="absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-red-600 text-white backdrop-blur-sm transition-colors shadow-xl cursor-pointer"
                title={lang === 'ar' ? 'الوثيقة السابقة' : 'Previous Certificate'}
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextCert}
                className="absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-red-600 text-white backdrop-blur-sm transition-colors shadow-xl cursor-pointer"
                title={lang === 'ar' ? 'الوثيقة التالية' : 'Next Certificate'}
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </div>

            {/* Modal Footer with Pagination Info */}
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{lang === 'ar' ? currentCert.authority_ar : currentCert.authority_en}</span>
              <span>
                {selectedCertIndex + 1} / {certificates?.length || 15}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
