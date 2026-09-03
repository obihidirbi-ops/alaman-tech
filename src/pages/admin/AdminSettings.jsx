import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import ImageUploadInput from '../../components/ImageUploadInput';
import { Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const { t, lang } = useLanguage();
  const { settings, updateSettings } = useData();

  const [formData, setFormData] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-cairo">{t('manageSettings')}</h1>
          <p className="text-xs text-slate-500">تحديث الشعار، الهواتف، رقم الواتساب، النبذة، والعدادات فوراً من جهازك</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم حفظ التعديلات بنجاح!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Section 0: Custom Logo Upload */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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

        {/* Section 1: Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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

        <button
          type="submit"
          className="px-8 py-3.5 bg-gradient-to-r from-[#E31E24] to-[#2B3990] text-white font-extrabold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 ms-auto"
        >
          <Save className="w-4 h-4" />
          <span>حفظ جميع إعدادات الموقع</span>
        </button>

      </form>

    </div>
  );
}
