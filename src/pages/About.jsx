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
  ArrowUpRight
} from 'lucide-react';

export default function About() {
  const { t, lang } = useLanguage();
  const { settings } = useData();
  const [orgChartModalOpen, setOrgChartModalOpen] = useState(false);

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

      {/* 4️⃣ FOURTH SECTION: MANPOWER & TECHNICAL WORKFORCE (القوى العاملة والكوادر الفنية) */}
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

      {/* 5️⃣ FIFTH SECTION: ORGANIZATIONAL STRUCTURE (الهيكل التنظيمي والإداري) */}
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

          {/* If Custom Org Chart Image is Uploaded from Admin */}
          {settings.org_chart_image_url && settings.org_chart_image_url.trim() !== '' && (
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-slate-900 group shadow-lg">
                <img
                  src={settings.org_chart_image_url}
                  alt="الهيكل التنظيمي - شركة تقنية الأمان الأولى"
                  className="w-full max-h-[500px] object-contain p-2 bg-slate-950/80 cursor-pointer"
                  onClick={() => setOrgChartModalOpen(true)}
                />

                {/* Hover overlay with fullscreen button */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrgChartModalOpen(true);
                    }}
                    className="pointer-events-auto px-5 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 hover:bg-[#E31E24] hover:text-white transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>{t('viewOrgChart')}</span>
                  </button>

                  <a
                    href={settings.org_chart_image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-4 py-2.5 bg-slate-900/90 text-white font-bold text-xs rounded-xl shadow-xl flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
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
                  className="text-[#2B3990] hover:text-[#E31E24] font-bold flex items-center gap-1 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t('viewOrgChart')}</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Corporate Hierarchy Tree (الشجرة الهرمية الإدارية التفاعلية) */}
          <div className="space-y-6 pt-2">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                {lang === 'ar' ? 'مخطط التدفق الإداري والتسلسل القيادي' : 'Corporate Governance & Departmental Hierarchy'}
              </span>
            </div>

            <div className="space-y-4 max-w-5xl mx-auto">
              
              {/* Level 1: Board of Directors */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-lg border-2 border-slate-700 text-center max-w-md w-full relative">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Level 01
                  </div>
                  <h3 className="font-extrabold text-base font-cairo">
                    {lang === 'ar' ? 'مجلس الإدارة والإدارة العليا' : 'Board of Directors & Senior Governance'}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {lang === 'ar' ? 'التخطيط الاستراتيجي، الحوكمة المؤسسية، والتوجيه المالي' : 'Strategic Planning, Corporate Governance & Financial Oversight'}
                  </p>
                </div>
              </div>

              {/* Connecting Line 1 */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-slate-300"></div>
              </div>

              {/* Level 2: Executive Management / CEO */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-[#2B3990] to-[#1E286C] text-white p-5 rounded-2xl shadow-md border-2 border-blue-400/40 text-center max-w-md w-full relative">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Level 02
                  </div>
                  <h3 className="font-extrabold text-base font-cairo">
                    {lang === 'ar' ? 'الإدارة التنفيذية والمدير العام (CEO)' : 'Executive Management & General Manager'}
                  </h3>
                  <p className="text-[11px] text-blue-100 mt-0.5">
                    {lang === 'ar' ? 'إدارة العمليات التشغيلية، الإشراف على المشاريع، والعلاقات الاستراتيجية' : 'Operational Management, Project Execution Oversight & Strategic Alliances'}
                  </p>
                </div>
              </div>

              {/* Connecting Line 2 */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-slate-300"></div>
              </div>

              {/* Level 3: 4 Core Operational & Technical Departments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Dept 1 */}
                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-colors shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2B3990] flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 font-cairo">
                      {lang === 'ar' ? 'إدارة المشاريع والهندسة' : 'Projects & Engineering'}
                    </h4>
                    <p className="text-[10px] text-blue-700 font-bold mt-0.5">
                      Engineering & Design
                    </p>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1.5 border-t pt-2 border-slate-200/80">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{lang === 'ar' ? 'تصميم واعتماد المخططات' : 'Safety CAD Drawings'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{lang === 'ar' ? 'الحسابات الهيدروليكية والمضخات' : 'Hydraulic & Pump Studies'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{lang === 'ar' ? 'الإشراف الهندسي الميداني' : 'Site Engineers & Delivery'}</span>
                    </li>
                  </ul>
                </div>

                {/* Dept 2 */}
                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-colors shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E31E24] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 font-cairo">
                      {lang === 'ar' ? 'إدارة الإطفاء والسلامة' : 'Fire & Safety Systems'}
                    </h4>
                    <p className="text-[10px] text-red-700 font-bold mt-0.5">
                      Protection Operations
                    </p>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1.5 border-t pt-2 border-slate-200/80">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>{lang === 'ar' ? 'شبكات الرش الآلي المائية' : 'Sprinkler & Water Piping'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>{lang === 'ar' ? 'أنظمة الغاز النظيف FM200' : 'Clean Agent Gas Systems'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>{lang === 'ar' ? 'لوحات الإنذار وكواشف الأدخنة' : 'Fire Alarm Control Panels'}</span>
                    </li>
                  </ul>
                </div>

                {/* Dept 3 */}
                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 font-cairo">
                      {lang === 'ar' ? 'إدارة التشغيل والصيانة' : 'Operations & Maintenance'}
                    </h4>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                      24/7 Field Support
                    </p>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1.5 border-t pt-2 border-slate-200/80">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{lang === 'ar' ? 'عقود الصيانة السنوية المعتمدة' : 'Annual Civil Defense AMC'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{lang === 'ar' ? 'صيانة وتحديث المصاعد' : 'Elevator Maintenance'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{lang === 'ar' ? 'فِرق الطوارئ والاستجابة السريعة' : '24/7 Emergency Dispatch'}</span>
                    </li>
                  </ul>
                </div>

                {/* Dept 4 */}
                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 transition-colors shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 font-cairo">
                      {lang === 'ar' ? 'إدارة الجودة والسلامة OSHA' : 'Quality & OSHA Safety'}
                    </h4>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">
                      Quality & Compliance
                    </p>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1.5 border-t pt-2 border-slate-200/80">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>{lang === 'ar' ? 'تدقيق معايير ISO و NFPA' : 'ISO & NFPA Auditing'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>{lang === 'ar' ? 'السلامة المهنية للعمالة PPE' : 'Workforce PPE Protocols'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>{lang === 'ar' ? 'شهادات الإنجاز والاعتماد' : 'Handover & Certification'}</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL FOR ORGANIZATIONAL CHART */}
      {orgChartModalOpen && settings.org_chart_image_url && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[92vh]">
            
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
                  href={settings.org_chart_image_url}
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
            <div className="p-4 overflow-auto flex items-center justify-center bg-black/60 flex-1">
              <img
                src={settings.org_chart_image_url}
                alt="الهيكل التنظيمي"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6️⃣ SIXTH SECTION: Company Profile Download CTA Banner */}
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
