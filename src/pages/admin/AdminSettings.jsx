import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import ImageUploadInput from '../../components/ImageUploadInput';
import DocumentUploadInput from '../../components/DocumentUploadInput';
import { Save, CheckCircle2, Layers, Eye, EyeOff, Check, X } from 'lucide-react';

export default function AdminSettings() {
  const { t, lang } = useLanguage();
  const { settings, updateSettings } = useData();

  const [formData, setFormData] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Banner with Top Save Button */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-20 z-40">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-cairo">{t('manageSettings')}</h1>
          <p className="text-xs text-slate-500">تحديث الشعار، الملف التعريفي PDF، الهواتف، رقم الواتساب، النبذة، والعدادات فوراً</p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>تم حفظ التعديلات بنجاح!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-[#E31E24] to-[#2B3990] text-white font-extrabold text-xs rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>حفظ جميع التعديلات</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <a href="#sec-sections" className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200 shrink-0 transition-colors flex items-center gap-1.5 shadow-sm">
          <span>⚡</span>
          <span>نشر وتعطيل الأقسام (Section Control)</span>
        </a>
        <a href="#sec-brand" className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shrink-0 transition-colors">
          الشعار والبروفايل
        </a>
        <a href="#sec-contact" className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shrink-0 transition-colors">
          معلومات التواصل
        </a>
        <a href="#sec-stats" className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shrink-0 transition-colors">
          العدادات العامة
        </a>
        <a href="#sec-hero" className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shrink-0 transition-colors">
          الواجهة الرئيسية
        </a>
        <a href="#sec-about" className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shrink-0 transition-colors">
          صفحة من نحن
        </a>
        <a href="#sec-manpower" className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-[#E31E24] font-bold rounded-xl border border-red-200 shrink-0 transition-colors flex items-center gap-1 shadow-sm">
          <span>👷‍♂️</span>
          <span>القوى العاملة (Manpower)</span>
        </a>
        <a href="#sec-org" className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#2B3990] font-bold rounded-xl border border-blue-200 shrink-0 transition-colors flex items-center gap-1 shadow-sm">
          <span>🏢</span>
          <span>الهيكل التنظيمي (Org Structure)</span>
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Section -1: Section Visibility & Publishing Controls */}
        <div id="sec-sections" className="bg-white p-6 rounded-2xl border-2 border-emerald-500/30 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Layers className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-slate-900 font-cairo">
                  إدارة نشر وتعطيل أقسام الموقع (Section Publishing Control)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                يمكنك بنقرة زر واحدة إظهار أو إخفاء أي قسم في الموقع مباشرة لجميع الزوار دون التأثير على البيانات المحفوظة.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    show_hero_section: true,
                    show_services_section: true,
                    show_manpower_section: true,
                    show_org_chart_section: true,
                    show_accreditations_section: true,
                    show_accreditation_logos: true,
                    show_projects_section: true,
                    show_clients_section: true,
                    show_profile_download_section: true,
                    show_quote_section: true
                  }));
                }}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
              >
                تفعيل ونشر الكل
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    show_hero_section: false,
                    show_services_section: false,
                    show_manpower_section: false,
                    show_org_chart_section: false,
                    show_accreditations_section: false,
                    show_accreditation_logos: false,
                    show_projects_section: false,
                    show_clients_section: false,
                    show_profile_download_section: false,
                    show_quote_section: false
                  }));
                }}
                className="px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
              >
                تعطيل الكل
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              {
                key: 'show_hero_section',
                title: 'الواجهة الرئيسية والبانر الترحيبي (Hero Section)',
                desc: 'السلايدر التفاعلي والعناوين الرئيسية وأزرار الإجراءات السريعة',
                pages: 'الصفحة الرئيسية',
                icon: '🚀'
              },
              {
                key: 'show_services_section',
                title: 'خدمات وأنظمة السلامة (Services & Solutions)',
                desc: 'شبكة بطاقات الخدمات الـ 12 المتخصصة للسلامة ومكافحة الحريق',
                pages: 'الرئيسية والكتالوج',
                icon: '🧯'
              },
              {
                key: 'show_manpower_section',
                title: 'قسم الكوادر البشرية والفرق الفنية (Manpower Section)',
                desc: 'عدادات وبطاقات المهندسين والفنيين ومشرفي السلامة والعمالة',
                pages: 'صفحة من نحن',
                icon: '👷‍♂️'
              },
              {
                key: 'show_org_chart_section',
                title: 'الهيكل التنظيمي والإداري للشركة (Org Structure Chart)',
                desc: 'مخطط الهيكل الإداري والقيادي وتسلسل الفرق التنفيذية',
                pages: 'صفحة من نحن',
                icon: '🏢'
              },
              {
                key: 'show_accreditations_section',
                title: 'قسم الشهادات والاعتمادات الرسمية (Accreditations & Certs)',
                desc: 'تراخيص HCIS، الدفاع المدني، شهادات ISO العالمية، وتصنيف المقاولين',
                pages: 'صفحة من نحن',
                icon: '📜'
              },
              {
                key: 'show_accreditation_logos',
                title: 'شريط شعارات الجهات المعتمدة (Accreditation Logos Ribbon)',
                desc: 'عرض شعارات الهيئات والوزارات الحكومية المعتمدين لديها',
                pages: 'الرئيسية ومن نحن',
                icon: '🏛️'
              },
              {
                key: 'show_projects_section',
                title: 'قسم سابقة الأعمال والمشاريع (Projects Showcase)',
                desc: 'معرض المشاريع المنفذة مع الفلاتر وصور الأعمال الميدانية',
                pages: 'الرئيسية والمشاريع',
                icon: '🏗️'
              },
              {
                key: 'show_clients_section',
                title: 'قسم شركاء النجاح وعملاؤنا (Clients & Partners)',
                desc: 'شريط وشبكة شعارات كبرى الشركات والمؤسسات الشريكة',
                pages: 'الرئيسية والعملاء',
                icon: '🤝'
              },
              {
                key: 'show_profile_download_section',
                title: 'بنرات تحميل البروفايل ووثائق الشركة (Profile Download CTA)',
                desc: 'أزرار وبنرات تنزيل البروفايل وكتيب وثائق الشركة المجمّع 43 صفحة',
                pages: 'الرئيسية ومن نحن',
                icon: '📥'
              },
              {
                key: 'show_quote_section',
                title: 'نموذج طلب عرض السعر السريع (Request Quote Form)',
                desc: 'نموذج تقديم طلبات عروض الأسعار والمواصفات الفنية',
                pages: 'الرئيسية وصفحة الطلب',
                icon: '📋'
              }
            ].map((sec) => {
              const isEnabled = formData[sec.key] !== false;
              return (
                <div
                  key={sec.key}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isEnabled
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-slate-50/70 border-dashed border-slate-300 opacity-75'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{sec.icon}</span>
                      <h4 className="font-bold text-slate-900 text-xs">{sec.title}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                        {sec.pages}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pr-6">{sec.desc}</p>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                      <span className={`text-[10px] font-bold ${isEnabled ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {isEnabled ? 'منشور ونشط على الموقع' : 'معطّل ومخفي حالياً'}
                      </span>
                    </div>
                  </div>

                  {/* Clean Accessible Toggle Switch */}
                  <div dir="ltr" className="shrink-0">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      onClick={() => setFormData(prev => ({ ...prev, [sec.key]: prev[sec.key] === false ? true : false }))}
                      className={`w-12 h-6.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
                        isEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <span className="bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Section 0: Custom Logo Upload */}
        <div id="sec-brand" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-cairo border-b pb-2 border-slate-100">
            شعار الشركة (رفع صورة من جهازك)
          </h3>

          <ImageUploadInput
            label="رفع صورة الشعار من جهازك (اختياري لاستبدال الشعار الحالي)"
            recommendedSize="500 × 160 px (خلفية شفافة PNG بنسبة 3:1)"
            value={formData.custom_logo_url || ''}
            onChange={(newUrl) => setFormData({ ...formData, custom_logo_url: newUrl })}
          />
        </div>

        {/* Section 0.5: Company Profile PDF Upload */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-cairo border-b pb-2 border-slate-100">
            البروفايل التعريفي للشركة (Company Profile PDF)
          </h3>
          
          <DocumentUploadInput
            label="رفع ملف البروفايل التعريفي للشركة (PDF)"
            recommendedFormat="ملف PDF أو رابط مستند خارجي"
            placeholder="ضع رابط ملف PDF هنا أو اختر ملفاً من جهازك..."
            value={formData.company_profile_url || ''}
            onChange={(newUrl) => setFormData({ ...formData, company_profile_url: newUrl })}
          />
        </div>

        {/* Section 1: Contact Information */}
        <div id="sec-contact" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-cairo border-b pb-2 border-slate-100">
            معلومات التواصل والرابط المباشر
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">رقم الواتساب (WhatsApp Number)</label>
              <input
                type="text"
                dir="ltr"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">رقم الهاتف (Phone Number)</label>
              <input
                type="text"
                dir="ltr"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">البريد الإلكتروني (Official Email)</label>
              <input
                type="email"
                dir="ltr"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">العنوان الرئيسي (عربي)</label>
              <input
                type="text"
                required
                value={formData.address_ar}
                onChange={(e) => setFormData({ ...formData, address_ar: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">العنوان (إنجليزي)</label>
              <input
                type="text"
                required
                value={formData.address_en}
                onChange={(e) => setFormData({ ...formData, address_en: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Stats Counter Settings */}
        <div id="sec-stats" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-cairo border-b pb-2 border-slate-100">
            العدادات الإحصائية في الصفحة الرئيسية
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">سنوات الخبرة</label>
              <input
                type="number"
                required
                value={formData.stat_years}
                onChange={(e) => setFormData({ ...formData, stat_years: Number(e.target.value) })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">عدد المشاريع</label>
              <input
                type="number"
                required
                value={formData.stat_projects}
                onChange={(e) => setFormData({ ...formData, stat_projects: Number(e.target.value) })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">عدد العملاء والشركات</label>
              <input
                type="number"
                required
                value={formData.stat_clients}
                onChange={(e) => setFormData({ ...formData, stat_clients: Number(e.target.value) })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">عدد قطاعات الخدمات</label>
              <input
                type="number"
                required
                value={formData.stat_services}
                onChange={(e) => setFormData({ ...formData, stat_services: Number(e.target.value) })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Hero Section & Slideshow Settings */}
        <div id="sec-hero" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-cairo border-b pb-2 border-slate-100 flex items-center justify-between">
            <span>صور ونصوص الواجهة الرئيسية (Hero Slideshow)</span>
            <span className="text-xs font-normal text-[#E31E24]">تتغير الصور أوتوماتيكياً كل 5 ثوانٍ</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUploadInput
              label="الصورة الأولى بالواجهة (Slide 1)"
              recommendedSize="1920 × 1080 px (أفقية عريضة 16:9)"
              value={formData.hero_slide_1 || formData.hero_image_url || ''}
              onChange={(newUrl) => setFormData({ ...formData, hero_slide_1: newUrl, hero_image_url: newUrl })}
            />

            <ImageUploadInput
              label="الصورة الثانية بالواجهة (Slide 2)"
              recommendedSize="1920 × 1080 px (أفقية عريضة 16:9)"
              value={formData.hero_slide_2 || ''}
              onChange={(newUrl) => setFormData({ ...formData, hero_slide_2: newUrl })}
            />

            <ImageUploadInput
              label="الصورة الثالثة بالواجهة (Slide 3)"
              recommendedSize="1920 × 1080 px (أفقية عريضة 16:9)"
              value={formData.hero_slide_3 || ''}
              onChange={(newUrl) => setFormData({ ...formData, hero_slide_3: newUrl })}
            />

            <ImageUploadInput
              label="الصورة الرابعة بالواجهة (Slide 4)"
              recommendedSize="1920 × 1080 px (أفقية عريضة 16:9)"
              value={formData.hero_slide_4 || ''}
              onChange={(newUrl) => setFormData({ ...formData, hero_slide_4: newUrl })}
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">العنوان الرئيسي (عربي)</label>
              <input
                type="text"
                required
                value={formData.hero_title_ar || ''}
                onChange={(e) => setFormData({ ...formData, hero_title_ar: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">الوصف الرئيسي (عربي)</label>
              <textarea
                rows={3}
                required
                value={formData.hero_subtitle_ar || ''}
                onChange={(e) => setFormData({ ...formData, hero_subtitle_ar: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 4: About Us Page Settings */}
        <div id="sec-about" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-cairo border-b pb-2 border-slate-100">
            صورة ونصوص صفحة من نحن (About Us)
          </h3>

          <ImageUploadInput
            label="صورة صفحة من نحن (رفع مباشر من جهازك)"
            recommendedSize="1200 × 800 px (أفقية 16:9 أو 3:2 - JPG/PNG)"
            value={formData.about_image_url || ''}
            onChange={(newUrl) => setFormData({ ...formData, about_image_url: newUrl })}
          />

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">نبذة عن الشركة (عربي)</label>
              <textarea
                rows={3}
                required
                value={formData.about_text_ar || ''}
                onChange={(e) => setFormData({ ...formData, about_text_ar: e.target.value })}
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">رؤية الشركة (عربي)</label>
                <textarea
                  rows={2}
                  value={formData.vision_ar || ''}
                  onChange={(e) => setFormData({ ...formData, vision_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">رسالة الشركة (عربي)</label>
                <textarea
                  rows={2}
                  value={formData.mission_ar || ''}
                  onChange={(e) => setFormData({ ...formData, mission_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Manpower Settings (القوى العاملة والكوادر الفنية) */}
        <div id="sec-manpower" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-cairo flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]"></span>
                <span>سيكشن القوى العاملة والكوادر الفنية (Manpower)</span>
              </h3>
              <p className="text-xs text-slate-500">تحكم بعدد المهندسين، الفنيين، العمال، ومشرفي السلامة التي تظهر بالموقع</p>
            </div>
            <div className="bg-red-50 text-[#E31E24] text-[11px] font-bold px-3 py-1 rounded-full self-start sm:self-auto border border-red-200">
              إجمالي القوى العاملة: +{(Number(formData.stat_engineers) || 0) + (Number(formData.stat_technicians) || 0) + (Number(formData.stat_workers) || 0) + (Number(formData.stat_supervisors) || 0)} كادر
            </div>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <span>👷‍♂️ عدد المهندسين</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stat_engineers ?? 25}
                onChange={(e) => setFormData({ ...formData, stat_engineers: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs font-bold text-[#2B3990]"
              />
              <span className="text-[10px] text-slate-500 block">مهندسون استشاريون وتخصصيون</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔧 عدد الفنيين</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stat_technicians ?? 60}
                onChange={(e) => setFormData({ ...formData, stat_technicians: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs font-bold text-[#E31E24]"
              />
              <span className="text-[10px] text-slate-500 block">فنيو إطفاء وإنذار وشبكات معتمدون</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔨 عدد العمال</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stat_workers ?? 120}
                onChange={(e) => setFormData({ ...formData, stat_workers: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs font-bold text-emerald-600"
              />
              <span className="text-[10px] text-slate-500 block">عمالة ماهرة ومدربة على السلامة</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <span>🛡️ مشرفو سلامة وجودة</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stat_supervisors ?? 18}
                onChange={(e) => setFormData({ ...formData, stat_supervisors: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs font-bold text-amber-600"
              />
              <span className="text-[10px] text-slate-500 block">ضباط سلامة معتمدون OSHA</span>
            </div>
          </div>

          {/* Titles & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">عنوان سيكشن القوى العاملة (عربي)</label>
              <input
                type="text"
                value={formData.manpower_title_ar || ''}
                onChange={(e) => setFormData({ ...formData, manpower_title_ar: e.target.value })}
                placeholder="الكوادر البشرية والفرق الفنية المتخصصة"
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">عنوان السيكشن (إنجليزي)</label>
              <input
                type="text"
                value={formData.manpower_title_en || ''}
                onChange={(e) => setFormData({ ...formData, manpower_title_en: e.target.value })}
                placeholder="Specialized Technical & Engineering Manpower"
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">وصف الكوادر والخبرة (عربي)</label>
              <textarea
                rows={2}
                value={formData.manpower_desc_ar || ''}
                onChange={(e) => setFormData({ ...formData, manpower_desc_ar: e.target.value })}
                placeholder="نبذة عن خبرة وتأهيل الفرق الهندسية والفنية..."
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">وصف الكوادر والخبرة (إنجليزي)</label>
              <textarea
                rows={2}
                value={formData.manpower_desc_en || ''}
                onChange={(e) => setFormData({ ...formData, manpower_desc_en: e.target.value })}
                placeholder="Brief description of the certified engineering crew..."
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 6: Organizational Structure Settings (الهيكل التنظيمي) */}
        <div id="sec-org" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-cairo flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B3990]"></span>
                <span>سيكشن الهيكل التنظيمي (Organizational Structure)</span>
              </h3>
              <p className="text-xs text-slate-500">رفع صورة مخطط الهيكل التنظيمي للشركة أو تعديل نصوص الشجرة الهرمية</p>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full self-start sm:self-auto">
              يدعم رفع صورة للمخطط + شجرة هرمية تفاعلية
            </span>
          </div>

          {/* Org Chart Image Upload */}
          <ImageUploadInput
            label="رفع صورة أو مخطط الهيكل التنظيمي (اختياري - يعرض بملء الشاشة مع تكبير)"
            recommendedSize="1920 × 1080 px أو مخطط هرمي بصيغة JPG/PNG عالية الدقة"
            value={formData.org_chart_image_url || ''}
            onChange={(newUrl) => setFormData({ ...formData, org_chart_image_url: newUrl })}
          />

          {/* Titles & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">عنوان الهيكل التنظيمي (عربي)</label>
              <input
                type="text"
                value={formData.org_chart_title_ar || ''}
                onChange={(e) => setFormData({ ...formData, org_chart_title_ar: e.target.value })}
                placeholder="الهيكل التنظيمي والإداري للشركة"
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">عنوان الهيكل التنظيمي (إنجليزي)</label>
              <input
                type="text"
                value={formData.org_chart_title_en || ''}
                onChange={(e) => setFormData({ ...formData, org_chart_title_en: e.target.value })}
                placeholder="Company Organizational Structure"
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">وصف الهيكل التنظيمي والحوكمة (عربي)</label>
              <textarea
                rows={2}
                value={formData.org_chart_desc_ar || ''}
                onChange={(e) => setFormData({ ...formData, org_chart_desc_ar: e.target.value })}
                placeholder="وصف آلية اتخاذ القرار وتوزيع الإدارات والمسؤوليات..."
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">وصف الهيكل التنظيمي والحوكمة (إنجليزي)</label>
              <textarea
                rows={2}
                value={formData.org_chart_desc_en || ''}
                onChange={(e) => setFormData({ ...formData, org_chart_desc_en: e.target.value })}
                placeholder="Description of the organizational hierarchy and departments..."
                className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-8 py-3.5 bg-gradient-to-r from-[#E31E24] to-[#2B3990] text-white font-extrabold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 ms-auto cursor-pointer active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>حفظ جميع إعدادات الموقع</span>
        </button>

      </form>

    </div>
  );
}
