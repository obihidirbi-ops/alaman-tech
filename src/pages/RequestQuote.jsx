import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { FileText, Send, CheckCircle2, Upload, MessageSquare, Mail } from 'lucide-react';

export default function RequestQuote() {
  const { t, lang } = useLanguage();
  const { services, submitInboxMessage, settings } = useData();
  const [searchParams] = useSearchParams();

  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    service_slug: preselectedService,
    project_type: '',
    project_location: '',
    message: '',
    file_url: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service_slug: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // 1. Save to state & LocalStorage Inbox
      submitInboxMessage({
        type: 'quote',
        ...formData
      });

      // 2. Trigger automatic mailto client dispatch to Info@alamantec.com & alamansmm@gmail.com
      const mailSubject = encodeURIComponent(
        lang === 'ar'
          ? `طلب عرض سعر جديد: ${formData.company_name || formData.full_name}`
          : `New Quotation Request: ${formData.company_name || formData.full_name}`
      );
      const mailBody = encodeURIComponent(
        lang === 'ar'
          ? `الاسم الكامل: ${formData.full_name}\n` +
            `اسم الشركة: ${formData.company_name}\n` +
            `رقم الجوال: ${formData.phone}\n` +
            `البريد الإلكتروني: ${formData.email}\n` +
            `الخدمة المطلوبة: ${formData.service_slug}\n` +
            `نوع المشروع: ${formData.project_type}\n` +
            `الموقع: ${formData.project_location}\n` +
            `تفاصيل الطلب: ${formData.message}`
          : `Full Name: ${formData.full_name}\n` +
            `Company Name: ${formData.company_name}\n` +
            `Phone: ${formData.phone}\n` +
            `Email: ${formData.email}\n` +
            `Required Service: ${formData.service_slug}\n` +
            `Project Type: ${formData.project_type}\n` +
            `Location: ${formData.project_location}\n` +
            `Details: ${formData.message}`
      );

      // Open mailto dispatch in background/new window
      window.location.href = `mailto:Info@alamantec.com,alamansmm@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const selectedServiceObj = services.find(s => s.slug === formData.service_slug);
  const selectedServiceName = selectedServiceObj
    ? (lang === 'ar' ? selectedServiceObj.title_ar : selectedServiceObj.title_en)
    : formData.service_slug;

  const whatsappMessage = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً شركة تقنية الأمان الأولى، قمت برفع طلب عرض سعر:\n` +
        `👤 الاسم: ${formData.full_name}\n` +
        `🏢 الشركة: ${formData.company_name}\n` +
        `📞 الجوال: ${formData.phone}\n` +
        `🔧 الخدمة: ${selectedServiceName}\n` +
        `📝 التفاصيل: ${formData.message}`
      : `Hello First Security Technology Co., I have submitted a quote request:\n` +
        `👤 Name: ${formData.full_name}\n` +
        `🏢 Company: ${formData.company_name}\n` +
        `📞 Phone: ${formData.phone}\n` +
        `🔧 Service: ${selectedServiceName}\n` +
        `📝 Details: ${formData.message}`
  );

  const rawWhatsapp = (settings.whatsapp || '966539988289').replace(/[^0-9]/g, '');

  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-10 sm:p-12 rounded-3xl text-center space-y-3 shadow-xl">
        <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-950 px-3 py-1 rounded-md border border-red-800">
          {t('requestQuote')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-cairo">
          {t('quoteTitle')}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          {t('quoteSubtitle')}
        </p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        {submitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 font-cairo">
                {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Your quotation request was submitted successfully!'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {lang === 'ar'
                  ? <>تم توجيه نسخة من الطلب آلياً إلى بريد الشركة الرسمي (<span className="font-mono text-[#E31E24] font-bold">Info@alamantec.com</span> و <span className="font-mono text-[#2B3990] font-bold">alamansmm@gmail.com</span>) وسيتواصل معكم فريقنا الهندسي في أقرب وقت.</>
                  : <>A copy of your request was automatically routed to our official company emails (<span className="font-mono text-[#E31E24] font-bold">Info@alamantec.com</span> & <span className="font-mono text-[#2B3990] font-bold">alamansmm@gmail.com</span>). Our engineering team will contact you shortly.</>
                }
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={`https://wa.me/${rawWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'ar' ? 'متابعة الطلب فوراً عبر الواتساب' : 'Follow up immediately via WhatsApp'}</span>
              </a>

              <a
                href={`mailto:Info@alamantec.com,alamansmm@gmail.com?subject=${encodeURIComponent(lang === 'ar' ? `طلب عرض سعر - ${formData.company_name}` : `Quotation Request - ${formData.company_name}`)}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#2B3990] hover:bg-[#1E286C] text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرسال نسخة مباشرة للبريد الإلكتروني' : 'Send direct copy via Email'}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
              >
                {lang === 'ar' ? 'إرسال طلب عرض سعر آخر' : 'Submit another quotation request'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{t('fullName')} *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{t('companyName')} *</label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{t('emailAddress')} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{t('phone')} *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{t('selectService')} *</label>
                <select
                  required
                  value={formData.service_slug}
                  onChange={(e) => setFormData({ ...formData, service_slug: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
                >
                  <option value="">{lang === 'ar' ? '-- اختر الخدمة المطلوبة --' : '-- Select Required Service --'}</option>
                  {services.map((serv) => (
                    <option key={serv.id} value={serv.slug}>
                      {lang === 'ar' ? serv.title_ar : serv.title_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{t('projectLocation')} *</label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? "مثال: الدمام - طريق الجبيل" : "e.g. Dammam - Jubail Highway"}
                  value={formData.project_location}
                  onChange={(e) => setFormData({ ...formData, project_location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t('projectDetails')} *</label>
              <textarea
                rows={4}
                required
                placeholder={lang === 'ar' ? "اكتب تفاصيل المشروع والمساحة والاشتراطات المطلوبة..." : "Enter project details, area size, and specifications..."}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#E31E24]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#E31E24] to-[#2B3990] text-white font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span>{lang === 'ar' ? 'جاري إرسال الطلب والبريد...' : 'Sending request & email...'}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال طلب عرض السعر' : 'Submit Quotation Request'}</span>
                </>
              )}
            </button>

          </form>
        )}
      </div>

    </div>
  );
}
